<?php

use App\Http\Controllers\Api\EquipmentApiController;
use App\Http\Controllers\Api\CartItemApiController;
use App\Http\Controllers\Api\OrderApiController;
use App\Http\Controllers\Api\UserOrderApiController;
use Illuminate\Support\Facades\Route;

Route::get('/equipments', [EquipmentApiController::class, 'index']);
Route::get('/equipments/home', [EquipmentApiController::class, 'home']);
Route::get('/equipments/{equipment:slug}', [EquipmentApiController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartItemApiController::class, 'index']);
    Route::post('/cart', [CartItemApiController::class, 'store']);
    Route::patch('/cart/{equipment:id}', [CartItemApiController::class, 'update']);
    Route::delete('/cart/{equipment:id}', [CartItemApiController::class, 'destroy']);

    Route::get('/checkout', [OrderApiController::class, 'checkoutSummary']);
    Route::post('/orders', [OrderApiController::class, 'store']);
    Route::get('/orders/user', [UserOrderApiController::class, 'index']);
});
