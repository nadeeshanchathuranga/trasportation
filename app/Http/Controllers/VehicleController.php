<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\LandVehicle;
use App\Models\AirVehicle;
use App\Models\SeaVehicle;
use App\Models\VehicleImage;

use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index()
    {
        $vendor = auth()->user(); // assuming the user is a vendor

        $vehicles = Vehicle::where('vendor_id', $vendor->id)->get();

        $landVehicles = LandVehicle::whereIn('vehicle_id', $vehicles->pluck('id'))->with('vehicle')->get();
        $airVehicles = AirVehicle::whereIn('vehicle_id', $vehicles->pluck('id'))->with('vehicle')->get();
        $seaVehicles = SeaVehicle::whereIn('vehicle_id', $vehicles->pluck('id'))->with('vehicle')->get();

        return Inertia::render('Vehicle/VehicleIndex', [
            'data' => [
                'vehicles' => $vehicles,
                'landVehicles' => $landVehicles,
                'airVehicles' => $airVehicles,
                'seaVehicles' => $seaVehicles,
            ]
        ]);
    }


    public function create(){
        return Inertia::render('Vehicle/VehicleCreate');
    }

    public function store(Request $request)
{

  
    $vendor = auth()->user();

    $validatedData = $request->validate([
        'model' => 'nullable|string',
        'manufracture' => 'nullable|string',
        'manufracture_year' => 'nullable|digits:4|integer',
        'register_year' => 'nullable|digits:4|integer',
        'vehicle_no' => 'nullable|string|unique:vehicles,vehicle_no',
        'category' => 'in:air,land,sea',
        'color' => 'nullable|string',
        'condition' => 'nullable|string',
        'ownership_type' => 'nullable|string',
        'passenger_capacity' => 'nullable|integer',
        'currect_milage' => 'nullable|integer',
        'description' => 'nullable|string',
        'insuarance_provider_name' => 'nullable|string',
        'insuarance_document' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx,xls,xlsx,csv,webp',

        // Optional fields
        'body_type' => 'nullable|string',
        'fuel_type' => 'nullable|string',
        'transmission_type' => 'nullable|string',
        'pickup_location' => 'nullable|string',
        'drop_off_policy' => 'nullable|string',
        'flight_fly_range_km' => 'nullable|string',
        'airport_name' => 'nullable|string',
        'port_of_operation' => 'nullable|string',

        // ✅ For multiple images
        'images.*' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    $validatedData['user_id'] = $vendor->user_id;
    $validatedData['vendor_id'] = $vendor->id;

    // Handle insurance document upload
    if ($request->hasFile('insuarance_document')) {
        $path = $request->file('insuarance_document')->store('insurance_documents', 'public');
        $validatedData['insuarance_document'] = $path;
    }

    // Save vehicle
    $vehicle = Vehicle::create([
        'vendor_id' => $validatedData['vendor_id'],
        'model' => $validatedData['model'],
        'manufracture' => $validatedData['manufracture'],
        'manufracture_year' => $validatedData['manufracture_year'],
        'register_year' => $validatedData['register_year'],
        'vehicle_no' => $validatedData['vehicle_no'],
        'category' => $validatedData['category'],
        'color' => $validatedData['color'],
        'condition' => $validatedData['condition'],
        'ownership_type' => $validatedData['ownership_type'],
        'passenger_capacity' => $validatedData['passenger_capacity'] ?? null,
        'currect_milage' => $validatedData['currect_milage'] ?? null,
        'description' => $validatedData['description'] ?? null,
        'insuarance_provider_name' => $validatedData['insuarance_provider_name'] ?? null,
        'insuarance_document' => $validatedData['insuarance_document'] ?? null,
    ]);

    // Save category-specific details
    if ($vehicle->category === 'land') {
        LandVehicle::create([
            'vehicle_id' => $vehicle->id,
            'body_type' => $validatedData['body_type'] ?? null,
            'fuel_type' => $validatedData['fuel_type'] ?? null,
            'transmission_type' => $validatedData['transmission_type'] ?? null,
            'pickup_location' => $validatedData['pickup_location'] ?? null,
            'drop_off_policy' => $validatedData['drop_off_policy'] ?? null,
        ]);
    } elseif ($vehicle->category === 'air') {
        AirVehicle::create([
            'vehicle_id' => $vehicle->id,
            'flight_fly_range_km' => $validatedData['flight_fly_range_km'] ?? null,
            'airport_name' => $validatedData['airport_name'] ?? null,
        ]);
    } elseif ($vehicle->category === 'sea') {
        SeaVehicle::create([
            'vehicle_id' => $vehicle->id,
            'port_of_operation' => $validatedData['port_of_operation'] ?? null,
        ]);
    }

    // ✅ Save uploaded images to vehicle_images table
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('vehicle_images', 'public');

            VehicleImage::create([
                'vehicle_id' => $vehicle->id,
                'image_path' => $imagePath,
            ]);
        }
    }

    return response()->json(['message' => 'Vehicle registered successfully.'], 200);
}
}

