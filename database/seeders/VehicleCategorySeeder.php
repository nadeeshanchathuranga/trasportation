<?php

namespace Database\Seeders;
use App\Models\VehicleCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Air', 'Land', 'Sea'];

    foreach ($categories as $name) {
        VehicleCategory::firstOrCreate(['name' => $name]);
    }
    }
}
