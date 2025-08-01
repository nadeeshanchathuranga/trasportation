<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\WebController;
use App\Http\Controllers\VehicleBrandController;
use App\Http\Controllers\BodyTypeController;
use App\Http\Controllers\VehicleBookingController;
use App\Http\Controllers\BookingController;

use App\Http\Controllers\FreightController;
use App\Http\Controllers\WarehouseController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\LogUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// -------------------------------
// 🌐 Public Routes
// -------------------------------

Route::get('/vehicleList', [WebController::class, 'vehicleList'])->name('vehicle.list');
Route::get('/vehicleDetails', [WebController::class, 'vehicleDetails'])->name('vehicle.details');
Route::get('/courier-service', [WebController::class, 'courierService'])->name('courier.service');
Route::get('/book-a-ticket', [WebController::class, 'bookATicket'])->name('book.a.ticket');
Route::get('/booking-home', [WebController::class, 'bookingHome'])->name('booking.home');
Route::get('/cargo-freight', [WebController::class, 'cargoFreight'])->name('cargo.freight');

Route::get('/driver-search-results', [WebController::class, 'driverSearchResults'])->name('driver.search.results');
Route::get('/driver-details', [WebController::class, 'driverDetails'])->name('driver.details');
Route::get('/vehicle-checkout', [WebController::class, 'vehicleCheckout'])->name('vehicle.checkout');
Route::get('/freight-home', [WebController::class, 'freightHomepage'])->name('freight.home');

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

// -------------------------------
// 🚚 Vendor Routes
// -------------------------------
Route::middleware(['auth', 'role:user'])->prefix('user')->group(function () {
    Route::get('/view', [LogUserController::class, 'UserIndex'])->name('user.index');


    Route::post('/edit_bookings/{id}', [LogUserController::class, 'edit'])->name('user.booking_view.edit');
    Route::delete('/delete_bookings/{id}', [LogUserController::class, 'destroy'])->name('user.booking_view.destroy');

    Route::get('/flights', [LogUserController::class, 'flightView'])->name('user.fight_view');

    Route::get('/airticket-book', [LogUserController::class, 'airTicketBook'])->name('user.airticket_book');

    Route::get('/airticket-view', [LogUserController::class, 'airTicketBookView'])->name('user.airticket_book_view');



});
Route::get('/my-freight-bookings', [LogUserController::class, 'freightBookings'])->name('user.freight_bookings');



// -------------------------------
// 🚚 Vendor Routes
// -------------------------------
Route::middleware(['auth', 'role:vendor'])->prefix('vendor')->group(function () {
    Route::get('/', [VendorController::class, 'index'])->name('vendor.index');
    Route::post('/store', [VendorController::class, 'store'])->name('vendor.store');

    Route::get('/dashboard', [VendorController::class, 'vendorDashboard'])->name('vendor.dashboard');
    Route::get('/booking-management', [VendorController::class, 'bookingManagement'])->name('vendor.booking');
    Route::get('/earning-management', [VendorController::class, 'earningManagement'])->name('vendor.earning');
    Route::get('/promotion-management', [VendorController::class, 'promotionManagement'])->name('vendor.promotion');
    Route::get('/report-management', [VendorController::class, 'reportManagement'])->name('vendor.report');
    Route::get('/review-management', [VendorController::class, 'reviewsManagement'])->name('vendor.review');
    Route::get('/document/{vendor}/{type}', [VendorController::class, 'viewDocument'])->name('vendor.document');


    Route::get('/booking-report-download', [VendorController::class, 'downloadReport']);
    Route::get('/booking-report', [VendorController::class, 'displayBookingReport']);
    Route::post('/booking/{id}/status', [VendorController::class, 'updateBookingStatus']);


    // Vehicle management
    Route::get('/vehicles', [VehicleController::class, 'index'])->name('vehicles.index');
    Route::get('/vehicles/create', [VehicleController::class, 'create'])->name('vehicles.create');
    Route::post('/vehicles/store', [VehicleController::class, 'store'])->name('vehicles.store');

    // Warehouse management
    Route::get('/warehouses', [WarehouseController::class, 'index'])->name('vendor.warehouses.index');
    Route::get('/warehouses/create', [WarehouseController::class, 'create'])->name('vendor.warehouses.create');
    Route::post('/warehouses', [WarehouseController::class, 'store'])->name('vendor.warehouses.store');
    Route::get('/warehouses/{warehouse}/edit', [WarehouseController::class, 'edit'])->name('vendor.warehouses.edit');
    Route::put('/warehouses/{warehouse}', [WarehouseController::class, 'update'])->name('vendor.warehouses.update');
    Route::delete('/warehouses/{warehouse}', [WarehouseController::class, 'destroy'])->name('vendor.warehouses.destroy');
    Route::post('/warehouses/{warehouse}/availability', [WarehouseController::class, 'updateAvailability'])->name('vendor.warehouses.availability.update');
    Route::delete('/warehouses/{warehouse}/availability/{availability}', [WarehouseController::class, 'deleteAvailability'])->name('vendor.warehouses.availability.destroy');
    Route::patch('/warehouses/{warehouse}/toggle-status', [WarehouseController::class, 'toggleStatus'])
        ->name('vendor.warehouses.toggle-status');
    Route::post('/warehouses/{warehouse}/book', [WarehouseController::class, 'book'])->name('warehouses.book');
    Route::get('/my-bookings', [WarehouseController::class, 'userBookings'])->name('warehouse.bookings');

    Route::get('/financial/payment', [VendorController::class, 'financialPayment'])->name('vendor.financial.payment');
    Route::get('/financial/expenses', [VendorController::class, 'financialExpenses'])->name('vendor.financial.expenses');
});

// -------------------------------
// 🧍 Driver Routes
// -------------------------------
Route::middleware(['auth', 'role:driver'])->prefix('driver')->group(function () {
    Route::get('/dashboard', [DriverController::class, 'index'])->name('driver.view');
    Route::post('/store', [DriverController::class, 'store'])->name('driver.store');
    Route::get('/edit/{user}', [DriverController::class, 'edit'])->name('driver.edit');
    Route::post('/update', [DriverController::class, 'update'])->name('driver.update');
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
// ✅ Driver Routes
// -------------------------------
Route::middleware(['auth', 'role:driver'])->prefix('driver')->group(function () {

    Route::get('/dashboard', [DriverController::class, 'index'])->name('driver.view');
    Route::post('/driver-store', [DriverController::class, 'store'])->name('driver.store');
    Route::get('/driver-rejected', [DriverController::class, 'driverReject'])->name('driver.rejected');
    Route::get('/driver-service', [DriverController::class, 'servicePackage'])->name('driver.service_pacakge');

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
    Route::put('/driver-bookings/complete/{id}', [DriverController::class, 'markAsCompleted'])->name('driver.booking.complete');

    Route::post('/driver-bookings/chat', [DriverController::class, 'driverChat'])->name('driver.booking.chat');

    Route::get('/driver/payout', [DriverController::class, 'driverPayOut'])->name('driver.payout');
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

    Route::get('/admin/add-vehicle-brand', [AdminController::class, 'addVehicleBrand'])->name('admin.add_vehicle_brand');
    Route::get('/admin/vehicle-body-type', [AdminController::class, 'vehicleBodyType'])->name('admin.vehicle_body_type');

    // Route::get('/admin/vehicle-body-type/create', [BodyTypeController::class, 'create'])->name('vehicle-body-types.create');
    Route::post('/admin/vehicle-body-type', [BodyTypeController::class, 'store'])->name('vehicle-body-types.store');
    Route::post('/admin/vehicle-body-type/{id}', [BodyTypeController::class, 'destroy'])->name('vehicle-body-types.destroy');

    Route::post('/vehicle-brand/{id}', [VehicleBrandController::class, 'destroy'])->name('vehicle-brand.destroy');

    Route::get('/vehicle-brands/create', [VehicleBrandController::class, 'create'])->name('vehicle-brands.create');
    Route::post('/vehicle-brands', [VehicleBrandController::class, 'store'])->name('vehicle-brands.store');

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

    // Freight Company Management
    Route::get('/freight-companies', [FreightController::class, 'index'])->name('admin.freight.index');
    Route::post('/freight-companies/{id}/approve', [FreightController::class, 'approve'])->name('admin.freight.approve');
    Route::post('/freight-companies/{id}/reject', [FreightController::class, 'reject'])->name('admin.freight.reject');
});

// -------------------------------
// 🚚 Courier (Public Access)
// -------------------------------
Route::get('/couriers', [CourierController::class, 'index'])->name('couriers.index');
Route::get('/couriers/create', [CourierController::class, 'create'])->name('couriers.create');
Route::post('/couriers', [CourierController::class, 'store'])->name('couriers.store');
Route::get('/couriers/{courier}', [CourierController::class, 'show'])->name('couriers.show');

// Tracking
// Route::get('/track', fn() => Inertia::render('Courier/TrackForm'))->name('couriers.track-form'); previous one
Route::get('/track', fn() => Inertia::render('Web/home/TrackCouriersForm'))->name('couriers.track-form');
Route::post('/track', [CourierController::class, 'track'])->name('couriers.track');
Route::get('/driver-courier-track', fn() => Inertia::render('Web/home/driver/DriverCourierTrack'))->name('driver.courier.track');

// -------------------------------
// 📋 Warehouse Routes
// -------------------------------
Route::get('/warehouses', [WarehouseController::class, 'search'])->name('warehouses.search');
Route::get('/warehouses/{warehouse}', [WarehouseController::class, 'show'])->name('warehouses.show');


// 🚛 Freight Company Routes
// -------------------------------
Route::middleware(['auth', 'role:freight'])->prefix('freight')->group(function () {
    Route::get('/dashboard', [FreightController::class, 'dashboard'])->name('freight.dashboard');
});

// Public freight registration route
Route::get('/freight/register', [FreightController::class, 'showRegistrationForm'])->name('freight.register');
Route::post('/freight/register', [FreightController::class, 'register'])->name('freight.register.store');









Route::middleware(['auth', 'role:admin,superadmin,user'])->group(function () {
   Route::get('/booking_view', [LogUserController::class, 'bookingView'])->name('user.booking_view');


    });
// -------------------------------
// 🔐 Auth Routes
// -------------------------------
require __DIR__ . '/auth.php';

// -------------------------------
// 🚛 Freight Booking Routes
// -------------------------------
// Route::middleware(['auth'])->prefix('freight-booking')->name('freight.booking.')->group(function () {
//     Route::get('/create', [App\Http\Controllers\FreightBookingController::class, 'create'])->name('create');
//     Route::post('/', [App\Http\Controllers\FreightBookingController::class, 'store'])->name('store');
// });

Route::prefix('freight-booking')->name('freight.booking.')->group(function () {
    Route::get('/create', [App\Http\Controllers\FreightBookingController::class, 'create'])->name('create');
    Route::post('/', [App\Http\Controllers\FreightBookingController::class, 'store'])->name('store');
});


Route::middleware(['auth', 'role:freight'])->prefix('freight')->name('freight.')->group(function () {
    Route::get('/bookings', [App\Http\Controllers\FreightBookingController::class, 'index'])->name('bookings.index');
    Route::put('/bookings/{booking}/status', [App\Http\Controllers\FreightBookingController::class, 'updateStatus'])->name('bookings.updateStatus');
});

Route::middleware(['auth', 'role:admin,superadmin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/freight-bookings', [App\Http\Controllers\FreightBookingController::class, 'adminIndex'])->name('freight.bookings.index');
});


Route::middleware(['auth'])->prefix('vehicle-bookings')->name('vehicle.booking.')->group(function () {
    Route::get('/', [App\Http\Controllers\VehicleBookingController::class, 'index'])->name('index');

    Route::get('/bookings/land', [App\Http\Controllers\VehicleBookingController::class, 'landBookings'])->name('land.bookings');
    Route::get('/bookings/air', [App\Http\Controllers\VehicleBookingController::class, 'airBookings'])->name('air.bookings');
    Route::get('/bookings/sea', [App\Http\Controllers\VehicleBookingController::class, 'seaBookings'])->name('sea.bookings');

    Route::get('/bookings/land/{vehicle}', [App\Http\Controllers\VehicleBookingController::class, 'landBookingDetails'])->name('land.booking.details');
    Route::get('/bookings/air/{vehicle}', [App\Http\Controllers\VehicleBookingController::class, 'airBookingDetails'])->name('air.booking.details');
    Route::get('/bookings/sea/{vehicle}', [App\Http\Controllers\VehicleBookingController::class, 'seaBookingDetails'])->name('sea.booking.details');

    Route::post('/book', [BookingController::class, 'store']);
});




Route::get('/vendors/bookings', function () {
    return Inertia::render('Web/home/vendors/Booking');
})->name('vendors.bookings');

Route::get('/vendors/units', function () {
    return Inertia::render('Web/home/vendors/Unit');
})->name('vendors.units');

Route::get('/vendors/dashboard', function () {
    return Inertia::render('Web/home/vendors/Dashboard');
})->name('vendors.dashboard');

Route::get('/vendors/clients', function () {
    return Inertia::render('Web/home/vendors/Client');
})->name('vendors.clients');

Route::get('/vendors/expenses', function () {
    return Inertia::render('Web/home/vendors/Expenses');
})->name('vendors.expenses');

Route::get('/vendors/payment', function () {
    return Inertia::render('Web/home/vendors/Payment');
})->name('vendors.payment');

Route::get('/vendors/tracking', function () {
    return Inertia::render('Web/home/vendors/Tracking');
})->name('vendors.tracking');

Route::get('/vendors/calendar', function () {
    return Inertia::render('Web/home/vendors/Calendar');
})->name('vendors.calendar');


