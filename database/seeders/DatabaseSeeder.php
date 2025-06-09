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
            //  UserSeeder::class,
            // DriverServicePackagesTypesTableSeeder::class,
            // VehicleTypeSeeder::class,
            // DriverServicePackageSeeder::class,
            // CourierSeeder::class,
            // first DriverSeeder CourierSeeder cmnt


             UserSeeder::class,
            DriverServicePackagesTypesTableSeeder::class,
            VehicleTypeSeeder::class,
        ]);
    }
}
