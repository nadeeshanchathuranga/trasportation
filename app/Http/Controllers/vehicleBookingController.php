<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Vehicle;
use App\Models\LandVehicle;
use App\Models\AirVehicle;
use App\Models\SeaVehicle;


class vehicleBookingController extends Controller
{
    public function index(){
        return Inertia::render('Web/components/vehicleBooking/bookingCategoryPage');
    }


    public function landBookings(){
        $vehicles = Vehicle::all();
        $landVehicleDetails = LandVehicle::all();

        return Inertia::render('Web/components/vehicleBooking/landIndex', [
            'vehicles' => $vehicles,
            'landVehicleDetails' => $landVehicleDetails
        ]);
    }

    public function airBookings(){
        $vehicles = Vehicle::all();
        $airVehicleDetails = AirVehicle::all();

        return Inertia::render('Web/components/vehicleBooking/airIndex', [
            'vehicles' => $vehicles,
            'airVehicleDetails' => $airVehicleDetails
        ]);
    }

    public function seaBookings(){
        $vehicles = Vehicle::all();
        $seaVehicleDetails = SeaVehicle::all();

        return Inertia::render('Web/components/vehicleBooking/seaIndex', [
            'vehicles' => $vehicles,
            'seaVehicleDetails' => $seaVehicleDetails
        ]);
    }

    public function landBookingDetails($id){
        $vehicle = Vehicle::findOrFail($id);
        $landVehicleDetails = LandVehicle::where('vehicle_id', $id)->first();

        return Inertia::render('Web/components/vehicleBooking/bookingPage', [
            'vehicle' => $vehicle,
            'landVehicleDetails' => $landVehicleDetails
        ]);
    }

    public function airBookingDetails($id){
        $vehicle = Vehicle::findOrFail($id);
        $airVehicleDetails = AirVehicle::where('vehicle_id', $id)->first();

        return Inertia::render('Web/components/vehicleBooking/bookingPage', [
            'vehicle' => $vehicle,
            'airVehicleDetails' => $airVehicleDetails
        ]);
    }

    public function seaBookingDetails($id){
        $vehicle = Vehicle::findOrFail($id);
        $seaVehicleDetails = SeaVehicle::where('vehicle_id', $id)->first();

        return Inertia::render('Web/components/vehicleBooking/bookingPage', [
            'vehicle' => $vehicle,
            'seaVehicleDetails' => $seaVehicleDetails
        ]);
    }

}
