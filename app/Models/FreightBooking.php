<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreightBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_type',
        'multimodal_preferences',
        'origin',
        'destination',
        'preferred_pickup_date',
        'total_volume',
        'container_type',
        'weight',
        'package_count',
        'packing_list_path',
        'commercial_invoice_path',
        'status',
    ];

    protected $casts = [
        'multimodal_preferences' => 'array',
        'origin' => 'array',
        'destination' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
