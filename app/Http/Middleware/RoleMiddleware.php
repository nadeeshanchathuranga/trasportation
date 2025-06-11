<?php


namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle($request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
             return redirect()->route('home');
        }

        $user = Auth::user();

       if (!$user || !in_array($user->role_type, $roles)) {
        return redirect('/unauthorized')->with('error', 'You are not authorized to access this page.');
    }

        return $next($request);
    }
}
