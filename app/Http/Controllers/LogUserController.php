<?php



namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\BookingSummary;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class LogUserController extends Controller
{
   public function UserIndex()
    {

        return Inertia::render('Web/dashboard/View', [

        ]);

    }






public function flightView()
{




    $user = Auth::user();

    if ($user->role_type === 'user') {
        $flightView = Flight::with('user')
            ->where('user_id', $user->id)
            ->get();


    } elseif (in_array($user->role_type, ['admin', 'superadmin'])) {

        $flightView = Flight::with('user')->get();


    } else {

        $flightView = collect();
    }

    return Inertia::render('Web/dashboard/FlightView', [
        'flight' => $flightView
    ]);
}







public function bookingView()
{

    $user = Auth::user();

    if ($user->role_type === 'user') {
        $bookings = BookingSummary::with('flight')
            ->where('user_id', $user->id)
            ->get();


    } elseif (in_array($user->role_type, ['admin', 'superadmin'])) {

        $bookings = BookingSummary::with(['flight'])->get();


    } else {

        $bookings = collect();
    }

    return Inertia::render('Web/dashboard/BookingView', [
        'bookings' => $bookings
    ]);
}






}
