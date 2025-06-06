<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\VehicleCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use App\Models\Customer;
use App\Models\Available_date;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index()
        {
            $vehicle_categories = VehicleCategory::all();
            return Inertia::render('Vendors/index', [
                'user' => Auth::user(),
                'vehicleCategories' => $vehicle_categories,
            ]);
        }


    public function vendorDashboard($vendorId){
         $customers = Customer::with(['user','vehicleType'])
        ->where('vendor_id',$vendorId)
        ->get();
        $customerCount= Customer::where('vendor_id',$vendorId)->count();
        return Inertia::render('Vendors/VendorDashboard',[
            'customers'=> $customers,
            'customerCount'=> $customerCount,
           
        ]);
    }


    public function bookingManagement(){
        return Inertia::render('Vendors/BookingManagement');
    }

    public function earningManagement(){
        return Inertia::render('Vendors/EarningManagement');
    }

    public function promotionManagement(){
        return Inertia::render('Vendors/PromotionManagement');
    }

    public function reportManagement(){
        return Inertia::render('Vendors/ReportsNotification');
    }


    public function reviewsManagement(){
        return Inertia::render('Vendors/ReviewsRatings');
    }

    public function sessionManagement($vendorId)
    {
        $customers = Customer::with(['user','vehicleType'])
                ->where('vendor_id',$vendorId)
                ->get();
        $customerCount= Customer::where('vendor_id',$vendorId)->count();

        return Inertia::render('Vendors/Availability', [
                'customers'=> $customers,
                'customerCount'=> $customerCount,
                
         ]);
        
    }



    
    public function VendorBookingView()
    {
        $user = Auth::user();
        $vendor = $user->vendor;

        // Fetch only the authenticated user's bookings
        $bookings = Available_date::where('vendor_id', $user->id)->latest()->get();
        $bookedDates = $bookings->map(function ($booking) {
            return [
                'start' => \Carbon\Carbon::parse($booking->start_date)->format('Y-m-d'),
                'end'   => \Carbon\Carbon::parse($booking->end_date)->format('Y-m-d'),
            ];
        });
        
        // Fetch vendor's customers with related user and vehicle type
       $customers = Customer::with(['user', 'vehicleType'])
          ->where('vendor_id', $vendor->id)
           ->latest()
          ->get();
      
        //  dd($customers);

        return Inertia::render('Vendors/Availability', [
            'bookings'    => $bookings,
            'bookedDates' => $bookedDates,
            'customers' => $customers,
            'vendor'   => $vendor,
        
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

public function store(Request $request)
{

    try {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'business_name' => 'required|string|max:255',
            'business_registration_no' => 'required|string|max:255',
            'category_id' => 'required|exists:vehicle_categories,id',
            'no_of_vehicles' => 'required|integer',
            'registration_document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'business_logo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'air_certificate' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'meritime_lisence' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // Save uploaded files
        if ($request->hasFile('registration_document')) {
            $validated['registration_document'] = $request->file('registration_document')->store('vendors/documents');
        }

        if ($request->hasFile('business_logo')) {
            $validated['business_logo'] = $request->file('business_logo')->store('vendors/logos');
        }

        if ($request->hasFile('air_certificate')) {
            $validated['air_certificate'] = $request->file('air_certificate')->store('vendors/air');
        }

        if ($request->hasFile('meritime_lisence')) {
            $validated['meritime_lisence'] = $request->file('meritime_lisence')->store('vendors/sea');
        }

         $validated['status'] = 'pending';
        Vendor::create($validated);

        return redirect()->route('vendor.dashboard')->with('success', 'Vendor registered successfully!');
    } catch (Exception $e) {
        Log::error('Vendor Store Error: ' . $e->getMessage());

        return redirect()->back()->with('error', 'Something went wrong while submitting the form. Please try again.');
    }

}

    /**
     * Display the specified resource.
     */
    public function show(Vendor $vendor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vendor $vendor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vendor $vendor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vendor $vendor)
    {
        //
    }



    public function viewDocument(Vendor $vendor, $type)
    {


        $filePath = null;

        switch ($type) {
            case 'air-certificate':
                $filePath = $vendor->air_certificate;
                break;
            case 'registration-document':
                $filePath = $vendor->registration_document;
                break;
            case 'meritime-lisence':
                $filePath = $vendor->meritime_lisence;
                break;
            default:
                abort(404);
        }


    $filePath = null;

        return Storage::response($filePath);
    }

    public function storeAvailableDates(Request $request,$vendorId)
    {
       $request->validate([
        'vendor_id' => 'required|exists:vendors,id',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
       ]);

       $vendor = Vendor::findOrFail($vendorId);

       $vendor->availableDates()->delete();

       foreach($request->available_dates as $date){
           $vendor->availableDates()->create([
            'vendor_id' => $vendorId,
            'available_date'=> $date,
            'description'=> $request->description,
           ]);
       }

       return response()->json([
        'message'=> 'Available dates saved successfully!.',
       ]);

    }

    public function dateRangeBookingStore(Request $request)
{
    // Validate request
    $validated = $request->validate([
        'start_date' => 'required|date|after_or_equal:today',
        'end_date' => 'required|date|after_or_equal:start_date',
        'description' => 'nullable|string|max:255',
    ]);

    try {
        // Get authenticated vendor
        $vendor = auth()->user()->vendor;
        
        // Check for existing bookings in this range
        $conflictingBookings = $vendor->bookings()
            ->where(function($query) use ($validated) {
                $query->whereBetween('start_date', [$validated['start_date'], $validated['end_date']])
                      ->orWhereBetween('end_date', [$validated['start_date'], $validated['end_date']])
                      ->orWhere(function($query) use ($validated) {
                          $query->where('start_date', '<=', $validated['start_date'])
                                ->where('end_date', '>=', $validated['end_date']);
                      });
            })
            ->exists();

        if ($conflictingBookings) {
            return response()->json([
                'message' => 'The selected dates conflict with existing bookings',
                'errors' => ['date_range' => 'Conflict with existing bookings']
            ], 422);
        }

        // Create new booking
        $booking = $vendor->bookings()->create([
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'description' => $validated['description'] ?? 'Vendor Entered Booking',
            'status' => 'confirmed',
        ]);

        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking,
        ]);

    } catch (\Exception $e) {
        \Log::error('Booking store error: ' . $e->getMessage());
        return response()->json([
            'message' => 'Server error occurred',
            'error' => $e->getMessage()
        ], 500);
    }
}

//     public function dateRangevendorBookingStore(Request $request)
//     {
// // dd($request->all());

    
//         $request->validate([
//             'start_date' => 'required|date',
//             'end_date'   => 'required|date|after_or_equal:start_date',
//             'description' => 'required',
//         ]);

//          $userId = auth()->id();
   
//         Available_date::create([
//             'user_id'         => $userId,
//             'start_date'      => $request->start_date,
//             'end_date'        => $request->end_date,
//             'description'     => 'Vendor Entered Booking',
//             'status' => 'confirmed',
            
//         ]);

//         // Return JSON instead of redirect for API
//         return response()->json(['message' => 'Vendor Booking created successfully!']);
//     }
    public function dateRangevendorBooking()
    {
        $user = Auth::user();

        // Fetch only 'pending' and 'confirmed' bookings
        $bookings = Available_date::where('user_id', $user->id)->get();
        $bookedDays = [];

        

        foreach ($bookings as $booking) {
            $bookedDays[] = [
                'start'       => \Carbon\Carbon::parse($booking->start_date)->format('Y-m-d'),
                'end'         => \Carbon\Carbon::parse($booking->end_date)->format('Y-m-d'),
                'description' => $booking->description,
            ];
        }

        return Inertia::render('Vendors/Availability', [
            'bookings'    => $bookings,
            'bookedDates' => $bookedDays,
        ]);
    }



    // public function accept($vendorId){
  
    //     $vendor = Vendor::findOrFail($vendorId);
    //     $vendor->status = 'accepted'; // Note: Fix spelling: "accepted"
    //     $vendor->save();
    //     // Get the customers again for refreshing the page
    //     $customers = $vendor->customers()->with(['vehicleType', 'user'])->latest()->get();
    
    //     return Inertia::render('Vendors/Availability', [
    //         'customers' => $customers,
    //         'vendorId' => $vendorId,
    //     ]);
    // }


    // public function reject($vendorId){
    //     $vendor = Vendor::findOrFail($vendorId);
    //     $vendor->status = 'rejected';
    //     $vendor->save();
    
    //     // Get the customers again for refreshing the page
    //     $customers = $vendor->customers()->with(['vehicleType', 'user'])->latest()->get();
    
    //     return Inertia::render('Vendors/Availability', [
    //         'customers' => $customers,
    //         'vendorId' => $vendorId,
    //     ]);
    // }

    // public function showbookings($vendorId){
    //      $customercount=Customer::count();
    //      return Inertia::render('Vendors/Showbooking',[
             
    //      ]);
    // }

  
    // public function getVendorCalender($vendorId)
    // {
    //     $customers = Customer::with('user')
    //          ->where('vendor_id',$vendorId)
    //          ->get();
    //     return response()->json($customers);

    // }

    // public function getVendorBookings($vendorId)
    // {
    //     $bookings = Customer::with(['user','vehicleType'])
    //             ->where('vendor_id',$vendorId)
    //             ->get();

    //     return Inertia::render('Vendors/index', [
    //                 'vendor_id'=> $vendorId,
    //                 'bookings'=> $bookings,
    //     ]);
    // }

}
