<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // ✅ correct namespace
use Illuminate\Database\Eloquent\Model;

class DriverBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pickup_location',
        'start_date',
        'end_date',
        'description',
        'status',
    ];
}
