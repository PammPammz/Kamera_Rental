<?php

namespace App\Http\Controllers\Api;

use App\Helpers\DiskHelper;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class OrderApiController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:100',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string',
            'notes' => 'nullable|string',
            'purpose' => 'nullable|string',
            'delivery_method' => 'required|in:pickup,delivery',
            'rental_period.from' => 'required|date',
            'rental_period.to' => 'required|date|after_or_equal:rental_period.from',
        ]);

        DB::beginTransaction();

        try {
            $user = Auth::user();
            $cartItems = CartItem::with('equipment')->where('user_id', $user->id)->get();

            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'Your cart is empty.'], 400);
            }

            $rentalDays = now()->parse($validated['rental_period']['from'])
                ->diffInDays(now()->parse($validated['rental_period']['to'])) + 1;

            $subtotal = $cartItems->sum(function ($item) use ($rentalDays) {
                return $item->equipment->price * $item->quantity * $rentalDays;
            });

            $total = $subtotal + ($validated['delivery_method'] === 'delivery' ? 100000 : 100000);

            $order = Order::create([
                'user_id' => $user->id,
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'notes' => $validated['notes'],
                'purpose' => $validated['purpose'],
                'delivery_method' => $validated['delivery_method'],
                'delivery_fee' => $validated['delivery_method'] === 'delivery' ? 100000 : 0,
                'rental_start' => $validated['rental_period']['from'],
                'rental_end' => $validated['rental_period']['to'],
                'subtotal' => $subtotal,
                'total' => $total,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'equipment_id' => $item->equipment_id,
                    'quantity' => $item->quantity,
                    'price' => $item->equipment->price,
                ]);
            }

            CartItem::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully!',
                'order' => $order->load('items.equipment'),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong.'], 500);
        }
    }

    public function index(Request $request)
    {
        $user = Auth::user();

        $orders = Order::with('items.equipment.category')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $orders->transform(function ($order) {
            $order->transaction_proof_url = $order->transaction_proof
                ? DiskHelper::getS3Disk()->temporaryUrl($order->transaction_proof, now()->addMinutes(60))
                : null;
            return $order;
        });

        return response()->json([
            'orders' => $orders,
        ]);
    }
}
