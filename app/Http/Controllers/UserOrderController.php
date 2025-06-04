<?php

namespace App\Http\Controllers;

use App\Helpers\DiskHelper;
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

        $orders->getCollection()->transform(function ($order) {
            $order->transaction_proof_url = $order->transaction_proof
                ? DiskHelper::getS3Disk()->temporaryUrl($order->transaction_proof, now()->addMinutes(60))
                : null;
            return $order;
        });

        return Inertia::render('profile/orders/index', [
            'orders' => $orders,
        ]);
    }
}
