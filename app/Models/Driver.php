<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
      protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'dob',
        'address',
        'nic_path',
        'license_path',
        'police_clearance_path',
        'certifications',
    ];


      public function user()
    {
        return $this->belongsTo(User::class);
    }

}
