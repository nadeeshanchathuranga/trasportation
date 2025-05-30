<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\ActivityLogger;

class ActivityLogServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton('activity-logger', function ($app) {
            return new ActivityLogger();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
