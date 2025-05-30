<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $vehicle_types = [
            'SUVS and Cabs',
            'Cars',
            'Vans and Busses',
            'Motorbikes',
            'Tuk Tuks',
            'Utility Vehicles'
        ];
        
        foreach ($vehicle_types as $type){
            DB::table('vehicle_types')->insert([
                'type'=> $type
            ]);
        }
              
    }
}
