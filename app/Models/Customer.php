<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'pick_up_location',
        'vehicle_type_id',
        'user_id',
        'date',
        'vendor_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicleType()
    {
        return $this->belongsTo(VehicleType::class);
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    


}
