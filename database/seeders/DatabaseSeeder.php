<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\DriverComplaint;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        // Call your custom seeders
        $this->call([
            // VehicleCategorySeeder::class,
            // VendorSeeder::class,
            // DriverSeeder::class,
            // ComplaintsSeeder::class,
            UserSeeder::class,
            DriverServicePackagesTypesTableSeeder::class,
            VehicleTypeSeeder::class,
            // DriverServicePackageSeeder::class,
            // CourierSeeder::class,
            // first DriverSeeder CourierSeeder cmnt
        ]);
    }
}
