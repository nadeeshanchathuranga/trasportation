<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\DriverComplaint;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ComplaintsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get user IDs for complaints
        $userIds = User::pluck('id')->toArray();
        if (empty($userIds)) {
            // Create a default user if none exists
            $user = User::create([
                'name' => 'Test User',
                'email' => 'user@example.com',
                'password' => bcrypt('password'),
            ]);
            $userIds = [$user->id];
        }

        // Get driver IDs for complaints
        $driverIds = Driver::pluck('id')->toArray();
        if (empty($driverIds)) {
            $this->command->info('No drivers found. Please run driver seeder first.');
            return;
        }

        // Create sample complaint data
        $complaints = [
            // Pending complaints
            [
                'user_id' => $this->getRandomItem($userIds),
                'driver_id' => $this->getRandomItem($driverIds),
                'trip_id' => rand(1, 100),
                'subject' => 'Driver was rude during trip',
                'description' => 'The driver was extremely rude and unprofessional. He was yelling at other drivers and made me feel unsafe.',
                'status' => 'pending',
                'created_at' => Carbon::now()->subDays(rand(1, 10)),
            ],
            [
                'user_id' => $this->getRandomItem($userIds),
                'driver_id' => $this->getRandomItem($driverIds),
                'trip_id' => rand(1, 100),
                'subject' => 'Driver arrived 30 minutes late',
                'description' => 'I was waiting for 30 minutes past the scheduled time. The driver didn\'t notify me about any delay.',
                'status' => 'pending',
                'created_at' => Carbon::now()->subDays(rand(1, 5)),
            ],
            [
                'user_id' => $this->getRandomItem($userIds),
                'driver_id' => $this->getRandomItem($driverIds),
                'trip_id' => rand(1, 100),
                'subject' => 'Unsafe driving behavior',
                'description' => 'The driver was speeding and using phone while driving. I felt unsafe throughout the journey.',
                'status' => 'pending',
                'created_at' => Carbon::now()->subDays(rand(1, 3)),
            ],

            // Investigating complaints
            [
                'user_id' => $this->getRandomItem($userIds),
                'driver_id' => $this->getRandomItem($driverIds),
                'trip_id' => rand(1, 100),
                'subject' => 'Driver took wrong route deliberately',
                'description' => 'The driver ignored my suggestions and took a much longer route to increase the fare.',
                'status' => 'investigating',
                'created_at' => Carbon::now()->subDays(rand(5, 15)),
            ],
            [
                'user_id' => $this->getRandomItem($userIds),
                'driver_id' => $this->getRandomItem($driverIds),
                'trip_id' => rand(1, 100),
                'subject' => 'Vehicle was not as advertised',
                'description' => 'The vehicle was in poor condition with broken AC and worn out seats, unlike what was shown in the app.',
                'status' => 'investigating',
                'created_at' => Carbon::now()->subDays(rand(5, 15)),
            ],

            // Resolved complaints
            [
                'user_id' => $this->getRandomItem($userIds),
                'driver_id' => $this->getRandomItem($driverIds),
                'trip_id' => rand(1, 100),
                'subject' => 'Driver refused to complete trip',
                'description' => 'Halfway through the journey, the driver asked me to leave the vehicle because he didn\'t want to go to my destination.',
                'status' => 'resolved',
                'resolution_notes' => 'Driver has been warned and customer was refunded. `We\'ve` provided additional training to the driver.',
                'resolved_at' => Carbon::now()->subDays(rand(1, 5)),
                'resolved_by' => $this->getRandomItem($userIds),
                'created_at' => Carbon::now()->subDays(rand(10, 20)),
            ],
            [
                'user_id' => $this->getRandomItem($userIds),
                'driver_id' => $this->getRandomItem($driverIds),
                'trip_id' => rand(1, 100),
                'subject' => 'Overcharging for services',
                'description' => 'The driver demanded additional payment beyond what was shown in the app, claiming "extra services".',
                'status' => 'resolved',
                'resolution_notes' => 'We have verified the complaint and issued full refund to the customer. The driver has been issued a formal warning.',
                'resolved_at' => Carbon::now()->subDays(rand(1, 5)),
                'resolved_by' => $this->getRandomItem($userIds),
                'created_at' => Carbon::now()->subDays(rand(10, 20)),
            ],
            
            // Dismissed complaints
            [
                'user_id' => $this->getRandomItem($userIds),
                'driver_id' => $this->getRandomItem($driverIds),
                'trip_id' => rand(1, 100),
                'subject' => 'Driver didn\'t help with luggage',
                'description' => 'The driver stayed in the car and didn\'t help me with my heavy luggage.',
                'status' => 'dismissed',
                'resolution_notes' => 'After reviewing our policies, drivers are not obligated to help with luggage, though it is encouraged as good customer service.',
                'resolved_at' => Carbon::now()->subDays(rand(1, 5)),
                'resolved_by' => $this->getRandomItem($userIds),
                'created_at' => Carbon::now()->subDays(rand(10, 20)),
            ],
            [
                'user_id' => $this->getRandomItem($userIds),
                'driver_id' => $this->getRandomItem($driverIds),
                'trip_id' => rand(1, 100),
                'subject' => 'Driver wasn\'t conversational',
                'description' => 'The driver didn\'t talk to me during the trip and seemed very unfriendly.',
                'status' => 'dismissed',
                'resolution_notes' => 'Drivers are not required to engage in conversation unless necessary for the service. Some drivers prefer to focus on driving safely.',
                'resolved_at' => Carbon::now()->subDays(rand(1, 5)),
                'resolved_by' => $this->getRandomItem($userIds),
                'created_at' => Carbon::now()->subDays(rand(10, 20)),
            ],
        ];

        // Insert all complaints into the database
        foreach ($complaints as $complaint) {
            DriverComplaint::create($complaint);
        }

        $this->command->info('Created ' . count($complaints) . ' sample driver complaints.');
    }

    /**
     * Get a random item from an array
     */
    private function getRandomItem(array $items)
    {
        return $items[array_rand($items)];
    }
}