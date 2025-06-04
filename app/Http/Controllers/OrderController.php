<?php

namespace App\Http\Controllers;

use App\Helpers\DiskHelper;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name'     => 'required|string|max:100',
            'email'          => 'required|email',
            'phone'          => 'required|string|max:20',
            'address'        => 'nullable|string',
            'notes'          => 'nullable|string',
            'purpose'        => 'nullable|string',
            'delivery_method' => 'required|in:pickup,delivery',
            'rental_period.from' => 'required|date',
            'rental_period.to'   => 'required|date|after_or_equal:rental_period.from',
        ]);

        error_log($validated['rental_period']['from']);
        

        DB::beginTransaction();

        try {
            $user = Auth::user();
            $cartItems = CartItem::with('equipment')->where('user_id', $user->id)->get();

            if ($cartItems->isEmpty()) {
                return back()->withErrors(['cart' => 'Your cart is empty.']);
            }

            $rentalDays = now()->parse($validated['rental_period']['from'])
                ->diffInDays(now()->parse($validated['rental_period']['to'])) + 1;

            $subtotal = $cartItems->sum(function ($item) use ($rentalDays) {
                return $item->equipment->price * $item->quantity * $rentalDays;
            });

            $total = $subtotal + ($request->delivery_method === 'delivery' ? 10.00 : 0.00);

            $order = Order::create([
                'user_id'        => $user->id,
                'full_name'     => $validated['full_name'],
                'email'          => $validated['email'],
                'phone'          => $validated['phone'],
                'address'        => $validated['address'],
                'notes'          => $validated['notes'],
                'purpose'        => $validated['purpose'],
                'delivery_method' => $validated['delivery_method'],
                'delivery_fee'   => $validated['delivery_method'] === 'delivery' ? 10 : 0,
                'rental_start'   => $validated['rental_period']['from'],
                'rental_end'     => $validated['rental_period']['to'],
                'subtotal'       => $subtotal,
                'total'          => $total,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id'      => $order->id,
                    'equipment_id'  => $item->equipment_id,
                    'quantity'      => $item->quantity,
                    'price' => $item->equipment->price,
                ]);
            }

            CartItem::where('user_id', $user->id)->delete();

            DB::commit();

            return back()->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }

    public function index()
    {
        $orders = Order::with('items.equipment', 'user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    
        $orders->getCollection()->transform(function ($order) {
            $order->transaction_proof_url = $order->transaction_proof
                ? DiskHelper::getS3Disk()->temporaryUrl($order->transaction_proof, now()->addMinutes(60))
                : null;
            return $order;
        });

        return Inertia::render('dashboard/orders/index', [
            'orders' => $orders
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => [
                'required',
                Rule::in(['pending', 'approved', 'rejected', 'finished']),
            ],
            'transaction_proof' => 'nullable|image|max:2048',
            'reject_reason' => 'nullable|string|max:1000',
        ]);

        $newStatus = $validated['status'];

        // Validation logic for transitions
        if ($order->status === 'rejected' && $newStatus === 'finished') {
            return back()->withErrors(['status' => 'Cannot complete a rejected order.']);
        }

        if ($order->status === 'pending' && $newStatus === 'finished') {
            return back()->withErrors(['status' => 'Approve the order first before completing.']);
        }

        // Handle file upload to S3
        if ($request->hasFile('transaction_proof')) {
            $path = $request->file('transaction_proof')->store('transaction_proofs', 's3');
            Storage::disk('s3')->setVisibility($path, 'public');
            $order->transaction_proof = $path;
        }

        $order->status = $newStatus;

        // Save reject reason if rejected
        if ($newStatus === 'rejected') {
            $order->reject_reason = $validated['reject_reason'] ?? null;
        } else {
            $order->reject_reason = null;
        }

        $order->save();

        return back()->with('success', 'Order updated successfully.');
    }
}
