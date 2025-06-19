<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\BookingDetail;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'vehicle_id' => 'required|exists:vehicles,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'driver_option' => 'required|in:with,without',
            'driver_license_number' => 'required_if:driver_option,without|nullable|string|max:255',
            'age_range' => 'required|in:21-25,26-35,36-45,46-55,55+',
            'pickup_date' => 'required|date|after_or_equal:today',
            'pickup_time' => 'required|date_format:H:i',
            'dropoff_date' => 'required|date|after_or_equal:pickup_date',
            'dropoff_time' => 'required|date_format:H:i',
            'pickup_location' => 'required|string|max:255|in:Colombo - Main Office,Colombo - Airport,Kandy - City Center,Galle - Fort Area,Negombo - Beach Road,Same as pickup',
            'dropoff_location' => 'required|string|max:255|in:Colombo - Main Office,Colombo - Airport,Kandy - City Center,Galle - Fort Area,Negombo - Beach Road,Same as pickup',
            'insurance_type' => 'required|in:basic,premium',
            'payment_method' => 'required|in:card,paypal',
            'special_requests' => 'nullable|string',
            'hear_about_us' => 'required|string|max:255|in:Google Search,Social Media,Friend/Family,Advertisement,Travel Agency,Other',
            'terms_accepted' => 'required|accepted',
        ], [
            'pickup_date.after_or_equal' => 'Pickup date must be today or in the future',
            'dropoff_date.after_or_equal' => 'Drop-off date must be on or after pickup date',
            'driver_license_number.required_if' => 'Driver license number is required when choosing to drive yourself',
            'terms_accepted.accepted' => 'You must accept the terms and conditions',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $booking = BookingDetail::create($validator->validated());

            // Here you might want to:
            // 1. Process payment
            // 2. Send confirmation email
            // 3. Create any related records

            return response()->json([
                'success' => true,
                'message' => 'Booking successfully created!',
                'data' => $booking,
                'redirect' => url('/booking-confirmation/' . $booking->id)
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
