<?php

namespace App\Http\Controllers;

use App\Models\FreightBooking;
use App\Models\FreightCompany;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FreightController extends Controller
{
    public function showRegistrationForm()
    {
        return Inertia::render('Web/Freight/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'business_name' => 'required|string|max:255',
            'business_type' => 'required|string|max:255',
            'registration_number' => 'required|string|max:255|unique:freight_companies',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20',
            'location' => 'required|string|max:255',
            'service_types' => 'required|array',
            'vehicle_types' => 'nullable|array',
            'capacity_range' => 'nullable|string|max:255',
            'business_certificate' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'tax_document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'logo' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create user
        $user = User::create([
            'name' => $request->business_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_type' => 'freight',
        ]);

        // Handle file uploads
        $businessCertificatePath = $request->file('business_certificate')->store('freight/documents', 'public');
        $taxDocumentPath = $request->file('tax_document')->store('freight/documents', 'public');
        $logoPath = $request->hasFile('logo')
            ? $request->file('logo')->store('freight/logos', 'public')
            : null;

        // Create freight company
        $freightCompany = FreightCompany::create([
            'user_id' => $user->id,
            'business_name' => $request->business_name,
            'business_type' => $request->business_type,
            'registration_number' => $request->registration_number,
            'email' => $request->email,
            'phone' => $request->phone,
            'location' => $request->location,
            'service_types' => $request->service_types,
            'vehicle_types' => $request->vehicle_types,
            'capacity_range' => $request->capacity_range,
            'business_certificate' => $businessCertificatePath,
            'tax_document' => $taxDocumentPath,
            'logo' => $logoPath,
            'status' => 'pending',
        ]);

        Auth::login($user);

        return redirect()->route('freight.dashboard');
    }

    public function dashboard()
    {
        $freightCompany = FreightCompany::where('user_id', Auth::id())->firstOrFail();
        $bookings = FreightBooking::with('user')->latest()->get();

        return Inertia::render('Web/Freight/Dashboard', [
            'freightCompany' => $freightCompany,
            'bookings' => $bookings,
        ]);
    }

    // Admin methods for managing freight companies
    public function index()
    {
        $freightCompanies = FreightCompany::with('user')->get();
        return Inertia::render('Admin/FreightCompanies', [
            'freightCompanies' => $freightCompanies
        ]);
    }

    public function approve($id)
    {
        $freightCompany = FreightCompany::findOrFail($id);
        $freightCompany->update(['status' => 'approved']);
        
        return redirect()->back()->with('success', 'Freight company has been approved.');
    }

    public function reject($id)
    {
        $freightCompany = FreightCompany::findOrFail($id);
        $freightCompany->update(['status' => 'rejected']);
        
        return redirect()->back()->with('success', 'Freight company has been rejected.');
    }
} 