<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebController;

Route::get('/', [WebController::class, 'index'])->name('home');
Route::get('/drivers-home', [WebController::class, 'driversHome'])->name('drivers.home');
