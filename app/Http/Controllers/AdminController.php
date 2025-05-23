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


    public function vendorList()
    {

        $vendor_lists = Vendor::whereNot('status','delete')->with('user')->get();
        return Inertia::render('Admin/vendor_list', [
                    'vendor_lists' => $vendor_lists,
                ]);
    }

        public function approve($id)
        {
            $vendor = Vendor::findOrFail($id);
            $vendor->status = 'accept';
            $vendor->save();

            return back()->with('message', 'Vendor approved successfully.');
        }

        public function destroy($id)
        {
            $vendor = Vendor::findOrFail($id);
            $vendor->status = 'delete';
            $vendor->save();

            return back()->with('message', 'Vendor status set to deleted.');
        }






}
