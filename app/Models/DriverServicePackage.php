<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DriverServicePackage extends Model
{
      protected $fillable = [
    'driver_id',
    'type_id',
    'title',
    'description',
    'price',
    'duration_in_hours',
    ];


  
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }


    public function type()
{
    return $this->belongsTo(DriverServicePackagesType::class, 'type_id');
}







}
