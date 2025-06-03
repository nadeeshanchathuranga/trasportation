<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory; // ✅ correct namespace
use Illuminate\Database\Eloquent\Model;

class DriverBookingComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'driver_booking_id',
        'comment',
    ];

    // Relationship to the booking (if using Booking model)
 public function booking()
{
    return $this->belongsTo(DriverBooking::class, 'driver_booking_id');
}
}
