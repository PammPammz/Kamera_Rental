<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');
    
    // Category routes under /dashboard/categories
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('categories', CategoryController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
