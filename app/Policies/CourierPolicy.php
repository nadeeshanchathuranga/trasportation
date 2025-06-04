<?php

namespace App\Policies;

use App\Models\Courier;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CourierPolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        return $user->role_type === 'admin';
    }
    
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Courier $courier)
    {
        return $user->id === $courier->user_id || $user->role_type === 'admin';
    }
    
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        return true; // Allow any authenticated user to create
    }
}