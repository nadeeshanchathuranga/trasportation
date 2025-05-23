<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VendorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/vehicles', [VehicleController::class, 'index'])->name('vehicles.index');
    Route::get('/vehicles/create', [VehicleController::class, 'create'])->name('vehicles.create');
    Route::post('/vehicles/store', [VehicleController::class, 'store'])->name('vehicles.store');


    Route::get('/vendor', [VendorController::class, 'index'])->name('vendor.index');
    Route::post('/vendor-store', [VendorController::class, 'store'])->name('vendor.store');
    Route::get('/vendor-dashboard', [VendorController::class, 'vendorDashboard'])->name('vendor.dashboard');
    Route::get('/booking-management', [VendorController::class, 'bookingManagement'])->name('vendor.booking');
    Route::get('/earning-management', [VendorController::class, 'earningManagement'])->name('vendor.earning');


    Route::get('/admin', [AdminController::class, 'index'])->name('admin.view');
    Route::get('/admin/vendor-list', [AdminController::class, 'vendorList'])->name('vendor.list');
    Route::post('/vendors/{id}/approve', [AdminController::class, 'approve']);
    Route::delete('/vendor-delete/{id}', [AdminController::class, 'destroy']);


});

require __DIR__.'/auth.php';
