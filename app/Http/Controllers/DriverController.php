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
    try {
        // Validate the request
        $validatedData = $request->validate([
            'phone'            => 'required|string|max:20',
            'dob'              => 'required|date|before:-18 years',
            'license_number'   => 'required|string|max:100|unique:drivers,license_number',
            'nic'              => 'required|file|mimes:jpeg,png,pdf|max:2048',
            'license'          => 'required|file|mimes:jpeg,png,pdf|max:2048',
            'police_clearance' => 'required|file|mimes:jpeg,png,pdf|max:2048',
            'certifications'   => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
            'profile_photo'    => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048',
        ], [
            // Custom error messages
            'phone.required' => 'Phone number is required.',
            'phone.max' => 'Phone number cannot exceed 20 characters.',
            'dob.required' => 'Date of birth is required.',
            'dob.before' => 'You must be at least 18 years old to register as a driver.',
            'license_number.required' => 'License number is required.',
            'license_number.unique' => 'This license number is already registered.',
            'license_number.max' => 'License number cannot exceed 100 characters.',
            'nic.required' => 'NIC document is required.',
            'nic.mimes' => 'NIC must be a JPEG, PNG, or PDF file.',
            'nic.max' => 'NIC file size cannot exceed 2MB.',
            'license.required' => 'Driver license document is required.',
            'license.mimes' => 'License must be a JPEG, PNG, or PDF file.',
            'license.max' => 'License file size cannot exceed 2MB.',
            'police_clearance.required' => 'Police clearance certificate is required.',
            'police_clearance.mimes' => 'Police clearance must be a JPEG, PNG, or PDF file.',
            'police_clearance.max' => 'Police clearance file size cannot exceed 2MB.',
            'certifications.mimes' => 'Certifications must be a JPEG, PNG, or PDF file.',
            'certifications.max' => 'Certifications file size cannot exceed 2MB.',
            'profile_photo.image' => 'Profile photo must be an image.',
            'profile_photo.mimes' => 'Profile photo must be a JPEG, PNG, or JPG file.',
            'profile_photo.max' => 'Profile photo file size cannot exceed 2MB.',
        ]);

        // Check if user is already registered as a driver
        $existingDriver = Driver::where('user_id', auth()->id())->first();
        if ($existingDriver) {
            return back()->with('error', 'You are already registered as a driver.');
        }

        // Store the uploaded files
        $nic = $request->file('nic')->store('drivers/nic', 'public');
        $license = $request->file('license')->store('drivers/license', 'public');
        $clearance = $request->file('police_clearance')->store('drivers/clearance', 'public');

        // Handle optional files
        $certifications = null;
        if ($request->hasFile('certifications')) {
            $certifications = $request->file('certifications')->store('drivers/certifications', 'public');
        }

        $profilePhoto = null;
        if ($request->hasFile('profile_photo')) {
            $profilePhoto = $request->file('profile_photo')->store('drivers/profile_photos', 'public');
        }

        // Create the driver record
        $driver = Driver::create([
            'user_id'               => auth()->id(),
            'phone'                 => $validatedData['phone'],
            'dob'                   => $validatedData['dob'],
            'license_number'        => $validatedData['license_number'],
            'nic_path'              => $nic,
            'license_path'          => $license,
            'police_clearance_path' => $clearance,
            'certifications'        => $certifications,
            'profile_photo'         => $profilePhoto,
            'status'                => 'pending', // Assuming you have a status field
        ]);

        // Log the successful registration
        \Log::info('Driver registered successfully', [
            'user_id' => auth()->id(),
            'driver_id' => $driver->id,
            'license_number' => $validatedData['license_number']
        ]);

        return back()->with('success', 'Driver registered successfully! Your application is under review.');

    } catch (\Illuminate\Validation\ValidationException $e) {

        \Log::warning('Driver registration validation failed', [
            'user_id' => auth()->id(),
            'errors' => $e->errors()
        ]);

        return back()->withErrors($e->errors())->withInput();

    } catch (\Exception $e) {

        \Log::error('Driver registration failed', [
            'user_id' => auth()->id(),
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return back()->with('error', 'Registration failed due to a server error. Please try again later.');
    }
}





public function edit($userId)
{
    $driver = Driver::where('user_id', $userId)->with('user')->first();


    if (!$driver) {
        return redirect()->route('dashboard')->with('error', 'Driver profile not found.');
    }

    return inertia('Driver/DriverEdit', [
        'driver' => $driver,
    ]);
}






public function update(Request $request)
{
    try {
        // Get the current driver
        $driver = auth()->user()->driver;

        if (!$driver) {
            return back()->with('error', 'Driver profile not found.');
        }

        // Validation rules
        $validatedData = $request->validate([
            'dob'              => 'required|date|before:-18 years',
            'license_number'   => 'required|string|max:100|unique:drivers,license_number,' . $driver->id,
            'nic'              => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
            'license'          => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
            'police_clearance' => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
            'certifications'   => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
            'profile_photo'    => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048',
        ], [
            // Custom error messages
            'dob.required' => 'Date of birth is required.',
            'dob.before' => 'You must be at least 18 years old.',
            'license_number.required' => 'License number is required.',
            'license_number.unique' => 'This license number is already registered.',
            'license_number.max' => 'License number cannot exceed 100 characters.',
            'nic.mimes' => 'NIC must be a JPEG, PNG, or PDF file.',
            'nic.max' => 'NIC file size cannot exceed 2MB.',
            'license.mimes' => 'License must be a JPEG, PNG, or PDF file.',
            'license.max' => 'License file size cannot exceed 2MB.',
            'police_clearance.mimes' => 'Police clearance must be a JPEG, PNG, or PDF file.',
            'police_clearance.max' => 'Police clearance file size cannot exceed 2MB.',
            'certifications.mimes' => 'Certifications must be a JPEG, PNG, or PDF file.',
            'certifications.max' => 'Certifications file size cannot exceed 2MB.',
            'profile_photo.image' => 'Profile photo must be an image.',
            'profile_photo.mimes' => 'Profile photo must be a JPEG, PNG, or JPG file.',
            'profile_photo.max' => 'Profile photo file size cannot exceed 2MB.',
        ]);

        // Handle file uploads
        $fileFields = [
            'nic' => ['field' => 'nic_path', 'directory' => 'drivers/nic'],
            'license' => ['field' => 'license_path', 'directory' => 'drivers/license'],
            'police_clearance' => ['field' => 'police_clearance_path', 'directory' => 'drivers/clearance'],
            'certifications' => ['field' => 'certifications', 'directory' => 'drivers/certifications'],
            'profile_photo' => ['field' => 'profile_photo', 'directory' => 'drivers/profile_photos']
        ];

        foreach ($fileFields as $inputName => $config) {
            if ($request->hasFile($inputName)) {
                // Delete old file if exists
                if ($driver->{$config['field']} && Storage::disk('public')->exists($driver->{$config['field']})) {
                    Storage::disk('public')->delete($driver->{$config['field']});
                }

                // Store new file
                $driver->{$config['field']} = $request->file($inputName)->store($config['directory'], 'public');
            }
        }

        // Update driver fields
        $driver->dob = $validatedData['dob'];
        $driver->license_number = $validatedData['license_number'];

        // Save the driver
        $driver->save();

        \Log::info('Driver profile updated successfully', [
            'user_id' => auth()->id(),
            'driver_id' => $driver->id,
            'updated_fields' => array_keys($validatedData)
        ]);

        return redirect()->route('dashboard')->with('success', 'Driver profile updated successfully!');

    } catch (\Illuminate\Validation\ValidationException $e) {
        \Log::warning('Driver update validation failed', [
            'user_id' => auth()->id(),
            'errors' => $e->errors()
        ]);

        return back()->withErrors($e->errors())->withInput();

    } catch (\Exception $e) {
        \Log::error('Driver update failed', [
            'user_id' => auth()->id(),
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return back()->with('error', 'Failed to update profile. Please try again later.');
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
