<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebController;

Route::get('/', [WebController::class, 'index'])->name('home');
Route::get('/drivers-home', [WebController::class, 'driversHome'])->name('drivers.home');

Route::get('/vehicleList', [WebController::class, 'vehicleList'])->name('vehicle.list');
Route::get('/vehicleDetails', [WebController::class, 'vehicleDetails'])->name('vehicle.details');
Route::get('/courier-service', [WebController::class, 'courierService'])->name('courier.service');
Route::get('/book-a-ticket', [WebController::class, 'bookATicket'])->name('book.a.ticket');
Route::get('/booking-home', [WebController::class, 'bookingHome'])->name('booking.home');
Route::get('/cargo-freight', [WebController::class, 'cargoFreight'])->name('cargo.freight');
Route::get('/drivers-home', [WebController::class, 'driversHome'])->name('drivers.home');
Route::get('/driver-search-results', [WebController::class, 'driverSearchResults'])->name('driver.search.results');
Route::get('/driver-details', [WebController::class, 'driverDetails'])->name('driver.details');
Route::get('/vehicle-checkout', [WebController::class, 'vehicleCheckout'])->name('vehicle.checkout');

// Route::get('/vendors/bookings', function () {
//   return Inertia::render('Web/home/vendors/Booking');
// })->name('vendors.bookings');

// Route::get('/vendors/units', function () {
//   return Inertia::render('Web/home/vendors/Unit');
// })->name('vendors.units');

// Route::get('/vendors/dashboard', function () {
//   return Inertia::render('Web/home/vendors/Dashboard');
// })->name('vendors.dashboard');

// Route::get('/vendors/clients', function () {
//   return Inertia::render('Web/home/vendors/Client');
// })->name('vendors.clients');

// Route::get('/vendors/expenses', function () {
//   return Inertia::render('Web/home/vendors/Expenses');
// })->name('vendors.expenses');

// Route::get('/vendors/payment', function () {
//   return Inertia::render('Web/home/vendors/Payment');
// })->name('vendors.payment');

// Route::get('/vendors/tracking', function () {
//   return Inertia::render('Web/home/vendors/Tracking');
// })->name('vendors.tracking');

// Route::get('/vendors/calendar', function () {
//   return Inertia::render('Web/home/vendors/Calendar');
// })->name('vendors.calendar');