<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VendorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\WebController;
use App\Http\Controllers\ComplaintController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Web
Route::get('/', [WebController::class, 'index'])->name('home');
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
    Route::get('/promotion-management', [VendorController::class, 'promotionManagement'])->name('vendor.promotion');
    Route::get('/report-management', [VendorController::class, 'reportManagement'])->name('vendor.report');
    Route::get('/review-management', [VendorController::class, 'reviewsManagement'])->name('vendor.review');


    Route::get('/admin', [AdminController::class, 'index'])->name('admin.view');
    Route::get('/admin/vendor-list', [AdminController::class, 'vendorList'])->name('vendor.list');
    Route::post('/vendors/{id}/approve', [AdminController::class, 'approve']);
    Route::delete('/vendor-delete/{id}', [AdminController::class, 'destroy']);

    Route::get('/admin', [AdminController::class, 'index'])->name('admin.view');
    Route::get('/admin/vendor-list', [AdminController::class, 'vendorList'])->name('vendor.list');
    Route::post('/vendors/{id}/reject', [AdminController::class, 'vendorReject']);
    Route::post('/vendors/{id}/approve', [AdminController::class, 'vendorApprove']);

    Route::get('/vendor/document/{vendor}/{type}', [VendorController::class, 'viewDocument'])
        ->name('vendor.document');


    // Route::get('/driver-rejected', [DriverController::class, 'driverReject'])->name('driver.rejected');




    Route::get('/driver', [DriverController::class, 'index'])->name('driver.view');
    Route::post('/driver-store', [DriverController::class, 'store'])->name('driver.store');
    Route::get('/driver-rejected', [DriverController::class, 'driverReject'])->name('driver.rejected');
    Route::get('/driver-service', [DriverController::class, 'servicePackage'])->name('driver.service_pacakge');

    Route::get('/driver-service-pakage', [DriverController::class, 'servicePackageForm'])->name('driver.service_package_form');
    Route::post('/driver/service-package', [DriverController::class, 'servicePackageStore'])->name('driver.service_package.store');
    Route::get('/driver/service-package-view', [DriverController::class, 'servicePackageView'])->name('driver.service_package.view');

    Route::put('/service-package/{id}/update', [DriverController::class, 'servicePackageUpdate'])
        ->name('service_package.update');

    Route::get('/driver/date-range-booking', [DriverController::class, 'dateRangeBooking'])->name('driver.date_range_booking.view');
Route::post('/date-range-booking-store', [DriverController::class, 'dateRangeBookingStore'])
    ->name('driver.booking.store');



    // View
    Route::get('/driver/driver-booking-view', [DriverController::class, 'driverBookingView'])->name('driver.booking.view');
    Route::delete('/driver/service-package/{id}', [DriverController::class, 'deleteServicePackage'])->name('driver.service_package.delete');
    Route::delete('/driver/booking/{id}', [DriverController::class, 'deleteBooking'])->name('driver.booking.delete');

    // Accept
    Route::put('/driver/booking/accept/{id}', [DriverController::class, 'acceptBooking'])->name('driver.booking.accept');

    // (Optional) Edit/Update
    Route::put('/driver/booking/update/{id}', [DriverController::class, 'updateBooking'])->name('driver.booking.update');


    Route::get('/admin/drivers-list', [AdminController::class, 'driverList'])->name('driver.list');
    Route::post('/driver/{id}/reject', [AdminController::class, 'driverReject']);
    Route::post('/driver/{id}/approve', [AdminController::class, 'driverApprove']);
    Route::post('/driver/{id}/suspend', [AdminController::class, 'driverSuspend']);
    Route::post('/driver/{id}/ban', [AdminController::class, 'driverBan']);
    Route::post('/driver/{id}/reactivate', [AdminController::class, 'driverReactivate']);

    Route::get('/complaints', [ComplaintController::class, 'index'])->name('complaints.index');
    Route::get('/complaints/{id}', [ComplaintController::class, 'show'])->name('complaints.show');
    Route::post('/complaints/{id}/status', [ComplaintController::class, 'updateStatus'])->name('complaints.update-status');
    Route::post('/complaints/{id}/resolve', [ComplaintController::class, 'resolve'])->name('complaints.resolve');

    // For users to submit complaints
    Route::middleware('auth')->post('/complaints', [ComplaintController::class, 'store'])->name('complaints.store');

    Route::get('/admin/packages', [AdminController::class, 'packageList'])->name('admin.packages');
    Route::post('/admin/packages/{id}/approve', [AdminController::class, 'approvePackage'])->name('admin.packages.approve');
    Route::post('/admin/packages/{id}/reject', [AdminController::class, 'rejectPackage'])->name('admin.packages.reject');

    Route::get('/admin/activity-logs', [AdminController::class, 'activityLogs'])->name('admin.activity-logs');
});

require __DIR__ . '/auth.php';
