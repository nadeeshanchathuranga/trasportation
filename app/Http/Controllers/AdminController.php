<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Vendor;
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
}
