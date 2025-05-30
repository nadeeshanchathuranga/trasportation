<?php

namespace App\Services;

use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ActivityLogger
{
    public function log(string $action, ?string $description = null, ?Model $subject = null, array $properties = [])
    {
        return ActivityLog::create([
            'causer_type' => Auth::user() ? get_class(Auth::user()) : null,
            'causer_id' => Auth::id(),
            'subject_type' => $subject ? get_class($subject) : null,
            'subject_id' => $subject ? $subject->id : null,
            'action' => $action,
            'description' => $description,
            'properties' => $properties,
            'ip_address' => Request::ip()
        ]);
    }
}