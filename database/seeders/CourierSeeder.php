<?php

namespace Database\Seeders;

use App\Models\Courier;
use App\Models\CourierReceiver;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CourierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if there are any users, if not, run the UserSeeder
        if (User::count() === 0) {
            $this->call(UserSeeder::class);
        }
        
        // Get user IDs to associate with couriers
        $userIds = User::pluck('id')->toArray();
        
        if (empty($userIds)) {
            $this->command->error('No users found. Please run UserSeeder first.');
            return;
        }
        
        // Define parcel types and payment methods
        $parcelTypes = ['document', 'small_package', 'medium_package', 'large_package', 'fragile', 'other'];
        $paymentMethods = ['cash', 'credit_card', 'online_payment'];
        $statuses = ['pending', 'picked_up', 'in_transit', 'delivered', 'cancelled'];
        
        // Create 50 couriers
        for ($i = 0; $i < 50; $i++) {
            $parcelType = $parcelTypes[array_rand($parcelTypes)];
            $customParcelType = $parcelType === 'other' ? 'Electronics' : null;
            
            $courier = Courier::create([
                'user_id' => $userIds[array_rand($userIds)],
                'sender_name' => fake()->name(),
                'sender_address' => fake()->address(),
                'sender_telephone' => fake()->phoneNumber(),
                'parcel_type' => $parcelType,
                'custom_parcel_type' => $customParcelType,
                'parcel_count' => rand(1, 5),
                'parcel_weight' => rand(1, 50) + (rand(0, 99) / 100), // Random decimal between 1.00 and 50.99
                'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                'tracking_number' => Courier::generateTrackingNumber(),
                'status' => $statuses[array_rand($statuses)],
                'created_at' => fake()->dateTimeBetween('-30 days', 'now'),
                'updated_at' => fake()->dateTimeBetween('-30 days', 'now'),
            ]);
            
            // Create between 1 and 3 receivers for each courier
            $receiverCount = rand(1, 3);
            for ($j = 1; $j <= $receiverCount; $j++) {
                CourierReceiver::create([
                    'courier_id' => $courier->id,
                    'receiver_name' => fake()->name(),
                    'receiver_address' => fake()->address(),
                    'receiver_telephone' => fake()->phoneNumber(),
                    'location_order' => $j,
                    'created_at' => $courier->created_at,
                    'updated_at' => $courier->updated_at,
                ]);
            }
        }
        
        $this->command->info('Created 50 courier records with receivers');
    }
}