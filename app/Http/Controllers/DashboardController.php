<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;



class DashboardController extends Controller
{

public function index()
{
    $user = Auth::user();

    // if ($user->role_type === 'vendor') {
    //     return redirect()->route('vendor.index');
    // }

    return Inertia::render('Dashboard', [
        'user' => $user,
    ]);
}



}
