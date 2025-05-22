<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AirVehicle extends Model
{
      protected $fillable = [
        'vehicle_id',
        'flight_fly_range_km',
        'airport_name',
    ];
}
