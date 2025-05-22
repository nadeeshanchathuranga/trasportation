<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandVehicle extends Model
{
    protected $fillable = [
        'vehicle_id',
        'body_type',
        'fuel_type',
        'transmission_type',
        'pickup_location',
        'drop_off_policy',
    ];
}



