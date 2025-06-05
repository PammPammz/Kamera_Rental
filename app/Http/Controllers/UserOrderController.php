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
        $status = $request->get('status', 'all');

        $query = Order::with('items.equipment.category', 'user')->where('user_id', $request->user()->id);

        if ($status !== 'all') {
            $query->where('status', $status);
        }

        $orders = $query
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
            'status' => $status
        ]);
    }
}
