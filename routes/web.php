<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\PublicEquipmentController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserOrderController;

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::get('/', [PublicEquipmentController::class, 'home'])->name('home');
Route::get('/camera-equipments', [PublicEquipmentController::class, 'index'])->name('equipments.index');
Route::get('/camera-equipments/{equipment:slug}', [PublicEquipmentController::class, 'show'])->name('equipments.show');

Route::middleware(['auth'])->group(function () {
    Route::get('/cart', [CartItemController::class, 'index']);
    Route::post('/cart', [CartItemController::class, 'store']);
    Route::patch('/cart/{equipment:id}', [CartItemController::class, 'update']);
    Route::delete('/cart/{equipment:id}', [CartItemController::class, 'destroy']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/profile/orders', [UserOrderController::class, 'index'])->name('user.orders.index');
});


Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('categories', CategoryController::class);
        Route::resource('equipments', EquipmentController::class);

        Route::resource('orders', OrderController::class)->only(['index', 'show', 'update']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
