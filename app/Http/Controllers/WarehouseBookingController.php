<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Warehouse;
use App\Models\WarehouseBooking;
use Illuminate\Support\Facades\Auth;

class WarehouseBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Warehouse $warehouse, Request $request)
    {
        // Check if warehouse is active
        if (!$warehouse->is_active) {
            return redirect()->route('warehouses.search')
                ->with('error', 'This warehouse is not available for booking.');
        }

        $warehouse->load('vendor', 'availability');

        // Calculate price for preview if dates are given
        $previewPrice = null;
        $previewDuration = null;

        if ($request->filled(['start_date', 'end_date'])) {
            $startDate = new \DateTime($request->start_date);
            $endDate = new \DateTime($request->end_date);

            // Calculate total duration based on pricing model
            switch ($warehouse->pricing_model) {
                case 'hourly':
                    $duration = ceil($endDate->diff($startDate)->h + ($endDate->diff($startDate)->days * 24));
                    $previewDuration = $duration . ' ' . ($duration == 1 ? 'hour' : 'hours');
                    break;
                case 'daily':
                    $duration = ceil($endDate->diff($startDate)->days);
                    $previewDuration = $duration . ' ' . ($duration == 1 ? 'day' : 'days');
                    break;
                case 'monthly':
                    $duration = ceil($endDate->diff($startDate)->days / 30);
                    $previewDuration = $duration . ' ' . ($duration == 1 ? 'month' : 'months');
                    break;
            }

            $previewPrice = $duration * $warehouse->price;
        }

        return Inertia::render('Warehouses/Show', [
            'warehouse' => $warehouse,
            'previewPrice' => $previewPrice,
            'previewDuration' => $previewDuration,
            'dates' => $request->only(['start_date', 'end_date']),
        ]);
    }

    /**
     * Submit a booking request for a warehouse.
     *
     * @param  \App\Models\Warehouse  $warehouse
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function book(Warehouse $warehouse, Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'purpose' => 'required|string|max:500',
            'special_requirements' => 'nullable|string|max:1000',
            'duration_unit' => 'required|in:hour,day,month',
            'quantity' => 'nullable|numeric|min:1',
        ]);

        // Check availability again (to prevent race conditions)
        $startDate = new \DateTime($validated['start_date']);
        $endDate = new \DateTime($validated['end_date']);

        $isAvailable = !$warehouse->availability()
            ->where('status', '!=', 'available')
            ->where(function ($q) use ($validated) {
                $q->whereBetween('start_date', [$validated['start_date'], $validated['end_date']])
                    ->orWhereBetween('end_date', [$validated['start_date'], $validated['end_date']])
                    ->orWhere(function ($q2) use ($validated) {
                        $q2->where('start_date', '<=', $validated['start_date'])
                            ->where('end_date', '>=', $validated['end_date']);
                    });
            })
            ->exists();

        if (!$isAvailable) {
            return back()->withErrors(['availability' => 'The warehouse is no longer available for the selected dates.']);
        }

        // Calculate total price based on duration unit
        $duration = 0;

        switch ($validated['duration_unit']) {
            case 'hour':
                $duration = ceil($endDate->diff($startDate)->h + ($endDate->diff($startDate)->days * 24));
                break;
            case 'day':
                $duration = ceil($endDate->diff($startDate)->days);
                break;
            case 'month':
                $duration = ceil($endDate->diff($startDate)->days / 30);
                break;
        }

        $totalPrice = $duration * $warehouse->price;
        $quantity = $validated['quantity'] ?? 1;
        $finalPrice = $totalPrice * $quantity;

        // Create booking
        $booking = WarehouseBooking::create([
            'warehouse_id' => $warehouse->id,
            'user_id' => Auth::id(),
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'purpose' => $validated['purpose'],
            'special_requirements' => $validated['special_requirements'],
            'duration_unit' => $validated['duration_unit'],
            'duration_value' => $duration,
            'quantity' => $quantity,
            'total_price' => $finalPrice,
            'status' => 'pending',
        ]);

        return redirect()->route('warehouse.bookings')
            ->with('success', 'Your booking request has been submitted successfully. Booking reference: #' . $booking->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
