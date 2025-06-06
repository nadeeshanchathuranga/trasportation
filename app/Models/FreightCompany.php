<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FreightCompany extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_name',
        'business_type',
        'registration_number',
        'email',
        'phone',
        'location',
        'service_types',
        'vehicle_types',
        'capacity_range',
        'business_certificate',
        'tax_document',
        'logo',
        'status'
    ];

    protected $casts = [
        'service_types' => 'array',
        'vehicle_types' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 