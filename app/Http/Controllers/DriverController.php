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
    $driver = Driver::where('user_id', $user->id)->first();



    return Inertia::render('Driver/CallenderBooking');
}



public function dateRangeBookingStore(Request $request)
{
    // Validate incoming request
    $validated = $request->validate([
        'user_id' => 'required|exists:users,id',
        'pickup_location' => 'required|string|max:255',
        'start_date' => 'required|date|after_or_equal:today',
        'end_date' => 'required|date|after_or_equal:start_date',
        'description' => 'nullable|string',
    ]);

    // Create new booking
    $booking = DriverBooking::create([
        'user_id' => $validated['user_id'],
        'pickup_location' => $validated['pickup_location'],
        'start_date' => $validated['start_date'],
        'end_date' => $validated['end_date'],
        'description' => $validated['description'] ?? null,
        'status' => 'pending', // default
    ]);

    // Return response
    return response()->json([
        'message' => 'Booking created successfully.',
        'booking' => $booking
    ], 201);
}







}
