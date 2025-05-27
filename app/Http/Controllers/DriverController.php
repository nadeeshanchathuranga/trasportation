<?php
namespace App\Http\Controllers;

use App\Models\Driver;
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

}
