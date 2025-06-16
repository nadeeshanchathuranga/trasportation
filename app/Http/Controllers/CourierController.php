<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use App\Models\CourierReceiver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CourierController extends Controller
{
    /**
     * Display a listing of the couriers.
     */
    public function index()
    {
        // Check if user is admin (adjust this according to your app's role management)
        $isAdmin = Auth::user()->role_type === 'admin';

        $couriers = $isAdmin
            ? Courier::with('receivers')->latest()->get()
            : Courier::with('receivers')->where('user_id', Auth::id())->latest()->get();

        return Inertia::render('Courier/Index', [
            'couriers' => $couriers
        ]);
    }

    /**
     * Show the form for creating a new courier pickup.
     */
    public function create()

    {
        // return Inertia::render('Courier/Create');

        return Inertia::render('Web/home/PackageDelivery');
    }

    /**
     * Store a newly created courier pickup in storage.
     */
    public function store(Request $request)
    {
        Log::info('Courier form submission received', ['data' => $request->all()]);

        $validated = $request->validate([
            'sender_name' => 'required|string|max:255',
            'sender_address' => 'required|string',
            'sender_telephone' => 'required|string|max:20',
            'parcel_type' => 'required|string|max:100',
            'custom_parcel_type' => 'required_if:parcel_type,other|nullable|string|max:255',
            'parcel_count' => 'required|integer|min:1',
            'parcel_weight' => 'required|numeric|min:0.01',
            'payment_method' => 'required|string|max:50',
            'locations' => 'required|integer|min:1',
            'receivers' => 'required|array|min:1',
            'receivers.*.receiver_name' => 'required|string|max:255',
            'receivers.*.receiver_address' => 'required|string',
            'receivers.*.receiver_telephone' => 'required|string|max:20',
        ]);

        Log::info('Validation passed');

        try {
            DB::beginTransaction();

            $courier = Courier::create([
                'user_id' => Auth::id(),
                'sender_name' => $request->sender_name,
                'sender_address' => $request->sender_address,
                'sender_telephone' => $request->sender_telephone,
                'parcel_type' => $request->parcel_type,
                'custom_parcel_type' => $request->parcel_type === 'other' ? $request->custom_parcel_type : null,
                'parcel_count' => $request->parcel_count,
                'parcel_weight' => $request->parcel_weight,
                'payment_method' => $request->payment_method,
                'tracking_number' => Courier::generateTrackingNumber(),
                'status' => 'pending'
            ]);

            Log::info('Courier created', ['courier_id' => $courier->id]);

            foreach ($request->receivers as $index => $receiver) {
                $receiverRecord = CourierReceiver::create([
                    'courier_id' => $courier->id,
                    'receiver_name' => $receiver['receiver_name'],
                    'receiver_address' => $receiver['receiver_address'],
                    'receiver_telephone' => $receiver['receiver_telephone'],
                    'location_order' => $index + 1
                ]);

                Log::info('Receiver added', [
                    'receiver_id' => $receiverRecord->id,
                    'courier_id' => $courier->id,
                    'order' => $index + 1
                ]);
            }

            DB::commit();
            Log::info('Transaction committed successfully');

            return redirect()->route('couriers.show', $courier)
                ->with('success', 'Courier pickup booked successfully! Your tracking number is: ' . $courier->tracking_number);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create courier pickup', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors(['error' => 'Failed to book courier pickup: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified courier.
     */
    public function show(Courier $courier)
    {
        \Illuminate\Support\Facades\Gate::authorize('view', $courier);

        $courier->load('receivers');

        return Inertia::render('Courier/Show', [
            'courier' => $courier
        ]);
    }

    /**
     * Admin view to list all courier pickups with filtering.
     */
    public function adminIndex(Request $request)
    {
        \Illuminate\Support\Facades\Gate::authorize('viewAny', Courier::class);

        $query = Courier::with('receivers', 'user')->orderBy('created_at', 'desc');

        // Search by tracking number
        if ($request->has('tracking_number') && $request->tracking_number) {
            $query->where('tracking_number', 'LIKE', "%{$request->tracking_number}%");
        }

        // Filter by date range
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('created_at', [
                $request->start_date . ' 00:00:00',
                $request->end_date . ' 23:59:59'
            ]);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $couriers = $query->paginate(15);

        return Inertia::render('Admin/Couriers', [
            'couriers' => $couriers,
            'filters' => $request->only(['tracking_number', 'start_date', 'end_date', 'status'])
        ]);
    }

    /**
     * Track a courier by tracking number.
     */
    public function track(Request $request)
    {
        $request->validate([
            'tracking_number' => 'required|string|exists:couriers,tracking_number'
        ]);

        $courier = Courier::with('receivers')
            ->where('tracking_number', $request->tracking_number)
            ->first();

        return Inertia::render('Web/home/TrackCouriersForm', [
            'courier' => $courier
        ]);
    }

    public function clearFilters()
    {
        \Illuminate\Support\Facades\Gate::authorize('viewAny', Courier::class);

        return redirect()->route('admin.couriers');
    }
}
