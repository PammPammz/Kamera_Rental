<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{
    public function index()
    {
        $cartItems = CartItem::with('equipment.category')
            ->where('user_id', Auth::id())
            ->get();

        return inertia('cart/index', [
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
            CartItem::create([
                'user_id' => $user->id,
                'equipment_id' => $request->equipment_id,
                'quantity' => 1,
            ]);
        }

        return redirect()->back()->with('success', 'Equipment added to cart!');
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

        return back()->with('success', 'Cart updated.');
    }

    public function destroy(Equipment $equipment)
    {
        CartItem::where('user_id', Auth::id())
            ->where('equipment_id', $equipment->id)
            ->delete();

        return back()->with('success', 'Item removed from cart.');
    }
}
