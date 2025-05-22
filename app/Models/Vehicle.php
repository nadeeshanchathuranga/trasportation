<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
      protected $fillable = [
        'vendor_id',
        // 'type_id',
        'model',
        'manufracture',
        'manufracture_year',
        'register_year',
        'vehicle_no',
        'category',
        'color',
        'condition',
        'ownership_type',
        'passenger_capacity',
        'currect_milage',
        'description',
        'insuarance_provider_name',
        'insuarance_document',
        'cover_image'
    ];

    public function images()
    {
        return $this->hasMany(VehicleImage::class);
    }
}
