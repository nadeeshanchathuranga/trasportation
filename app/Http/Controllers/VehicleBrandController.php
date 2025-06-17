<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VehicleBrand;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class VehicleBrandController extends Controller
{
    // public function create()
    // {
    //     return Inertia::render('VehicleBrands/AddVehicleBrand');
    // }

    public function create()
    {
        $brands = VehicleBrand::latest()->get();
        return Inertia::render('VehicleBrands/AddVehicleBrand', [
            'brands' => $brands,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('brand_logos', 'public');
        }

        VehicleBrand::create($validated);

        return redirect()->back()->with('success', 'Vehicle Brand added successfully.');
    }

    public function destroy($id)
    {
        $brand = VehicleBrand::findOrFail($id);

        // Delete the logo file if it exists
        if ($brand->logo && Storage::disk('public')->exists($brand->logo)) {
            Storage::disk('public')->delete($brand->logo);
        }

        $brand->delete();

        return redirect()->back()->with('success', 'Vehicle Brand deleted successfully.');
    }
}
