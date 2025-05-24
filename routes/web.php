<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\PublicEquipmentController;

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::get('/', [PublicEquipmentController::class, 'home'])->name('home');
Route::get('/camera-equipments', [PublicEquipmentController::class, 'index'])->name('equipments.index');
Route::get('/camera-equipments/{equipment:slug}', [PublicEquipmentController::class, 'show'])->name('equipments.show');

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('categories', CategoryController::class);
        Route::resource('equipments', EquipmentController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
