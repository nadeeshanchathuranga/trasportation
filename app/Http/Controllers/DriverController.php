<?php



namespace App\Http\Controllers;
use App\Models\Driver;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DriverController extends Controller
{
     public function index()
    {


        return Inertia::render('Driver/DriverIndex');
    }




public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:drivers,email',
        'phone' => 'required|string|max:20',
        'dob' => 'required|date',
        'address' => 'required|string',
        'nic' => 'required|file|mimes:jpeg,png,pdf|max:2048',
        'license' => 'required|file|mimes:jpeg,png,pdf|max:2048',
        'police_clearance' => 'required|file|mimes:jpeg,png,pdf|max:2048',
        'certifications' => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
    ]);

    $nic = $request->file('nic')->store('drivers/nic', 'public');
    $license = $request->file('license')->store('drivers/license', 'public');
    $clearance = $request->file('police_clearance')->store('drivers/clearance', 'public');

    $certifications = null;
    if ($request->hasFile('certifications')) {
        $certifications = $request->file('certifications')->store('drivers/certifications', 'public');
    }

    Driver::create([
        'user_id' => auth()->id(),
        'name' => $request->name,
        'email' => $request->email,
        'phone' => $request->phone,
        'dob' => $request->dob,
        'address' => $request->address,
        'nic_path' => $nic,
        'license_path' => $license,
        'police_clearance_path' => $clearance,
        'certifications' => $certifications,
    ]);

    return back()->with('success', 'Driver registered successfully!');
}




}
