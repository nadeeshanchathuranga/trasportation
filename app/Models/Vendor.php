<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    protected $fillable = [
        'user_id',
        'business_name',
        'business_registration_no',
        'registration_document',
        'business_logo',
        'category_id',
        'no_of_vehicles',
        'air_certificate',
        'meritime_lisence',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }
}
