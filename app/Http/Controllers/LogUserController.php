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

    // return Inertia::render('Web/dashboard/FlightView', [
    //     'flight' => $flightView,
    //     'user' => $user,
    // ]);

    return Inertia::render('Web/dashboard/FlightView', [
    'bookings' => $bookings,
    'auth' => [
        'user' => $user,
        'user_type' => $user->role_type, // Pass user role type
    ],
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
        $bookings = BookingSummary::with('flight')->get();
    } else {
        $bookings = collect();
    }

    $flights = Flight::all(); // <- always get flights

    return Inertia::render('Web/dashboard/BookingView', [
        'bookings' => $bookings,
        'flights' => $flights,
        'auth' => [
            'user' => $user,
            'user_type' => $user->role_type,
        ],
    ]);
}




public function destroy($id)
{


   $booking = BookingSummary::findOrFail($id);


    if ($booking->status !== 'cancelled') {
        $booking->status = 'cancelled';
        $booking->save();
    }

    return redirect()->back()->with('success', 'Booking has been cancelled.');
}




public function edit(Request $request, $id)
{
    $booking = BookingSummary::findOrFail($id);

    $validated = $request->validate([
        'flight_id' => 'required|exists:flights,id',
        'seat_number' => 'required|string|max:10',
        'price' => 'required|numeric|min:0',
        'tax' => 'required|numeric|min:0',
        'baggage' => 'nullable|string|max:255',
        'departure_time' => 'required',
        'arrival_time' => 'nullable',
        'status' => 'required|in:pending,confirmed,cancelled',
    ]);

    $booking->update($validated);

    return redirect()->back()->with('success', 'Booking updated successfully!');
}



    public function airTicketBook()
    {

        return Inertia::render('Web/dashboard/AirticketBook', [

        ]);

    }



  public function airTicketBookView()
    {

        return Inertia::render('Web/dashboard/AirticketBookView', [

        ]);

    }













}
