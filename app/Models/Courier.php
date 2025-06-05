<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Courier extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'sender_name',
        'sender_address',
        'sender_telephone',
        'parcel_type',
        'custom_parcel_type',
        'parcel_count',
        'parcel_weight',
        'payment_method',
        'tracking_number',
        'status'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function receivers()
    {
        return $this->hasMany(CourierReceiver::class)->orderBy('location_order');
    }
    
    public static function generateTrackingNumber()
    {
        $prefix = 'TRK';
        $timestamp = now()->format('YmdHi');
        $random = rand(100, 999);
        
        return $prefix . $timestamp . $random;
    }
}