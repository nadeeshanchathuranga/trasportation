<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\VehicleCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use App\Models\Customer;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\BookingDetail;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Response;


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


    public function vendorDashboard(){
        return Inertia::render('Web/home/vendors/Dashboard');
        // return Inertia::render('Vendors/VendorDashboard');
    }


    // public function bookingManagement(){
    //     $booking_details = BookingDetail::all();

    //     return Inertia::render('Vendors/BookingManagement', [
    //         'bookingDetails' => $booking_details,
    //     ]);
    // }

    public function downloadReport()
    {
        $bookings = BookingDetail::with('vehicle')->latest()->get();

        $pdf = Pdf::loadView('exports.booking_report', compact('bookings'))
                ->setPaper('A4', 'landscape');

        return $pdf->download('booking_report.pdf');
    }


    public function displayBookingReport()
    {
        $bookings = BookingDetail::with('vehicle')->latest()->paginate(10);

        return Inertia::render('Vendors/BookingReport', [
            'bookingDetails' => $bookings,
        ]);
    }


    public function updateBookingStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Accepted,Cancelled',
        ]);

        $booking = BookingDetail::findOrFail($id);
        $booking->status = $request->status;
        $booking->save();

        return response()->json([
            'message' => "Booking status updated to {$request->status}."
        ]);
    }




   public function bookingManagement()
    {
        $bookingDetails = BookingDetail::with('vehicle')->latest()->paginate(10);

        $stats = [
            'activeDrivers' => 12, // Ideally: Driver::where('status', 'active')->count()
            'activeCustomers' => 36, // Ideally: Customer::where('status', 'active')->count()
            'activeBookings' => 22,
            'ongoingTrips' => 34,
            'totalEarnings' => 145000, // Add this field in your table
        ];

        return Inertia::render('Vendors/BookingManagement', [
            'bookingDetails' => $bookingDetails,
            'stats' => $stats,
        ]);
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

    public function sessionManagement(){
        return Inertia::render('Vendors/Availability');
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

        return redirect()->route('vendor.index')->with('success', 'Vendor registered successfully!');
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

    public function storeAvailableDates(Request $request , $vendorId)
    {
       $request->validate([
        'vendor_id' => 'required|exists:vendors,id',
        'available_dates' => 'required|array',
        'available_dates.*'=> 'date',
       ]);

       $vendor = Vendor::findOrFail($vendorId);

       $vendor->availableDates()->delete();

       foreach($request->available_dates as $date){
           $vendor->availableDates()->create([
            'vendor_id' => $vendorId,
            'available_date'=> $date,
           ]);
       }

       return response()->json([
        'message'=> 'Available dates saved successfully!.',
       ]);

    }

    public function getVendorCalender($vendorId)
    {
        $customers = Customer::with('user')
             ->where('vendor_id',$vendorId)
             ->get();
        return response()->json($customers);

    }

    public function getVendorBookings($vendorId)
    {
        $bookings = Customer::with(['user','vehicleType'])
                ->where('vendor_id',$vendorId)
                ->get();

        return response()->json($bookings);
    }

}
