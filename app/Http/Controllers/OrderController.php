<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

        return Inertia::render('dashboard/orders/index', [
            'orders' => $orders
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
            'transaction_proof' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('transaction_proof')) {
            $path = $request->file('transaction_proof')->store('transaction_proofs', 'public');
            $order->transaction_proof = $path;
        }

        $order->status = $validated['status'];
        $order->save();

        return redirect()->back()->with('success', 'Order updated');
    }
}
