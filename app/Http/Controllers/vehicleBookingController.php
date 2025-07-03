<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Vehicle;
use App\Models\LandVehicle;
use App\Models\AirVehicle;
use App\Models\SeaVehicle;
use App\Models\VehicleImage;


class vehicleBookingController extends Controller
{
    public function index(){
        return Inertia::render('Web/components/vehicleBooking/bookingCategoryPage');
    }



    public function landBookings() {
        // Get vehicles with proper image path handling
        $vehicles = Vehicle::with('brand')->get()->map(function ($vehicle) {
            return [
                'id' => $vehicle->id,
                'model' => $vehicle->model,
                'brand' => $vehicle->brand,
                'vehicle_no' => $vehicle->vehicle_no,
                'manufracture_year' => $vehicle->manufracture_year,
                'passenger_capacity' => $vehicle->passenger_capacity,
                'currect_milage' => $vehicle->currect_milage,
                'color' => $vehicle->color,
                'condition' => $vehicle->condition,
                'ownership_type' => $vehicle->ownership_type,
                'insuarance_provider_name' => $vehicle->insuarance_provider_name,
                'description' => $vehicle->description,
                // Fix: Handle cover image properly
                'image_path' => $vehicle->image_path ? asset('storage/' . $vehicle->image_path) : null,
            ];
        });

        $landVehicleDetails = LandVehicle::all()->map(function ($land) {
            return [
                'id' => $land->id,
                'vehicle_id' => $land->vehicle_id,
                'engine_type' => $land->fuel_type, // Map fuel_type to engine_type for display
                'transmission' => $land->transmission_type,
                'body_type' => $land->body_type,
                'pickup_location' => $land->pickup_location,
                'drop_off_policy' => $land->drop_off_policy,
            ];
        });

        // Fix: Use correct field name from VehicleImage model
        $vehicleImages = VehicleImage::all()->map(function ($vehicleImage) {
            return [
                'id' => $vehicleImage->id,
                'vehicle_id' => $vehicleImage->vehicle_id,
                // Fix: Use image_path instead of image
                'image' => $vehicleImage->image_path ? asset('storage/' . $vehicleImage->image_path) : null,
            ];
        });

        return Inertia::render('Web/components/vehicleBooking/landIndex', [
            'vehicles' => $vehicles,
            'landVehicleDetails' => $landVehicleDetails,
            'vehicleImages' => $vehicleImages,
        ]);
    }



    public function airBookings() {
        $vehicles = Vehicle::with('brand')->get()->map(function ($vehicle) {
            return [
                'id' => $vehicle->id,
                'model' => $vehicle->model,
                'brand' => $vehicle->brand,
                'vehicle_no' => $vehicle->vehicle_no,
                'manufracture_year' => $vehicle->manufracture_year,
                'passenger_capacity' => $vehicle->passenger_capacity,
                'currect_milage' => $vehicle->currect_milage,
                'color' => $vehicle->color,
                'condition' => $vehicle->condition,
                'ownership_type' => $vehicle->ownership_type,
                'insuarance_provider_name' => $vehicle->insuarance_provider_name,
                'description' => $vehicle->description,
                'image_path' => $vehicle->image_path ? asset('storage/' . $vehicle->image_path) : null,
            ];
        });

        $airVehicleDetails = AirVehicle::all()->map(function ($air) {
            return [
                'id' => $air->id,
                'vehicle_id' => $air->vehicle_id,
                'flight_range' => $air->flight_range,
                'aircraft_type' => $air->aircraft_type,
                'altitude_limit' => $air->altitude_limit,
                'crew_required' => $air->crew_required,
            ];
        });

        $vehicleImages = VehicleImage::all()->map(function ($vehicleImage) {
            return [
                'id' => $vehicleImage->id,
                'vehicle_id' => $vehicleImage->vehicle_id,
                'image' => $vehicleImage->image_path ? asset('storage/' . $vehicleImage->image_path) : null,
            ];
        });

        return Inertia::render('Web/components/vehicleBooking/airIndex', [
            'vehicles' => $vehicles,
            'airVehicleDetails' => $airVehicleDetails,
            'vehicleImages' => $vehicleImages,
        ]);
    }


    public function seaBookings() {
        $vehicles = Vehicle::with('brand')->get()->map(function ($vehicle) {
            return [
                'id' => $vehicle->id,
                'model' => $vehicle->model,
                'brand' => $vehicle->brand,
                'vehicle_no' => $vehicle->vehicle_no,
                'manufracture_year' => $vehicle->manufracture_year,
                'passenger_capacity' => $vehicle->passenger_capacity,
                'currect_milage' => $vehicle->currect_milage,
                'color' => $vehicle->color,
                'condition' => $vehicle->condition,
                'ownership_type' => $vehicle->ownership_type,
                'insuarance_provider_name' => $vehicle->insuarance_provider_name,
                'description' => $vehicle->description,
                'image_path' => $vehicle->image_path ? asset('storage/' . $vehicle->image_path) : null,
            ];
        });

        $seaVehicleDetails = SeaVehicle::all()->map(function ($sea) {
            return [
                'id' => $sea->id,
                'vehicle_id' => $sea->vehicle_id,
                'port_of_operation' => $sea->port_of_operation,
                'vessel_type' => $sea->vessel_type,
                'capacity' => $sea->capacity,
                'crew_required' => $sea->crew_required,
            ];
        });

        $vehicleImages = VehicleImage::all()->map(function ($vehicleImage) {
            return [
                'id' => $vehicleImage->id,
                'vehicle_id' => $vehicleImage->vehicle_id,
                'image' => $vehicleImage->image_path ? asset('storage/' . $vehicleImage->image_path) : null,
            ];
        });

        return Inertia::render('Web/components/vehicleBooking/seaIndex', [
            'vehicles' => $vehicles,
            'seaVehicleDetails' => $seaVehicleDetails,
            'vehicleImages' => $vehicleImages,
        ]);
    }


    public function landBookingDetails($id){
        $vehicle = Vehicle::findOrFail($id);
        $landVehicleDetails = LandVehicle::where('vehicle_id', $id)->first();

        $vehicleImages = VehicleImage::all()->map(function ($vehicleImage) {
            return [
                'id' => $vehicleImage->id,
                'vehicle_id' => $vehicleImage->vehicle_id,
                'image' => $vehicleImage->image_path ? asset('storage/' . $vehicleImage->image_path) : null,
            ];
        });

        return Inertia::render('Web/components/vehicleBooking/bookingPage', [
            'vehicle' => $vehicle,
            'vehicleImages' => $vehicleImages,
            'landVehicleDetails' => $landVehicleDetails
        ]);
    }

    public function airBookingDetails($id){
        $vehicle = Vehicle::findOrFail($id);
        $airVehicleDetails = AirVehicle::where('vehicle_id', $id)->first();

        $vehicleImages = VehicleImage::all()->map(function ($vehicleImage) {
            return [
                'id' => $vehicleImage->id,
                'vehicle_id' => $vehicleImage->vehicle_id,
                'image' => $vehicleImage->image_path ? asset('storage/' . $vehicleImage->image_path) : null,
            ];
        });

        return Inertia::render('Web/components/vehicleBooking/bookingPage', [
            'vehicle' => $vehicle,
            'vehicleImages' => $vehicleImages,
            'airVehicleDetails' => $airVehicleDetails
        ]);
    }

    public function seaBookingDetails($id){
        $vehicle = Vehicle::findOrFail($id);
        $seaVehicleDetails = SeaVehicle::where('vehicle_id', $id)->first();

        $vehicleImages = VehicleImage::all()->map(function ($vehicleImage) {
            return [
                'id' => $vehicleImage->id,
                'vehicle_id' => $vehicleImage->vehicle_id,
                'image' => $vehicleImage->image_path ? asset('storage/' . $vehicleImage->image_path) : null,
            ];
        });

        return Inertia::render('Web/components/vehicleBooking/bookingPage', [
            'vehicle' => $vehicle,
            'vehicleImages' => $vehicleImages,
            'seaVehicleDetails' => $seaVehicleDetails
        ]);
    }

}
