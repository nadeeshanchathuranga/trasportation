<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('driver_bookings', function (Blueprint $table) {
             DB::statement("ALTER TABLE driver_bookings MODIFY status ENUM('new', 'pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'new'");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('driver_bookings', function (Blueprint $table) {
                DB::statement("ALTER TABLE driver_bookings MODIFY status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending'");

        });
    }
};
