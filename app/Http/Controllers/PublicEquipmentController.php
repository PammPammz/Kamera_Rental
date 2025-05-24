<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;


class PublicEquipmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Equipment::with('category')->where('status', 'active');

        if ($request->has('category') && $request->category !== 'all') {
            $categoryName = $request->category;


            $query->whereHas('category', function ($q) use ($categoryName) {
                $q->where('slug', $categoryName);
            });
        }
        $equipments = $query->paginate(20)->withQueryString();

        $categories = Category::all();

        return Inertia::render('camera-equipments/index', [
            'equipments' => $equipments,
            'categories' => $categories,
            'selectedCategory' => $request->category ?? 'all',
        ]);
    }

    public function home(Request $request)
    {
        $query = Equipment::with('category')->where('status', 'active');

        if ($request->has('category') && $request->category !== 'all') {
            $categoryName = $request->category;


            $query->whereHas('category', function ($q) use ($categoryName) {
                $q->where('slug', $categoryName);
            });
        }
        $equipments = $query->paginate(8)->withQueryString();

        $categories = Category::all();

        return Inertia::render('home/index', [
            'equipments' => $equipments,
            'categories' => $categories,
            'selectedCategory' => $request->category ?? 'all',
        ]);
    }

    public function show(Equipment $equipment)
    {
        return Inertia::render('equipment-detail/index', [
            'equipment' => [
                'id' => $equipment->id,
                'name' => $equipment->name,
                'slug' => $equipment->slug,
                'description' => $equipment->description,
                'price' => $equipment->price,
                'image' => $equipment->image,
                'category' => $equipment->category,
            ],
        ]);
    }
}

