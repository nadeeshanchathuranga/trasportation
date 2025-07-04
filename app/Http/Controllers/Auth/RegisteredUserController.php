<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Country;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */

public function create(): Response
{

$countries = Country::select('name', 'code')->orderBy('name')->get();
 

    return Inertia::render('Auth/Register', [
        'countries' => $countries,
    ]);
}



   public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:users,email',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'address' => 'required|string|max:255',
        'country' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
        'role_type' => 'required|in:admin,vendor,user,driver,freight',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'address' => $request->address,
        'country' => $request->country,
        'phone' => $request->phone,
        'role_type' => $request->role_type,
    ]);

    event(new Registered($user));
    Auth::login($user);

    // Role-based redirection
    switch ($user->role_type) {
        case 'admin':
            return redirect()->route('admin.view');
        case 'vendor':
            return redirect()->route('vendor.index');
        case 'user':
            return redirect()->route('home');
        case 'driver':
            return redirect()->route('driver.view');
        case 'freight':
            return redirect()->route('freight.dashboard');
        default:
            return redirect()->route('dashboard');
    }
}

}
