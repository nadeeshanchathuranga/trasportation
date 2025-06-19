<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Vehicle;

class BookingDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'driver_option',
        'driver_license_number',
        'age_range',
        'pickup_date',
        'pickup_time',
        'dropoff_date',
        'dropoff_time',
        'pickup_location',
        'dropoff_location',
        'insurance_type',
        'payment_method',
        'special_requests',
        'hear_about_us',
        'terms_accepted'
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
