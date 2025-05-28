<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            // Create user first
            $user = User::create([
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'address' => $faker->address(),
                'country' => $faker->country(),
                'phone' => $faker->phoneNumber(),
                'role_type' => 'driver',
            ]);

            // Create driver record
            Driver::create([
                'user_id' => $user->id,
                'license_number' => $faker->regexify('[A-Z]{2}[0-9]{6}'),
                'dob' => $faker->date('Y-m-d', '-25 years'),
                'nic_path' => 'storage/nic/' . Str::uuid() . '.jpg',
                'license_path' => 'storage/license/' . Str::uuid() . '.jpg',
                'police_clearance_path' => 'storage/clearance/' . Str::uuid() . '.pdf',
                'certifications' => $faker->randomElement([null, 'First Aid,Defensive Driving', 'Hazmat Transport']),
                'status' => $faker->randomElement(['accepted', 'pending', 'rejected']),
            ]);
        }
    }
}