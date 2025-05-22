<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeaVehicle extends Model
{
    protected $fillable = [
        'vehicle_id',
        'port_of_operation',
    ];

}
