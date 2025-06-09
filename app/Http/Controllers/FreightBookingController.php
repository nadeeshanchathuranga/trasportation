<?php

namespace App\Http\Controllers;

use App\Models\FreightBooking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FreightBookingController extends Controller
{
    public function create()
    {
        return Inertia::render('Web/Freight/CreateBooking');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'service_type' => ['required', 'in:LCL,FCL'],
            'multimodal_preferences' => ['nullable', 'array'],
            'origin' => ['required', 'json'],
            'destination' => ['required', 'json'],
            'preferred_pickup_date' => ['nullable', 'date'],
            'total_volume' => ['nullable', 'numeric', 'required_if:service_type,LCL'],
            'container_type' => ['nullable', 'string', 'required_if:service_type,FCL'],
            'weight' => ['required', 'numeric'],
            'package_count' => ['nullable', 'integer'],
            'packing_list' => ['nullable', 'file'],
            'commercial_invoice' => ['nullable', 'file'],
        ]);

        $data['user_id'] = auth()->id();
        $data['origin'] = json_decode($data['origin'], true);
        $data['destination'] = json_decode($data['destination'], true);

        if ($request->hasFile('packing_list')) {
            $data['packing_list_path'] = $request->file('packing_list')->store('documents');
        }

        if ($request->hasFile('commercial_invoice')) {
            $data['commercial_invoice_path'] = $request->file('commercial_invoice')->store('documents');
        }

        FreightBooking::create($data);

        return redirect()->route('dashboard')->with('success', 'Freight booking created successfully.');
    }

    public function index()
    {
        $bookings = FreightBooking::with('user')->latest()->get();
        return Inertia::render('Web/Freight/Dashboard', ['bookings' => $bookings]);
    }

    public function adminIndex()
    {
        $bookings = FreightBooking::with('user')->latest()->get();
        return Inertia::render('Admin/FreightBookings', ['bookings' => $bookings]);
    }

    public function updateStatus(Request $request, FreightBooking $booking)
    {
        $request->validate([
            'status' => ['required', 'in:approved,rejected'],
        ]);

        $booking->update(['status' => $request->status]);

        return back()->with('success', 'Booking status updated.');
    }
}
