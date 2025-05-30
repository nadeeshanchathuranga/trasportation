<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Vendor;
use App\Models\Driver;
use App\Models\DriverComplaint;
use App\Models\DriverServicePackage;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{

    public function index()
    {
        $pendingComplaints = DriverComplaint::where('status', 'pending')->count();
        $totalComplaints = DriverComplaint::count();

        return Inertia::render('Admin/index', [
            'pendingComplaints' => $pendingComplaints,
            'totalComplaints' => $totalComplaints
        ]);
    }

    // This function is used to display the list of vendors
    public function vendorList()
    {
        $vendor_lists = Vendor::with('user')->get();
        return Inertia::render('Admin/vendor_list', [
            'vendor_lists' => $vendor_lists,
        ]);
    }

    public function vendorReject($id)
    {
        $vendor = Vendor::findOrFail($id);
        $vendor->status = 'rejected';
        $vendor->save();

        return back()->with('message', 'Vendor rejected successfully.');
    }

    public function vendorApprove($id)
    {
        $vendor = Vendor::findOrFail($id);
        $vendor->status = 'accepted';
        $vendor->save();

        return back()->with('message', 'Vendor approved successfully.');
    }


    // This function is used to display the list of drivers
    public function driverList()
    {
        $driver_lists = Driver::whereHas('user', function ($query) {
            $query->where('role_type', 'driver');
        })->with('user')->get();

        return Inertia::render('Admin/DriverList', [
            'driver_lists' => $driver_lists,
        ]);
    }

    public function driverApprove($id)
    {
        $driver = Driver::findOrFail($id);
        $driver->status = 'accepted';
        $driver->save();

        return back()->with('success', ' Driver approved successfully.');
    }

    public function driverReject($id)
    {
        $driver = Driver::findOrFail($id);
        $driver->status = 'rejected';
        $driver->save();

        return back()->with('success', '  Driver rejected successfully.');
    }

    public function driverSuspend($id)
    {
        $driver = Driver::findOrFail($id);
        $driver->status = 'suspended';
        $driver->save();

        return back()->with('success', 'Driver has been suspended.');
    }

    public function driverBan($id)
    {
        $driver = Driver::findOrFail($id);
        $driver->status = 'banned';
        $driver->save();

        return back()->with('success', 'Driver has been permanently banned.');
    }

    public function driverReactivate($id)
    {
        $driver = Driver::findOrFail($id);
        $driver->status = 'accepted';
        $driver->save();

        return back()->with('success', 'Driver has been reactivated.');
    }

    // This function is used to display the list of driver's packages
    public function packageList()
    {
        $packages = DriverServicePackage::with(['driver.user'])->orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/PackageList', [
            'packages' => $packages
        ]);
    }

    public function approvePackage($id)
    {
        $package = DriverServicePackage::findOrFail($id);
        $package->status = 'approved';
        $package->save();

        return back()->with('success', 'Service package approved successfully.');
    }

    public function rejectPackage(Request $request, $id)
    {
        $request->validate([
            'rejection_reason' => 'required|string|min:5'
        ]);

        $package = DriverServicePackage::findOrFail($id);
        $package->status = 'rejected';
        $package->rejection_reason = $request->rejection_reason;
        $package->save();

        return back()->with('success', 'Service package rejected successfully.');
    }
}
