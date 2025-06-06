<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;


use Illuminate\Database\Eloquent\Model;

class BookingSummary extends Model
{

 use HasFactory;


     protected $fillable = [
        'user_id',
        'flight_id',
        'seat_number',
        'price',
        'tax',
        'baggage',
        'departure_time',
        'arrival_time',
        'status',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }
}
