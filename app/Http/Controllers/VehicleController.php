<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\LandVehicle;
use App\Models\AirVehicle;
use App\Models\SeaVehicle;
use App\Models\VehicleImage;
use App\Models\VehicleBrand;
use App\Models\BodyType;

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


    // public function create(){
    //     return Inertia::render('Vehicle/VehicleCreate');
    // }


    public function create()
    {
        $brands = VehicleBrand::select('id', 'name')->orderBy('name')->get();
        $bodyTypes = BodyType::select('id', 'bodyType', 'bodyTypeImage', 'description', 'status')
            ->where('status', 1)
            ->orderBy('bodyType')
            ->get();


        return Inertia::render('Vehicle/VehicleCreate', [
            'brands' => $brands,
            'bodyTypes' => $bodyTypes,
        ]);
    }





public function store(Request $request)
{
    $vendor = auth()->user();

    // Validate inputs
    $validatedData = $request->validate([
        'model' => 'nullable|string',
        'vehicle_brand_id' => 'required|exists:vehicle_brands,id',
        'manufracture' => 'nullable|string',
        'manufracture_year' => 'nullable|digits:4|integer',
        'register_year' => 'nullable|digits:4|integer',
        'vehicle_no' => 'nullable|string|unique:vehicles,vehicle_no',
        'category' => 'required|in:air,land,sea',
        'color' => 'nullable|string',
        'condition' => 'nullable|string',
        'ownership_type' => 'nullable|string',
        'passenger_capacity' => 'nullable|integer',
        'currect_milage' => 'nullable|integer',
        'description' => 'nullable|string',
        'insuarance_provider_name' => 'nullable|string',
        'insuarance_document' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx,xls,xlsx,csv,webp|max:5120',

        // Optional details per category
        'body_type' => 'nullable|string',
        'fuel_type' => 'nullable|string',
        'transmission_type' => 'nullable|string',
        'pickup_location' => 'nullable|string',
        'drop_off_policy' => 'nullable|string',

        'flight_fly_range_km' => 'nullable|string',
        'airport_name' => 'nullable|string',

        'port_of_operation' => 'nullable|string',

        // Multiple vehicle images
        'images.*' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    // Add user/vendor reference
    $validatedData['user_id'] = $vendor->user_id;
    $validatedData['vendor_id'] = $vendor->id;

    // Upload insurance document
    if ($request->hasFile('insuarance_document')) {
        $validatedData['insuarance_document'] = $request->file('insuarance_document')->store('insurance_documents', 'public');
    }

    // Create vehicle record
    $vehicle = Vehicle::create([
        'vendor_id' => $validatedData['vendor_id'],
        'user_id' => $validatedData['user_id'],
        'vehicle_brand_id' => $validatedData['vehicle_brand_id'],
        'model' => $validatedData['model'] ?? null,
        'manufracture' => $validatedData['manufracture'] ?? null,
        'manufracture_year' => $validatedData['manufracture_year'] ?? null,
        'register_year' => $validatedData['register_year'] ?? null,
        'vehicle_no' => $validatedData['vehicle_no'] ?? null,
        'category' => $validatedData['category'],
        'color' => $validatedData['color'] ?? null,
        'condition' => $validatedData['condition'] ?? null,
        'ownership_type' => $validatedData['ownership_type'] ?? null,
        'passenger_capacity' => $validatedData['passenger_capacity'] ?? null,
        'currect_milage' => $validatedData['currect_milage'] ?? null,
        'description' => $validatedData['description'] ?? null,
        'insuarance_provider_name' => $validatedData['insuarance_provider_name'] ?? null,
        'insuarance_document' => $validatedData['insuarance_document'] ?? null,
    ]);

    // Category-specific insert
    switch ($vehicle->category) {
        case 'land':
            LandVehicle::create([
                'vehicle_id' => $vehicle->id,
                'body_type' => $validatedData['body_type'] ?? null,
                'fuel_type' => $validatedData['fuel_type'] ?? null,
                'transmission_type' => $validatedData['transmission_type'] ?? null,
                'pickup_location' => $validatedData['pickup_location'] ?? null,
                'drop_off_policy' => $validatedData['drop_off_policy'] ?? null,
            ]);
            break;

        case 'air':
            AirVehicle::create([
                'vehicle_id' => $vehicle->id,
                'flight_fly_range_km' => $validatedData['flight_fly_range_km'] ?? null,
                'airport_name' => $validatedData['airport_name'] ?? null,
            ]);
            break;

        case 'sea':
            SeaVehicle::create([
                'vehicle_id' => $vehicle->id,
                'port_of_operation' => $validatedData['port_of_operation'] ?? null,
            ]);
            break;
    }

    // Upload multiple images
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

