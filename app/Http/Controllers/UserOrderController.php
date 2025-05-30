<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserOrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with('items.equipment')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('profile/orders/index', [
            'orders' => $orders,
        ]);
    }
}
