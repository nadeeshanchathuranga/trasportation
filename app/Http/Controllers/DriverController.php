<?php
namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\DriverBooking;
use App\Models\DriverBookingComment;
use App\Models\DriverServicePackage;
use App\Models\DriverServicePackagesType;
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


    $driver = Driver::where('user_id', auth()->id())->first();



        $servicePackageTypes = DriverServicePackagesType::where('is_active', true)->get();

        return Inertia::render('Driver/ServicePackageForm', [

            'servicePackageTypes' => $servicePackageTypes,
          'driver' => $driver ?? ['user_id' => null], // sends { id: value } to frontend
        ]);
    }



public function servicePackageStore(Request $request)
{
    try {
        // Validate the incoming request
        $validated = $request->validate([
            'driver_id' => 'required|exists:drivers,user_id',
            'type_id' => 'required|integer|exists:driver_service_packages_types,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'duration_in_hours' => 'required|numeric|min:0.5',
        ]);

        // Set default status
        $validated['status'] = 'pending';

        // Create the service package
        DriverServicePackage::create($validated);

        return redirect()->route('driver.service_package.view')
            ->with('success', 'Service Package created successfully.');

    } catch (\Exception $e) {
        \Log::error('Service Package Creation Error: ' . $e->getMessage());

        return redirect()->back()
            ->withInput()
            ->with('error', 'Something went wrong. Please try again.');
    }
}







public function servicePackageUpdate(Request $request, $id)
{
    try {
        // Validate incoming request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type_id' => 'required|integer|exists:driver_service_packages_types,id', // Added integer validation for consistency
            'price' => 'required|numeric|min:0',
            'duration_in_hours' => 'required|numeric|min:0.5',
            'description' => 'required|string|max:1000',
        ]);

        // Find the service package
        $servicePackage = DriverServicePackage::findOrFail($id);

        // Optional: Ensure the logged-in user owns this service package
        $driver = Driver::where('user_id', auth()->id())->first();
        if (!$driver || $servicePackage->driver_id !== $driver->user_id) { // Fixed comparison logic
            return redirect()->back()
                ->with('error', 'Unauthorized to update this service package.');
        }

        // Update the package
        $servicePackage->update($validated);

        return redirect()->back()->with('success', 'Service package updated successfully.');
    } catch (\Exception $e) {


        \Log::error('Service Package Update Error: ' . $e->getMessage());

        return redirect()->back()
            ->withInput()
            ->with('error', 'Something went wrong while updating the service package.');
    }
}




    public function servicePackageView()
    {
        $user   = Auth::user();
        $driver = Driver::where('user_id', $user->id)->first();


        $packages= DriverServicePackage::with('type')->where('status', 'approved')->get();
        // $packages = $driver
        // ? DriverServicePackage::with('type')->where('driver_id', $driver->id)->latest()->get()
        // : collect();


        $servicePackageTypes = DriverServicePackagesType::where('is_active', 1)->get();


        return Inertia::render('Driver/ServicePackageView', [
            'user'                => $user,
            'driver'              => $driver,
            'packages'            => $packages,
            'servicePackageTypes' => $servicePackageTypes, // ✅ added
        ]);
    }

    public function deleteServicePackage($id)
    {
        $package = DriverServicePackage::findOrFail($id);

        $package->delete(); // Perform the deletion

        return back()->with('success', 'Service package deleted successfully.');
    }

    public function dateRangeBooking()
    {
        $user = Auth::user();

        // Fetch only 'pending' and 'confirmed' bookings
        $bookings = DriverBooking::where('user_id', $user->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->get();

        $bookedDays = [];
        foreach ($bookings as $booking) {
            $bookedDays[] = [
                'start'       => \Carbon\Carbon::parse($booking->start_date)->format('Y-m-d'),
                'end'         => \Carbon\Carbon::parse($booking->end_date)->format('Y-m-d'),
                'status'      => $booking->status,
                'description' => $booking->description,
            ];
        }

        return Inertia::render('Driver/CallenderBooking', [
            'bookings'    => $bookings,
            'bookedDates' => $bookedDays,
        ]);
    }

    public function driverBookingView()
    {
        $user = Auth::user();

        // Fetch only the authenticated user's bookings
        $bookings = DriverBooking::with('comments')->where('user_id', $user->id)->latest()->get();

        $bookedDates = $bookings->map(function ($booking) {
            return [
                'start' => \Carbon\Carbon::parse($booking->start_date)->format('Y-m-d'),
                'end'   => \Carbon\Carbon::parse($booking->end_date)->format('Y-m-d'),
            ];
        });

        return Inertia::render('Driver/DriverBookingView', [
            'bookings'    => $bookings,
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
            'end_date'   => 'required|date|after_or_equal:start_date',
        ]);

        $userId = auth()->id();

        DriverBooking::create([
            'user_id'         => $userId,
            'pickup_location' => 'Personal for Driver',
            'start_date'      => $request->start_date,
            'end_date'        => $request->end_date,
            'description'     => 'Driver Entered Booking',
            'status'          => 'pending',
        ]);

        // Return JSON instead of redirect for API
        return response()->json(['message' => 'Driver Booking created successfully!']);
    }

    public function markAsCompleted(Request $request, $id)
    {
        $booking = DriverBooking::findOrFail($id);

        if ($booking->status !== 'confirmed') {
            return back()->with('message', 'Only confirmed bookings can be completed.');
        }

        $booking->status = 'completed';
        $booking->save();

        return back()->with('message', 'Booking marked as completed.');
    }

    public function driverChat(Request $request)
    {

        $request->validate([
            'driver_booking_id' => 'required|exists:driver_bookings,id',
            'comment'           => 'required|string|max:10000',
        ]);

        DriverBookingComment::create([
            'driver_booking_id' => $request->driver_booking_id,
            'comment'           => $request->comment,
            // optionally add: 'user_id' => auth()->id()
        ]);

        return back()->with('message', 'Chat message sent successfully.');

    }

    public function driverPayOut()
    {

        return Inertia::render('Driver/DriverPayOut', [

        ]);

    }

}
