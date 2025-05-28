<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DriverComplaint extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'driver_id',
        'trip_id',
        'subject',
        'description',
        'status',
        'resolution_notes',
        'resolved_at',
        'resolved_by'
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
    ];

    // Relationship with user who submitted the complaint
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with driver
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    // Relationship with admin who resolved the complaint
    public function resolvedBy()
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }
}