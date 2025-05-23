<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vendor;
use App\Models\User;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get users to associate with vendors (skip the admin user)
        $users = User::where('id', '>', 1)->limit(10)->get();

        $categories = ['Air', 'Land', 'Sea'];
        $statuses = ['pending', 'accepted', 'rejected'];

        foreach ($users as $index => $user) {
            $category = $categories[array_rand($categories)];
            $status = $statuses[array_rand($statuses)];
            
            Vendor::create([
                'user_id' => $user->id,
                'business_name' => fake()->company(),
                'business_registration_no' => 'REG' . fake()->numberBetween(10000, 99999),
                'registration_document' => 'sample_documents/registration_doc_' . ($index + 1) . '.pdf',
                'business_logo' => 'sample_logos/logo_' . ($index + 1) . '.png',
                'category_id' => $category,
                'no_of_vehicles' => fake()->numberBetween(1, 50),
                'air_certificate' => $category === 'Air' ? 'sample_certificates/air_cert_' . ($index + 1) . '.pdf' : null,
                'meritime_lisence' => $category === 'Sea' ? 'ML' . fake()->numberBetween(1000, 9999) : null,
                'status' => $status,
            ]);
        }
    }
}