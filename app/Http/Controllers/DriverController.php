<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\DriverBooking;
use App\Models\DriverBookingComment;
use App\Models\DriverServicePackage;
use App\Models\DriverServicePackagesType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Inertia\Inertia;

class DriverController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $driver = Driver::where('user_id', $user->id)->first();

        if (!$driver) {
            return Inertia::render('Driver/DriverIndex', ['user' => $user]);
        }

        switch ($driver->status) {
            case 'accepted':
                return Inertia::render('Driver/ServicePackage', [
                    'user' => $user,
                    'driver' => $driver,
                ]);
            case 'pending':
                return Inertia::render('Driver/PendingApproval', [
                    'user' => $user,
                    'message' => 'Your driver profile is under review.',
                ]);
            case 'rejected':
                return Inertia::render('Driver/RejectedNotice', [
                    'user' => $user,
                    'message' => 'Your driver application has been rejected.',
                ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'phone' => 'required|string|max:20',
                'dob' => 'required|date|before:-18 years',
                'license_number' => 'required|string|max:100|unique:drivers,license_number',
                'nic' => 'required|file|mimes:jpeg,png,pdf|max:2048',
                'license' => 'required|file|mimes:jpeg,png,pdf|max:2048',
                'police_clearance' => 'required|file|mimes:jpeg,png,pdf|max:2048',
                'certifications' => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
                'profile_photo' => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            $existingDriver = Driver::where('user_id', auth()->id())->first();
            if ($existingDriver) {
                return back()->with('error', 'You are already registered as a driver.');
            }

            $nic = $request->file('nic')->store('drivers/nic', 'public');
            $license = $request->file('license')->store('drivers/license', 'public');
            $clearance = $request->file('police_clearance')->store('drivers/clearance', 'public');

            $certifications = $request->hasFile('certifications') ? $request->file('certifications')->store('drivers/certifications', 'public') : null;
            $profilePhoto = $request->hasFile('profile_photo') ? $request->file('profile_photo')->store('drivers/profile_photos', 'public') : null;

            $driver = Driver::create([
                'user_id' => auth()->id(),
                'phone' => $validatedData['phone'],
                'dob' => $validatedData['dob'],
                'license_number' => $validatedData['license_number'],
                'nic_path' => $nic,
                'license_path' => $license,
                'police_clearance_path' => $clearance,
                'certifications' => $certifications,
                'profile_photo' => $profilePhoto,
                'status' => 'pending',
            ]);

            \Log::info('Driver registered successfully', [
                'user_id' => auth()->id(),
                'driver_id' => $driver->id,
            ]);

            return back()->with('success', 'Driver registered successfully! Your application is under review.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::warning('Validation failed', ['errors' => $e->errors()]);
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            \Log::error('Registration failed', ['error' => $e->getMessage()]);
            return back()->with('error', 'Registration failed due to server error.');
        }
    }

    public function edit($userId)
    {
        $driver = Driver::where('user_id', $userId)->with('user')->first();
        if (!$driver) {
            return redirect()->route('dashboard')->with('error', 'Driver profile not found.');
        }

        return inertia('Driver/DriverEdit', ['driver' => $driver]);
    }

    public function update(Request $request)
    {
        try {
            $driver = auth()->user()->driver;
            if (!$driver) {
                return back()->with('error', 'Driver profile not found.');
            }

            $validatedData = $request->validate([
                'dob' => 'required|date|before:-18 years',
                'license_number' => 'required|string|max:100|unique:drivers,license_number,' . $driver->id,
                'nic' => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
                'license' => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
                'police_clearance' => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
                'certifications' => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
                'profile_photo' => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            $fileFields = [
                'nic' => ['field' => 'nic_path', 'directory' => 'drivers/nic'],
                'license' => ['field' => 'license_path', 'directory' => 'drivers/license'],
                'police_clearance' => ['field' => 'police_clearance_path', 'directory' => 'drivers/clearance'],
                'certifications' => ['field' => 'certifications', 'directory' => 'drivers/certifications'],
                'profile_photo' => ['field' => 'profile_photo', 'directory' => 'drivers/profile_photos']
            ];

            foreach ($fileFields as $inputName => $config) {
                if ($request->hasFile($inputName)) {
                    if ($driver->{$config['field']} && Storage::disk('public')->exists($driver->{$config['field']})) {
                        Storage::disk('public')->delete($driver->{$config['field']});
                    }
                    $driver->{$config['field']} = $request->file($inputName)->store($config['directory'], 'public');
                }
            }

            $driver->dob = $validatedData['dob'];
            $driver->license_number = $validatedData['license_number'];
            $driver->save();

            return redirect()->route('dashboard')->with('success', 'Driver profile updated successfully!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            \Log::error('Driver update failed', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to update profile.');
        }
    }

    public function servicePackageUpdate(Request $request, $id)
    {


        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'type_id' => 'required|integer|exists:driver_service_packages_types,id',
                'price' => 'required|numeric|min:0',
                'duration_in_hours' => 'required|numeric|min:0.5',
                'description' => 'required|string|max:1000',
            ]);

            $servicePackage = DriverServicePackage::findOrFail($id);
            $driver = Driver::where('user_id', auth()->id())->first();

            if (!$driver || $servicePackage->driver_id !== $driver->id) {
                return redirect()->back()->with('error', 'Unauthorized to update this service package.');
            }

            $servicePackage->update($validated);
            return redirect()->back()->with('success', 'Service package updated successfully.');
        } catch (\Exception $e) {
           
            \Log::error('Service Package Update Error: ' . $e->getMessage());
            return redirect()->back()->withInput()->with('error', 'Something went wrong while updating the service package.');
        }
    }

    public function servicePackageView()
    {
        $user = Auth::user();
        $driver = Driver::where('user_id', $user->id)->first();
        $packages = DriverServicePackage::with('type')->where('status', 'approved')->get();
        $servicePackageTypes = DriverServicePackagesType::where('is_active', 1)->get();

        return Inertia::render('Driver/ServicePackageView', [
            'user' => $user,
            'driver' => $driver,
            'packages' => $packages,
            'servicePackageTypes' => $servicePackageTypes,
        ]);
    }

    public function deleteServicePackage($id)
    {
        $package = DriverServicePackage::findOrFail($id);
        $package->delete();
        return back()->with('success', 'Service package deleted successfully.');
    }

  public function dateRangeBooking()
{
    $user = Auth::user();

    $bookings = DriverBooking::where('user_id', $user->id)
        ->whereIn('status', ['pending', 'confirmed'])
        ->get();

    $bookedDays = $bookings->map(function ($booking) {
        return [
            'start' => Carbon::parse($booking->start_date)->toDateString(),
            'end' => Carbon::parse($booking->end_date)->toDateString(),
            'status' => $booking->status,
            'description' => $booking->description,
        ];
    });

    return Inertia::render('Driver/CallenderBooking', [
        'bookings' => $bookings,
        'bookedDates' => $bookedDays,
    ]);
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



    public function driverBookingView()
        {
            $user = Auth::user();

            $bookings = DriverBooking::with('comments')
                ->where('user_id', $user->id)
                ->latest()
                ->get();

            $bookedDates = $bookings->map(fn($booking) => [
                'start' => Carbon::parse($booking->start_date)->toDateString(),
                'end'   => Carbon::parse($booking->end_date)->toDateString(),
            ]);

            return Inertia::render('Driver/DriverBookingView', [
                'bookings'     => $bookings,
                'bookedDates'  => $bookedDates,
            ]);
        }

    public function deleteBooking($id)
    {
        $booking = DriverBooking::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

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

        // Prevent booking overlaps
        $overlap = DriverBooking::where('user_id', $userId)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                      ->orWhereBetween('end_date', [$request->start_date, $request->end_date]);
            })->exists();

        if ($overlap) {
            return response()->json(['message' => 'You already have a booking in this time range.'], 422);
        }

        DriverBooking::create([
            'user_id' => $userId,
            'pickup_location' => 'Personal for Driver',
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'description' => 'Driver Entered Booking',
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Driver Booking created successfully!']);
    }

    public function markAsCompleted(Request $request, $id)
    {
        $booking = DriverBooking::findOrFail($id);
        if ($booking->status !== 'confirmed') {
            return back()->with('message', 'Only confirmed bookings can be completed.');
        }

        $booking->update(['status' => 'completed']);
        return back()->with('message', 'Booking marked as completed.');
    }

    public function driverChat(Request $request)
    {
        $request->validate([
            'driver_booking_id' => 'required|exists:driver_bookings,id',
            'comment' => 'required|string|max:10000',
        ]);

        DriverBookingComment::create([
            'driver_booking_id' => $request->driver_booking_id,
            'comment' => $request->comment,
        ]);

        return back()->with('message', 'Chat message sent successfully.');
    }

    public function driverPayOut()
    {
        return Inertia::render('Driver/DriverPayOut');
    }
}
