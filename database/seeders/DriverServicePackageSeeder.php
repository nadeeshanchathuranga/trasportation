<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\DriverServicePackage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverServicePackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all driver IDs
        $driverIds = Driver::pluck('id')->toArray();
        
        if (empty($driverIds)) {
            $this->command->info('No drivers found in the database. Please seed drivers first.');
            return;
        }

        // Package types
        $types = ['hourly', 'route-based', 'daily'];
        
        // Sample routes for route-based packages
        $routes = [
            'Colombo to Kandy',
            'Colombo to Galle',
            'Colombo to Negombo',
            'Airport Transfer',
            'Kandy to Nuwara Eliya',
            'Galle to Matara',
            'Colombo City Tour',
            'Anuradhapura to Polonnaruwa',
            'Ella to Mirissa',
            'Trincomalee to Batticaloa'
        ];
        
        // Statuses with weighted distribution
        $statuses = ['pending', 'approved', 'rejected'];
        $statusWeights = [60, 30, 10]; // 60% pending, 30% approved, 10% rejected
        
        // Rejection reasons
        $rejectionReasons = [
            'Price is too high compared to market rates',
            'Service description is incomplete or unclear',
            'Similar service already exists in your portfolio',
            'Service area not covered by our platform',
            'Vehicle not suitable for the offered service',
            'Missing required certifications for this type of service',
            'Safety concerns with the proposed route/service'
        ];

        // Create 15 packages
        $packages = [];
        for ($i = 0; $i < 15; $i++) {
            $type = $types[array_rand($types)];
            $title = '';
            $description = '';
            $price = 0;
            $durationInHours = null;
            
            // Generate data based on type
            switch ($type) {
                case 'hourly':
                    $hours = rand(1, 8);
                    $hourlyRate = rand(10, 30);
                    $title = "{$hours}-Hour Private Driver Service";
                    $description = "Professional driver service for {$hours} hours. Perfect for shopping trips, meetings, or touring the city at your own pace.";
                    $price = $hours * $hourlyRate;
                    $durationInHours = $hours;
                    break;
                    
                case 'route-based':
                    $route = $routes[array_rand($routes)];
                    $title = $route . " Transfer";
                    $description = "Direct transfer service from {$route}. Comfortable vehicle with professional driver.";
                    $price = rand(25, 100);
                    break;
                    
                case 'daily':
                    $days = rand(1, 5);
                    $dailyText = $days == 1 ? 'Day' : 'Days';
                    $title = "{$days}-{$dailyText} Driver Package";
                    $description = "All-inclusive {$days}-day driver service. Ideal for multi-city tours and extended trips.";
                    $price = $days * rand(80, 150);
                    $durationInHours = $days * 24;
                    break;
            }
            
            // Determine status with weighting
            $randomNum = rand(1, 100);
            $statusIndex = 0;
            $cumulativeWeight = 0;
            
            foreach ($statusWeights as $index => $weight) {
                $cumulativeWeight += $weight;
                if ($randomNum <= $cumulativeWeight) {
                    $statusIndex = $index;
                    break;
                }
            }
            
            $status = $statuses[$statusIndex];
            
            // Add rejection reason for rejected packages
            $rejectionReason = null;
            if ($status === 'rejected') {
                $rejectionReason = $rejectionReasons[array_rand($rejectionReasons)];
            }
            
            $packages[] = [
                'driver_id' => $driverIds[array_rand($driverIds)],
                'type' => $type,
                'title' => $title,
                'description' => $description,
                'price' => $price,
                'duration_in_hours' => $durationInHours,
                'status' => $status,
                'rejection_reason' => $rejectionReason,
                'created_at' => now()->subDays(rand(0, 30)),
                'updated_at' => now()->subDays(rand(0, 15)),
            ];
        }

        DB::table('driver_service_packages')->insert($packages);
    }
}