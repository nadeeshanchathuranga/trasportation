<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

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
    public function boot(): void
    {
        // Load the front.php routes
        $this->loadFrontRoutes();
    }

    /**
     * Load frontend routes from front.php
     */
    protected function loadFrontRoutes(): void
    {
        Route::middleware(['web'])
            ->group(base_path('routes/front.php'));
    }
}
