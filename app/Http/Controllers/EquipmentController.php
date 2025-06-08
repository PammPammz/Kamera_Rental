<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'status' => 'required|in:active,inactive',
            'category_id' => 'nullable|exists:categories,id',
            'image_attachment' => 'nullable|image|max:2048',
            'price' => 'required|numeric|min:0',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        // Handle file upload to S3
        if ($request->hasFile('image_attachment')) {
            $path = $request->file('image_attachment')->store('equipments', 's3');
            Storage::disk('s3')->setVisibility($path, 'public');
            $validated['image'] = $path;
        }

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
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,inactive',
            'category_id' => 'nullable|exists:categories,id',
            'image_attachment' => 'nullable|image|max:2048',
            'price' => 'nullable|numeric|min:0',
        ]);

        if (!empty($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Handle optional new image
        if ($request->hasFile('image_attachment')) {
            // Optional: delete old image
            if ($equipment->image) {
                Storage::disk('s3')->delete($equipment->image);
            }

            $path = $request->file('image_attachment')->store('equipments', 's3');
            Storage::disk('s3')->setVisibility($path, 'public');
            $validated['image'] = $path;
        }

        // Update model
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

    public function publicIndex()
    {
        $equipments = Equipment::with('category')
            ->where('status', 'active')
            ->get()
            ->map(function ($equipment) {
                return [
                    'id' => $equipment->id,
                    'name' => $equipment->name,
                    'description' => $equipment->description,
                    'price' => $equipment->price,
                    'image' => $equipment->image,
                    'category' => $equipment->category?->name,
                    'slug' => $equipment->slug,
                ];
            });

        return response()->json($equipments);
    }
}
