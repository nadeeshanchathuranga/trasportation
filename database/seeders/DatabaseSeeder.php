<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       
        // Call your custom seeders
        $this->call([
            VehicleCategorySeeder::class,
            VendorSeeder::class,
            DriverSeeder::class,
            VehicleTypeSeeder::class,
        ]);
    }
}
