<?php

use App\Http\Controllers\Api\EquipmentApiController;
use App\Http\Controllers\Api\CartItemApiController;
use App\Http\Controllers\Api\OrderApiController;
use App\Http\Controllers\Api\UserOrderApiController;
use App\Http\Controllers\Api\AuthApiController;
use Illuminate\Support\Facades\Route;

Route::get('/equipments', [EquipmentApiController::class, 'index']);
Route::get('/equipments/home', [EquipmentApiController::class, 'home']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartItemApiController::class, 'index']);
    Route::post('/cart', [CartItemApiController::class, 'store']);
    Route::patch('/cart/{equipment:id}', [CartItemApiController::class, 'update']);
    Route::delete('/cart/{cartItem}', [CartItemApiController::class, 'destroy']);

    Route::get('/checkout', [OrderApiController::class, 'checkoutSummary']);
    Route::post('/orders', [OrderApiController::class, 'store']);
    Route::get('/orders', [UserOrderApiController::class, 'index']);

    Route::get('/equipments/{equipment}', [EquipmentApiController::class, 'show']);

});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthApiController::class, 'register']);
    Route::post('/login', [AuthApiController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthApiController::class, 'me']);
        Route::post('/logout', [AuthApiController::class, 'logout']);
    });
});