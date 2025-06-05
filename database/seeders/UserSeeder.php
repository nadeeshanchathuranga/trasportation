<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@gmail.com',
                'role_type' => 'admin',
            ],
            [
                'name' => 'Regular User',
                'email' => 'user@gmail.com',
                'role_type' => 'user',
            ],
            [
                'name' => 'Vendor User',
                'email' => 'vendor@gmail.com',
                'role_type' => 'vendor',
            ],
            [
                'name' => 'Driver User',
                'email' => 'driver@gmail.com',
                'role_type' => 'driver',
            ],
        ];

        foreach ($users as $user) {
            \App\Models\User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'),
                'address' => 'Sample Address',
                'country' => 'Sri Lanka',
                'phone' => '+94771234567',
                'role_type' => $user['role_type'],
                'status' => 'pending', // ✅ must be accepted, pending, or rejected
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
