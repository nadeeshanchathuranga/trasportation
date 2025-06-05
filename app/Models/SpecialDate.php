<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpecialDate extends Model
{
    protected $fillable = [
        'vendor_id',
        'date',
        'description',
    ];

    public function vendor(){
        return $this->belongsTo(Vendor::class);
    }
}
