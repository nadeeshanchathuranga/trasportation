<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
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
    // Optional caching for performance
    $countries = Cache::remember('countries_list', 86400, function () {
        $response = Http::get('https://restcountries.com/v3.1/all');

        if ($response->successful()) {
            return collect($response->json())
                ->pluck('name.common')
                ->sort()
                ->values();
        }



        return collect(); // return empty collection if failed
    });

    return Inertia::render('Auth/Register', [
        'countries' => $countries,
    ]);
}


    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:users,email',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'address' => 'required|string|max:255',
        'country' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
        'role_type' => 'required|in:admin,vendor,user',
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

        return redirect(route('dashboard', absolute: false));
    }
}
