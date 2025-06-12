<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\vehicle;

class VehicleBrand extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'logo',
        'description',
        'status',
    ];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }

}
