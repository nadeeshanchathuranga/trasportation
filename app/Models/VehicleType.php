<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
     protected $fillable = [
        'type',
       
    ];

    public function customers(){
        return $this->hasMany(Customer::class);
    }
    
    public function vehicle(){
        return $this->belongsTo(Vehicle::class);
    }
}
