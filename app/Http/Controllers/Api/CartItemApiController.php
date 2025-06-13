<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CartItemApiController extends Controller
{
    public function index()
    {
        $cartItems = CartItem::with('equipment.category')
            ->where('user_id', Auth::id())
            ->get();
            
        return response()->json([
            'cartItems' => $cartItems,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'equipment_id' => 'required|exists:equipments,id',
        ]);

        $user = Auth::user();

        $cartItem = CartItem::where('user_id', $user->id)
            ->where('equipment_id', $request->equipment_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += 1;
            $cartItem->save();
        } else {
            $cartItem = CartItem::create([
                'user_id' => $user->id,
                'equipment_id' => $request->equipment_id,
                'quantity' => 1,
            ]);
        }

        return response()->json([
            'message' => 'Equipment added to cart!',
            'cartItem' => $cartItem,
        ], 201);
    }

    public function update(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1|max:5',
        ]);

        $cartItem = CartItem::where('user_id', Auth::id())
            ->where('equipment_id', $equipment->id)
            ->firstOrFail();

        $cartItem->update(['quantity' => $validated['quantity']]);

        return response()->json([
            'message' => 'Cart updated.',
            'cartItem' => $cartItem,
        ]);
    }

    public function destroy(Equipment $equipment)
    {
        CartItem::where('user_id', Auth::id())
            ->where('equipment_id', $equipment->id)
            ->delete();

        return response()->json([
            'message' => 'Item removed from cart.',
        ]);
    }
}
