<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Vendor;
use App\Models\Driver;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/index');
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


    // This function is used to display the list of vendors
    public function driverList()
    {
        $driver_lists = Driver::with('user')->get();
       
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
}
