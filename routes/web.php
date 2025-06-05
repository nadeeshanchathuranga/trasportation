<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\WebController;

// -------------------------------
// 🌐 Public Routes
// -------------------------------
Route::get('/', [WebController::class, 'index'])->name('home');

Route::get('/unauthorized', function () {
    return Inertia::render('Unauthorized', [
        'error' => session('error'),
    ]);
})->name('unauthorized');

// -------------------------------
// 📊 Dashboard (all logged-in users)
// -------------------------------
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// -------------------------------
// 👤 Profile (authenticated users)
// -------------------------------
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
 

Route::post('/customer/store',[CustomerController::class,'store'])->name('customer.store');
Route::get('/customerform',[CustomerController::class,'create'])->name('customer.create');
// -------------------------------
// 🚚 Vendor Routes
// -------------------------------
Route::middleware(['auth', 'role:vendor'])->prefix('vendor')->group(function () {
    Route::get('/', [VendorController::class, 'index'])->name('vendor.index');
    Route::post('/store', [VendorController::class, 'store'])->name('vendor.store');
    Route::get('/vendor-dashboard/{vendorId}', [VendorController::class, 'vendorDashboard'])->name('vendor.dashboard');
    //Route::get('/dashboard', [VendorController::class, 'vendorDashboard'])->name('vendor.dashboard');
    Route::get('/booking-management', [VendorController::class, 'bookingManagement'])->name('vendor.booking');
    Route::get('/earning-management', [VendorController::class, 'earningManagement'])->name('vendor.earning');
    Route::get('/promotion-management', [VendorController::class, 'promotionManagement'])->name('vendor.promotion');
    Route::get('/report-management', [VendorController::class, 'reportManagement'])->name('vendor.report');
    Route::get('/review-management', [VendorController::class, 'reviewsManagement'])->name('vendor.review');
    Route::get('/document/{vendor}/{type}', [VendorController::class, 'viewDocument'])->name('vendor.document');
    Route::get('/availability/bookings',[VendorController::class,'VendorBookingView'])->name('vendor.bookingview');
    // Route::post('/vendors/{vendorId}/bookings',[VendorController::class,'getVendorCalender'])->name('vendor.calender');
    // Route::get('/vendors/{vendorId}/bookinngs',[CustomerController::class,'getVendorBookings'])->name('vendor.bookings');
    // Route::get('/vendor/{vendorId}/bookings',[VendorController::class,'getVendorBookings'])->name('customer.bookings')
    Route::post('/vendors/{vendorId}/available_dates',[VendorController::class,'storeAvailableDates']);
    Route::get('/vendors/{vendorId}/available_dates',[VendorController::class,'storeAvailableDates']);
    Route::post('/vendors/{vendorId}/accept', [VendorController::class, 'accept'])->name('vendor.accept');
    Route::post('/vendors/{vendorId}/reject', [VendorController::class, 'reject'])->name('vendor.reject');
    Route::get('/vendors/{vendorId}/accept', [VendorController::class, 'accept'])->name('vendor.accept');
    Route::get('/vendors/{vendorId}/reject', [VendorController::class, 'reject'])->name('vendor.reject');


    // Vehicle management
    Route::get('/vehicles', [VehicleController::class, 'index'])->name('vehicles.index');
    Route::get('/vehicles/create', [VehicleController::class, 'create'])->name('vehicles.create');
    Route::post('/vehicles/store', [VehicleController::class, 'store'])->name('vehicles.store');
});

// -------------------------------
// 🧍 Driver Routes
// -------------------------------
Route::middleware(['auth', 'role:driver'])->prefix('driver')->group(function () {
    Route::get('/dashboard', [DriverController::class, 'index'])->name('driver.view');
    Route::post('/store', [DriverController::class, 'store'])->name('driver.store');
    Route::get('/rejected', [DriverController::class, 'driverReject'])->name('driver.rejected');
    Route::get('/service', [DriverController::class, 'servicePackage'])->name('driver.service_package');
    Route::get('/service-package', [DriverController::class, 'servicePackageForm'])->name('driver.service_package_form');
    Route::post('/service-package', [DriverController::class, 'servicePackageStore'])->name('driver.service_package.store');
    Route::get('/service-package-view', [DriverController::class, 'servicePackageView'])->name('driver.service_package.view');
    Route::put('/service-package/{id}/update', [DriverController::class, 'servicePackageUpdate'])->name('service_package.update');
    Route::delete('/service-package/{id}', [DriverController::class, 'deleteServicePackage'])->name('driver.service_package.delete');

    // Booking management
    Route::get('/date-range-booking', [DriverController::class, 'dateRangeBooking'])->name('driver.date_range_booking.view');
    Route::post('/date-range-booking-store', [DriverController::class, 'dateRangeBookingStore'])->name('driver.booking.store');
    Route::get('/driver-booking-view', [DriverController::class, 'driverBookingView'])->name('driver.booking.view');
    Route::delete('/booking/{id}', [DriverController::class, 'deleteBooking'])->name('driver.booking.delete');
    Route::put('/booking/accept/{id}', [DriverController::class, 'acceptBooking'])->name('driver.booking.accept');
    Route::put('/booking/update/{id}', [DriverController::class, 'updateBooking'])->name('driver.booking.update');
    Route::put('/bookings/complete/{id}', [DriverController::class, 'markAsCompleted'])->name('driver.booking.complete');
    Route::post('/bookings/chat', [DriverController::class, 'driverChat'])->name('driver.booking.chat');

    Route::get('/payout', [DriverController::class, 'driverPayOut'])->name('driver.payout');
});

// -------------------------------
// 🛠️ Admin + SuperAdmin Routes
// -------------------------------
Route::middleware(['auth', 'role:admin,superadmin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.view');
    Route::get('/admin/vendor-list', [AdminController::class, 'vendorList'])->name('vendor.list');
    Route::post('/vendors/{id}/approve', [AdminController::class, 'vendorApprove']);
    Route::post('/vendors/{id}/reject', [AdminController::class, 'vendorReject']);
    Route::delete('/vendor-delete/{id}', [AdminController::class, 'destroy']);

    Route::get('/admin/drivers-list', [AdminController::class, 'driverList'])->name('driver.list');
    Route::post('/driver/{id}/reject', [AdminController::class, 'driverReject']);
    Route::post('/driver/{id}/approve', [AdminController::class, 'driverApprove']);
    Route::post('/driver/{id}/suspend', [AdminController::class, 'driverSuspend']);
    Route::post('/driver/{id}/ban', [AdminController::class, 'driverBan']);
    Route::post('/driver/{id}/reactivate', [AdminController::class, 'driverReactivate']);

    Route::get('/admin/packages', [AdminController::class, 'packageList'])->name('admin.packages');
    Route::post('/admin/packages/{id}/approve', [AdminController::class, 'approvePackage'])->name('admin.packages.approve');
    Route::post('/admin/packages/{id}/reject', [AdminController::class, 'rejectPackage'])->name('admin.packages.reject');
    Route::get('/admin/activity-logs', [AdminController::class, 'activityLogs'])->name('admin.activity-logs');
    Route::get('/flight-list', [AdminController::class, 'flightLists'])->name('admin.flight_list');

    // Courier Management
    Route::get('/admin/couriers', [CourierController::class, 'adminIndex'])->name('admin.couriers');
    Route::get('/admin/couriers/clear', [CourierController::class, 'clearFilters'])->name('admin.couriers.clear');

    // Complaints
    Route::get('/complaints', [ComplaintController::class, 'index'])->name('complaints.index');
    Route::get('/complaints/{id}', [ComplaintController::class, 'show'])->name('complaints.show');
    Route::post('/complaints/{id}/status', [ComplaintController::class, 'updateStatus'])->name('complaints.update-status');
    Route::post('/complaints/{id}/resolve', [ComplaintController::class, 'resolve'])->name('complaints.resolve');
    Route::post('/complaints', [ComplaintController::class, 'store'])->name('complaints.store');
});

// -------------------------------
// 🚚 Courier (Public Access)
// -------------------------------
Route::get('/couriers', [CourierController::class, 'index'])->name('couriers.index');
Route::get('/couriers/create', [CourierController::class, 'create'])->name('couriers.create');
Route::post('/couriers', [CourierController::class, 'store'])->name('couriers.store');
Route::get('/couriers/{courier}', [CourierController::class, 'show'])->name('couriers.show');

// Tracking
Route::get('/track', fn () => Inertia::render('Courier/TrackForm'))->name('couriers.track-form');
Route::post('/track', [CourierController::class, 'track'])->name('couriers.track');

// -------------------------------
// 🔐 Auth Routes
// -------------------------------
require __DIR__ . '/auth.php';
