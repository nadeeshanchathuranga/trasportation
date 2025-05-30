<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = [
        'causer_type',
        'causer_id',
        'subject_type',
        'subject_id',
        'action',
        'description',
        'properties',
        'ip_address'
    ];
    
    protected $casts = [
        'properties' => 'array',
    ];
    
    public function causer()
    {
        return $this->morphTo();
    }
    
    public function subject()
    {
        return $this->morphTo();
    }
}