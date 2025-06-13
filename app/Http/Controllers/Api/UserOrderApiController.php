<?php

namespace App\Http\Controllers\Api;

use App\Helpers\DiskHelper;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class UserOrderApiController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->get('status', 'all');

        $query = Order::with('items.equipment.category')
            ->where('user_id', $request->user()->id);

        if ($status !== 'all') {
            $query->where('status', $status);
        }

        $orders = $query->latest()->paginate(10);

        $orders->getCollection()->transform(function ($order) {
            $order->transaction_proof_url = $order->transaction_proof
                ? DiskHelper::getS3Disk()->temporaryUrl($order->transaction_proof, now()->addMinutes(60))
                : null;
            return $order;
        });

        return response()->json([
            'orders' => $orders,
            'status' => $status,
        ]);
    }
}
