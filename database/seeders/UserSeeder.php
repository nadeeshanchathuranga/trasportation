<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678'),
            'role_type' => 'admin',
            'status' => 'accepted',
        ]);

        // Create vendor users
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'email_verified_at' => now(),
                'password' => Hash::make('12345678'),
                'role_type' => $i % 2 === 0 ? 'vendor' : 'user',
                'status' => fake()->randomElement(['accepted', 'pending', 'rejected']),
            ]);
        }

        // Create regular users
        User::factory(5)->create();
    }
}