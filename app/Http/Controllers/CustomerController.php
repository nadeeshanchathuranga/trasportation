<?php

namespace App\Http\Controllers;
use App\Models\Customer;
use App\Models\VehicleType;
use App\Models\Vendor;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Exception;

use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
                'date'=> 'required|date',
                'pick_up_location'=> 'required|string|max:255',
                'vehicle_type_id'=>'required|exists:vehicle_types,id',
                'vendor_id'=>'required|exists:vendors,id',

            ]);
           
           $customer = Customer::create([
               'pick_up_location' => $validated['pick_up_location'],
               'vehicle_type_id' => $validated['vehicle_type_id'],
               'vendor_id' => $validated['vendor_id'],
               'user_id' => auth()->id(),
               'date' => $validated['date'],  
           ]);

        return redirect()->back()->route('customer.create')->with('success','Customer created.');
        } catch(Exception $e) {
            Log::error('Customer Store Error: ' .$e->getMessage());
            return back()->with('error','Failed to create customer.Please try again.');
        }
    }

    public function create(){
         
        $vehicle_types = VehicleType::all();
        $vendors = Vendor::all();

        return Inertia:: render('Customer' , [
            'vehicle_types' => $vehicle_types,
            'vendors' => $vendors

        ]);
    }

    public function destroy(){

    }

    // public function index(){


    // }

    public function update(){

    }

    public function edit(){

    }

    public function accept(Customer $customer)
    {
        try {
            // Verify the customer belongs to the authenticated vendor
            if ($customer->vendor_id !== auth()->user()->vendor->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $customer->update(['status' => 'accepted']);
            
            // return response()->json([
            //     'message' => 'Customer booking accepted successfully',
            //     'customer' => $customer->fresh()
            // ]);

        } catch (Exception $e) {
            Log::error('Customer Accept Error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to accept booking'], 500);
        }
        
    }

    public function reject(Customer $customer)
    {
        try {
            // Verify the customer belongs to the authenticated vendor
            if ($customer->vendor_id !== auth()->user()->vendor->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $customer->update(['status' => 'rejected']);
            
            // return response()->json([
            //     'message' => 'Customer booking rejected successfully',
            //     'customer' => $customer->fresh()
            // ]);
        

        } catch (Exception $e) {
            Log::error('Customer Reject Error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to reject booking'], 500);
        }
    }
}
