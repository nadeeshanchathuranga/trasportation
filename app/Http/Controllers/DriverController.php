<?php
namespace App\Http\Controllers;
use App\Models\Driver;
use App\Models\DriverBooking;
use App\Models\DriverServicePackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DriverController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        // Check if this user is a driver
        $driver = Driver::where('user_id', $user->id)->first();

        // If the user has a driver profile
        if ($driver) {
            if ($driver->status === 'accepted') {
                return Inertia::render('Driver/ServicePackage', [
                    'user'   => $user,
                    'driver' => $driver,
                ]);
            } elseif ($driver->status === 'pending') {
                return Inertia::render('Driver/PendingApproval', [
                    'user'    => $user,
                    'message' => 'Your driver profile is under review.',
                ]);
            } elseif ($driver->status === 'rejected') {

                return Inertia::render('Driver/RejectedNotice', [
                    'user'    => $user,
                    'message' => 'Your driver application has been rejected.',
                ]);

            }
        }

      return Inertia::render('Driver/DriverIndex', [
        'user' => $user,

    ]);



    }

    public function store(Request $request)
    {
        $request->validate([
            'phone'            => 'required|string|max:20',
            'dob'              => 'required|date',
            'license_number'   => 'required|string|max:100',
            'nic'              => 'required|file|mimes:jpeg,png,pdf|max:2048',
            'license'          => 'required|file|mimes:jpeg,png,pdf|max:2048',
            'police_clearance' => 'required|file|mimes:jpeg,png,pdf|max:2048',
            'certifications'   => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
        ]);

        $nic       = $request->file('nic')->store('drivers/nic', 'public');
        $license   = $request->file('license')->store('drivers/license', 'public');
        $clearance = $request->file('police_clearance')->store('drivers/clearance', 'public');

        $certifications = null;
        if ($request->hasFile('certifications')) {
            $certifications = $request->file('certifications')->store('drivers/certifications', 'public');
        }

        Driver::create([
            'user_id'               => auth()->id(),
            'phone'                 => $request->phone,
            'dob'                   => $request->dob,
            'license_number'        => $request->license_number,
            'nic_path'              => $nic,
            'license_path'          => $license,
            'police_clearance_path' => $clearance,
            'certifications'        => $certifications,
        ]);

        return back()->with('success', 'Driver registered successfully!');
    }


public function servicePackageForm()
{
    $user = Auth::user();
    $driver = Driver::where('user_id', $user->id)->first();



    return Inertia::render('Driver/ServicePackageForm', [
        'user' => $user,
        'driver' => $driver ?? ['id' => null], // fallback to avoid null errors
    ]);
}



  public function servicePackageStore(Request $request)
    {
        $validated = $request->validate([
            'driver_id' => 'required|exists:drivers,id',
            'type' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'duration_in_hours' => 'required|integer|min:1',
        ]);

        DriverServicePackage::create($validated);

        return redirect()->route('driver.service_package.view')->with('success', 'Service Package created successfully.');
    }


  public function servicePackageView()
    {
        $user = Auth::user();
        $driver = Driver::where('user_id', $user->id)->first();

        $packages = $driver
            ? DriverServicePackage::where('driver_id', $driver->id)->latest()->get()
            : collect();

        return Inertia::render('Driver/ServicePackageView', [
            'user' => $user,
            'driver' => $driver,
            'packages' => $packages,
        ]);
    }





public function deleteServicePackage($id)
{
    $package = DriverServicePackage::findOrFail($id);



    $package->delete(); // Perform the deletion

    return back()->with('success', 'Service package deleted successfully.');
}



public function servicePackageUpdate(Request $request, $id)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'type' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'duration_in_hours' => 'required|numeric|min:0.5',
        'description' => 'required|string|max:1000',
    ]);

    $servicePackage = DriverServicePackage::findOrFail($id);

    $servicePackage->update([
        'title' => $request->title,
        'type' => $request->type,
        'price' => $request->price,
        'duration_in_hours' => $request->duration_in_hours,
        'description' => $request->description,
    ]);

    return redirect()->back()->with('success', 'Service package updated successfully.');
}





public function dateRangeBooking()
{
    $user = Auth::user();

    $bookings = DriverBooking::where('user_id', $user->id)->get();

    $bookedDays = [];

    foreach ($bookings as $booking) {
        $start = new \DateTime($booking->start_date);
        $end = new \DateTime($booking->end_date);
        while ($start <= $end) {
            $bookedDays[] = [
                'date' => $start->format('Y-m-d'),
                'title' => $booking->description ?? 'Booking',
                'status' => $booking->status ?? 'pending',
            ];
            $start->modify('+1 day');
        }
    }

    return Inertia::render('Driver/CallenderBooking', [
        'bookedDates' => $bookedDays,
    ]);
}




public function driverBookingView()
{
    $user = Auth::user();

    // Fetch only the authenticated user's bookings
    $bookings = DriverBooking::where('user_id', $user->id)->latest()->get();

   $bookedDates = $bookings->map(function ($booking) {
    return [
        'start' => \Carbon\Carbon::parse($booking->start_date)->format('Y-m-d'),
        'end' => \Carbon\Carbon::parse($booking->end_date)->format('Y-m-d'),
    ];
});


    return Inertia::render('Driver/DriverBookingView', [
        'bookings' => $bookings,
        'bookedDates' => $bookedDates,
    ]);
}


public function deleteBooking($id)
{
    // Ensure the booking belongs to the logged-in user
    $booking = DriverBooking::where('id', $id)
        ->where('user_id', auth()->id())
        ->firstOrFail();

    // Set the status to 'cancelled' instead of deleting the record
    $booking->update(['status' => 'cancelled']);

    return back()->with('message', 'Driver Booking has been cancelled.');
}



public function acceptBooking($id)
{


    $booking = DriverBooking::findOrFail($id);

    $booking->update(['status' => 'confirmed']);

    return back()->with('message', 'Driver Booking confirmed.');
}












public function dateRangeBookingStore(Request $request)
{
    $request->validate([
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
    ]);

    $userId = auth()->id();

    DriverBooking::create([
        'user_id' => $userId,
        'pickup_location' => 'Personal for Driver',
        'start_date' => $request->start_date,
        'end_date' => $request->end_date,
        'description' => 'Driver Entered Booking',
        'status' => 'pending',
    ]);

    // Return JSON instead of redirect for API
    return response()->json(['message' => 'Driver Booking created successfully!']);
}



}
