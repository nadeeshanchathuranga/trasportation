<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use App\Models\WarehouseAvailability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class WarehouseController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        $this->middleware(['auth', 'role:vendor']);
    }

    public function index()
    {
        $user = Auth::user();

        if (!$user->vendor) {
            return redirect()->route('vendor.index')
                ->with('error', 'Please complete your vendor profile first.');
        }

        $warehouses = $user->vendor->warehouses()
            ->with('availability')
            ->latest()
            ->get();

        return Inertia::render('Vendor/Warehouses/Index', [
            'warehouses' => $warehouses
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        if (!$user->vendor) {
            return redirect()->route('vendor.index')
                ->with('error', 'Please complete your vendor profile first.');
        }

        return Inertia::render('Vendor/Warehouses/Create');
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user->vendor) {
            return redirect()->route('vendor.index')
                ->with('error', 'Please complete your vendor profile first.');
        }

        // Log the incoming request data for debugging
        Log::info('Warehouse creation request:', $request->all());

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'address' => 'required|string',
                'latitude' => 'required|numeric|between:-90,90',
                'longitude' => 'required|numeric|between:-180,180',
                'total_area' => 'required|numeric|min:0',
                'capacity' => 'required|integer|min:0',
                'type' => 'required|in:cold_storage,dry,bonded,open_yard',
                'amenities' => 'required|string', // JSON string
                'images.*' => 'required|image|max:2048',
                'documents.*' => 'required|mimes:pdf,doc,docx|max:2048',
                'pricing_model' => 'required|in:hourly,daily,monthly',
                'price' => 'required|numeric|min:0',
                'terms_conditions' => 'required|string'
            ]);

            // Decode JSON amenities
            $validated['amenities'] = json_decode($validated['amenities'], true);

            // Handle file uploads
            $imagePaths = [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('warehouse-images', 'public');
                    if (!$path) {
                        throw new \Exception('Failed to store image file.');
                    }
                    $imagePaths[] = $path;
                }
            }

            $documentPaths = [];
            if ($request->hasFile('documents')) {
                foreach ($request->file('documents') as $document) {
                    $path = $document->store('warehouse-documents', 'public');
                    if (!$path) {
                        throw new \Exception('Failed to store document file.');
                    }
                    $documentPaths[] = $path;
                }
            }

            $warehouse = $user->vendor->warehouses()->create([
                ...$validated,
                'images' => $imagePaths,
                'documents' => $documentPaths
            ]);

            Log::info('Warehouse created successfully:', ['id' => $warehouse->id]);

            return redirect()->route('vendor.warehouses.index')
                ->with('success', 'Warehouse created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating warehouse:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['error' => 'Failed to create warehouse. ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function edit(Warehouse $warehouse)
    {
        $this->authorize('update', $warehouse);

        return Inertia::render('Vendor/Warehouses/Edit', [
            'warehouse' => $warehouse->load('availability')
        ]);
    }

    public function update(Request $request, Warehouse $warehouse)
    {
        $this->authorize('update', $warehouse);

        // Log the incoming request data for debugging
        Log::info('Warehouse update request:', $request->all());

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'address' => 'required|string',
                'latitude' => 'required|numeric|between:-90,90',
                'longitude' => 'required|numeric|between:-180,180',
                'total_area' => 'required|numeric|min:0',
                'capacity' => 'required|integer|min:0',
                'type' => 'required|in:cold_storage,dry,bonded,open_yard',
                'amenities' => 'required|array',
                'images.*' => 'sometimes|image|max:2048',
                'documents.*' => 'sometimes|mimes:pdf,doc,docx|max:2048',
                'pricing_model' => 'required|in:hourly,daily,monthly',
                'price' => 'required|numeric|min:0',
                'terms_conditions' => 'required|string'
            ]);

            // Handle new file uploads
            if ($request->hasFile('images')) {
                // Delete old images
                foreach ($warehouse->images as $oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }

                $imagePaths = [];
                foreach ($request->file('images') as $image) {
                    $imagePaths[] = $image->store('warehouse-images', 'public');
                }
                $validated['images'] = $imagePaths;
            }

            if ($request->hasFile('documents')) {
                // Delete old documents
                foreach ($warehouse->documents as $oldDocument) {
                    Storage::disk('public')->delete($oldDocument);
                }

                $documentPaths = [];
                foreach ($request->file('documents') as $document) {
                    $documentPaths[] = $document->store('warehouse-documents', 'public');
                }
                $validated['documents'] = $documentPaths;
            }

            $warehouse->update($validated);

            Log::info('Warehouse updated successfully:', ['id' => $warehouse->id]);

            return redirect()->route('vendor.warehouses.index')
                ->with('success', 'Warehouse updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating warehouse:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['error' => 'Failed to update warehouse. ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function toggleStatus(Warehouse $warehouse)
    {
        $this->authorize('update', $warehouse);

        try {
            $warehouse->update([
                'is_active' => !$warehouse->is_active
            ]);

            $statusText = $warehouse->is_active ? 'activated' : 'deactivated';

            Log::info("Warehouse status toggled:", [
                'id' => $warehouse->id,
                'is_active' => $warehouse->is_active
            ]);

            return redirect()->route('vendor.warehouses.index')
                ->with('success', "Warehouse {$statusText} successfully.");
        } catch (\Exception $e) {
            Log::error('Error toggling warehouse status:', [
                'error' => $e->getMessage(),
                'warehouse_id' => $warehouse->id
            ]);

            return back()->withErrors(['error' => 'Failed to update warehouse status.']);
        }
    }

    public function destroy(Warehouse $warehouse)
    {
        $this->authorize('delete', $warehouse);

        // Delete associated files
        foreach ($warehouse->images as $image) {
            Storage::disk('public')->delete($image);
        }
        foreach ($warehouse->documents as $document) {
            Storage::disk('public')->delete($document);
        }

        $warehouse->delete();

        return redirect()->route('vendor.warehouses.index')
            ->with('success', 'Warehouse deleted successfully.');
    }

    public function updateAvailability(Request $request, Warehouse $warehouse)
    {
        $this->authorize('update', $warehouse);

        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:available,blocked,maintenance',
            'notes' => 'nullable|string'
        ]);

        // Check for overlapping dates
        $overlapping = $warehouse->availability()
            ->where(function ($query) use ($validated) {
                $query->whereBetween('start_date', [$validated['start_date'], $validated['end_date']])
                    ->orWhereBetween('end_date', [$validated['start_date'], $validated['end_date']]);
            })
            ->exists();

        if ($overlapping) {
            return back()->withErrors(['dates' => 'The selected dates overlap with existing availability records.']);
        }

        $warehouse->availability()->create($validated);

        return back()->with('success', 'Availability updated successfully.');
    }

    public function deleteAvailability(Warehouse $warehouse, WarehouseAvailability $availability)
    {
        $this->authorize('update', $warehouse);

        if ($availability->warehouse_id !== $warehouse->id) {
            abort(404);
        }

        $availability->delete();

        return back()->with('success', 'Availability record deleted successfully.');
    }

    public function search(Request $request)
    {
        // Get all active warehouses with vendor information
        $query = Warehouse::with(['vendor', 'availability'])
            ->where('is_active', true);

        // Filter by location (using distance calculation if lat/long provided)
        if ($request->filled(['latitude', 'longitude', 'distance'])) {
            $lat = $request->latitude;
            $lng = $request->longitude;
            $distance = $request->distance; // in kilometers

            // Haversine formula for calculating distance between two points
            $query->selectRaw("*, 
            (6371 * acos(
                cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + 
                sin(radians(?)) * sin(radians(latitude))
            )) AS distance", [$lat, $lng, $lat])
                ->having('distance', '<=', $distance)
                ->orderBy('distance');
        }

        // Filter by address text search
        if ($request->filled('location')) {
            $query->where('address', 'like', '%' . $request->location . '%');
        }

        // Filter by area size range
        if ($request->filled('min_area')) {
            $query->where('total_area', '>=', $request->min_area);
        }

        if ($request->filled('max_area')) {
            $query->where('total_area', '<=', $request->max_area);
        }

        // Filter by capacity
        if ($request->filled('min_capacity')) {
            $query->where('capacity', '>=', $request->min_capacity);
        }

        // Filter by price range
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by warehouse type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by amenities (JSON column)
        if ($request->filled('amenities') && is_array($request->amenities)) {
            foreach ($request->amenities as $amenity) {
                $query->whereJsonContains('amenities', $amenity);
            }
        }

        // Filter by availability dates
        if ($request->filled(['start_date', 'end_date'])) {
            $startDate = $request->start_date;
            $endDate = $request->end_date;

            // Get warehouses that don't have overlapping blocked dates in the availability table
            $query->whereDoesntHave('availability', function ($q) use ($startDate, $endDate) {
                $q->where('status', '!=', 'available')
                    ->where(function ($q2) use ($startDate, $endDate) {
                        $q2->whereBetween('start_date', [$startDate, $endDate])
                            ->orWhereBetween('end_date', [$startDate, $endDate])
                            ->orWhere(function ($q3) use ($startDate, $endDate) {
                                $q3->where('start_date', '<=', $startDate)
                                    ->where('end_date', '>=', $endDate);
                            });
                    });
            });
        }

        // Sort results
        $sortField = $request->sort_by ?? 'price';
        $sortOrder = $request->sort_order ?? 'asc';
        $query->orderBy($sortField, $sortOrder);

        // Paginate results
        $warehouses = $query->paginate(12)->withQueryString();

        return Inertia::render('Warehouses/Search', [
            'warehouses' => $warehouses,
            'filters' => $request->only([
                'location',
                'latitude',
                'longitude',
                'distance',
                'min_area',
                'max_area',
                'min_capacity',
                'min_price',
                'max_price',
                'type',
                'amenities',
                'start_date',
                'end_date',
                'sort_by',
                'sort_order'
            ])
        ]);
    }
}
