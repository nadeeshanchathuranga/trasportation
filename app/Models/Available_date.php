<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Available_date extends Model
{
    protected $fillable = [
        'vendor_id',
        'available_dates',
    ];

    public function vendor(){
        return $this->belongsTo(Vendor::class);
    }
}
