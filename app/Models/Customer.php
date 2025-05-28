<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'Pickup_Location',
        'Pickup_date',
        'no_of_days',
        'vehicle_type',
    ];
}
