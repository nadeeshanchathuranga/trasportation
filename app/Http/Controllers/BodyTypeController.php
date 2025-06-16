<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BodyType;
use Illuminate\Support\Facades\Storage;

class BodyTypeController extends Controller
{

    // public function create()
    // {
    //     $brands = VehicleBrand::latest()->get();
    //     return Inertia::render('VehicleBrands/AddVehicleBrand', [
    //         'brands' => $brands,
    //     ]);
    // }


    

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bodyType' => 'required|string|max:255',
            'bodyTypeImage' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
        ]);

        // Handle file upload
        if ($request->hasFile('bodyTypeImage')) {
            $imagePath = $request->file('bodyTypeImage')->store('body_types', 'public');
            $validated['bodyTypeImage'] = $imagePath;
        }

        $bodyType = BodyType::create($validated);


        return redirect()->back()->with('success', 'Vehicle Body Type added successfully.');

    }

    public function destroy($id)
    {
        $bodyType = BodyType::findOrFail($id);

        // Delete the image file if it exists
        if ($bodyType->bodyTypeImage && Storage::disk('public')->exists($bodyType->bodyTypeImage)) {
            Storage::disk('public')->delete($bodyType->bodyTypeImage);
        }

        $bodyType->delete();

        return redirect()->back()->with('success', 'Vehicle Body Type deleted successfully.');
    }
}
