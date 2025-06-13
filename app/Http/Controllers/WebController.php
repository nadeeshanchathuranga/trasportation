<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WebController extends Controller
{
     public function index()
    {
        return Inertia::render('Web/home/HomePage');
    }

    public function vehicleList(Request $request)
    {
        $query = \App\Models\Vehicle::with(['images', 'land', 'vendor'])
            ->where('category', 'land');

        // Apply filters if they exist
        if ($request->has('brand')) {
            $query->where('manufracture', 'like', '%' . $request->brand . '%');
        }

        if ($request->has('bodyType')) {
            $query->whereHas('land', function($q) use ($request) {
                $q->where('body_type', $request->bodyType);
            });
        }

        $vehicles = $query->get()->map(function($vehicle) {
            return [
                'id' => $vehicle->id,
                'name' => $vehicle->model,
                'brand' => $vehicle->manufracture,
                'price' => 89, // You might want to add a price field to your vehicles table
                'image' => $vehicle->images->first() ? asset('storage/' . $vehicle->images->first()->image_path) : null,
                'bodyType' => $vehicle->land ? $vehicle->land->body_type : null,
                'vendor' => $vehicle->vendor ? [
                    'id' => $vehicle->vendor->id,
                    'name' => $vehicle->vendor->business_name
                ] : null
            ];
        });

        return Inertia::render('Web/home/vehicleList', [
            'vehicles' => $vehicles,
            'searchParams' => $request->all()
        ]);
    }

    public function courierService()
    {
        return Inertia::render('Web/home/CourierService');
    }
}
