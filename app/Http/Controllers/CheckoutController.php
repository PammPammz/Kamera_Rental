<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index()
    {
        $cartItems = CartItem::with('equipment.category')
            ->where('user_id', Auth::id())
            ->get();

        return inertia('checkout/index', [
            'cartItems' => $cartItems,
        ]);
    }
}
