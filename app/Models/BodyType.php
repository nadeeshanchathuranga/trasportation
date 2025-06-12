<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BodyType extends Model
{
    use HasFactory;

    protected $fillable = [
        'bodyType',
        'bodyTypeImage',
        'description',
        'status',
    ];
}
