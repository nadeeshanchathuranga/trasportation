<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    protected $fillable = [
        'class',
        'airline',
        'price',
        'departure_time',
        'arrival_time',
        'status',
    ];
}
