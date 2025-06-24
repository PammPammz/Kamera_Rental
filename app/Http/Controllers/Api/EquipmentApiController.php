<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\CartItem;
use Illuminate\Support\Facades\Log;

class EquipmentApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Equipment::with('category')->where('status', 'active');

        if ($request->has('category') && $request->category !== 'all') {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $equipments = $query->paginate(20)->withQueryString();

        return response()->json([
            'equipments' => $equipments,
            'categories' => Category::all(),
            'selectedCategory' => $request->category ?? 'all',
        ]);
    }

    public function home(Request $request)
    {
        $query = Equipment::with('category')->where('status', 'active');

        if ($request->has('category') && $request->category !== 'all') {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $equipments = $query->paginate(8)->withQueryString();

        return response()->json([
            'equipments' => $equipments,
            'categories' => Category::all(),
            'selectedCategory' => $request->category ?? 'all',
        ]);
    }

    public function show(Equipment $equipment)
    {
        $inCart = false;
        if (Auth::check()) {
            $inCart = CartItem::where('user_id', Auth::id())
                ->where('equipment_id', $equipment->id)
                ->exists();
        }

        return response()->json([
            'equipment' => [
                'id' => $equipment->id,
                'name' => $equipment->name,
                'slug' => $equipment->slug,
                'description' => $equipment->description,
                'price' => $equipment->price,
                'image' => $equipment->image,
                'image_url' => $equipment->image_url ?? null,
                'category' => $equipment->category,
            ],
            'inCart' => $inCart,
        ]);
    }
}
