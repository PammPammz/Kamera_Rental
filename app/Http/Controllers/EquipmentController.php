<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EquipmentController extends Controller
{
    public function index()
    {
        $equipments = Equipment::with('category')
            ->where('status', 'active')
            ->get();

        return Inertia::render('dashboard/equipments/index', [
            'equipments' => $equipments,
        ]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('dashboard/equipments/create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'stock' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Equipment::create($validated);

        return redirect()->route('dashboard.equipments.index')
            ->with('message', 'Equipment created successfully.');
    }

    public function edit(Equipment $equipment)
    {
        $categories = Category::all();

        return Inertia::render('dashboard/equipments/edit', [
            'equipment' => $equipment->load('category'),
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'stock' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $equipment->update($validated);

        return redirect()->route('dashboard.equipments.index')
            ->with('message', 'Equipment updated successfully.');
    }

    public function destroy(Equipment $equipment)
    {
        $equipment->delete();

        return redirect()->route('dashboard.equipments.index')
            ->with('message', 'Equipment deleted successfully.');
    }
}
