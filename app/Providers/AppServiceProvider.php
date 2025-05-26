<?php

namespace App\Providers;

use App\Models\CartItem;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Inertia::share([
            'cartCount' => function () {
                return Auth::check()
                    ? CartItem::where('user_id', Auth::id())->sum('quantity')
                    : 0;
            },
        ]);
    }
}
