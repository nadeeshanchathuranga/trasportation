<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\VehicleBrand;

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
        'vehicle_brand_id',
        'category',
        'color',
        'condition',
        'ownership_type',
        'passenger_capacity',
        'currect_milage',
        'description',
        'insuarance_provider_name',
        'insuarance_document',
        'cover_image',
        'driver_status', // Added driver status field
    ];

    public function images()
    {
        return $this->hasMany(VehicleImage::class);
    }

    public function land()
    {
        return $this->hasOne(LandVehicle::class);
    }

    public function air()
    {
        return $this->hasOne(AirVehicle::class);
    }

    public function sea()
    {
        return $this->hasOne(SeaVehicle::class);
    }

    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    public function brand()
    {
        return $this->belongsTo(VehicleBrand::class, 'vehicle_brand_id');
    }

}
