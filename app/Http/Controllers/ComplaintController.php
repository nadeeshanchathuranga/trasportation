<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\DriverComplaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    // Show all complaints for admin
    public function index(Request $request)
    {
        $status = $request->get('status', 'all');
        $query = DriverComplaint::with(['user', 'driver.user'])
            ->orderBy('created_at', 'desc');

        if ($status !== 'all') {
            $query->where('status', $status);
        }

        $complaints = $query->get();

        return Inertia::render('Admin/ComplaintList', [
            'complaints' => $complaints,
            'currentFilter' => $status
        ]);
    }

    // Show complaint details
    public function show($id)
    {
        $complaint = DriverComplaint::with(['user', 'driver.user', 'resolvedBy'])
            ->findOrFail($id);

        return Inertia::render('Admin/ComplaintDetail', [
            'complaint' => $complaint
        ]);
    }

    // Update complaint status
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,investigating,resolved,dismissed'
        ]);

        $complaint = DriverComplaint::findOrFail($id);
        $complaint->status = $request->status;

        if ($request->status === 'resolved' || $request->status === 'dismissed') {
            $complaint->resolved_at = now();
            $complaint->resolved_by = Auth::user()->id;
        }

        $complaint->save();

        return back()->with('success', 'Complaint status updated successfully.');
    }

    // Add resolution notes and resolve complaint
    public function resolve(Request $request, $id)
    {
        $request->validate([
            'resolution_notes' => 'required|string|min:10',
            'status' => 'required|in:resolved,dismissed'
        ]);

        $complaint = DriverComplaint::findOrFail($id);
        $complaint->resolution_notes = $request->resolution_notes;
        $complaint->status = $request->status;
        $complaint->resolved_at = now();
        $complaint->resolved_by = Auth::user()->id;
        $complaint->save();

        // If the complaint was serious and resolved with finding against the driver
        if ($request->status === 'resolved' && $request->has('driver_action')) {
            $driver = Driver::findOrFail($complaint->driver_id);

            switch ($request->driver_action) {
                case 'suspend':
                    $driver->status = 'suspended';
                    break;
                case 'ban':
                    $driver->status = 'banned';
                    break;
            }

            $driver->save();
        }

        return redirect()->route('complaints.index')
            ->with('success', 'Complaint resolved successfully.');
    }

    // For users to submit complaints
    public function store(Request $request)
    {
        $request->validate([
            'driver_id' => 'required|exists:drivers,id',
            'trip_id' => 'nullable|integer',
            'subject' => 'required|string|max:255',
            'description' => 'required|string|min:10'
        ]);

        DriverComplaint::create([
            'user_id' => Auth::user()->id,
            'driver_id' => $request->driver_id,
            'trip_id' => $request->trip_id,
            'subject' => $request->subject,
            'description' => $request->description,
            'status' => 'pending'
        ]);

        return back()->with('success', 'Your complaint has been submitted and will be reviewed by our team.');
    }
}
