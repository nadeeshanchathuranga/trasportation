<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightSearch extends Model
{
    use HasFactory;

    protected $fillable = [
        'source',
        'destination',
        'travel_date',
        'passenger_count',
        'status',
    ];
}
