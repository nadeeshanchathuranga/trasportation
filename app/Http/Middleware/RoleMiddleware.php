<?php


namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle($request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        $user = Auth::user();

        if (!in_array($user->role_type, $roles)) {

            // dd($user->role_type);
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}
