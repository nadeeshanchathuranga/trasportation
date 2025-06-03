<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;



return new class extends Migration
{
    public function up(): void
    {
        Schema::create('driver_booking_comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('driver_booking_id');
            $table->longText('comment');
            $table->timestamps();

            // Add this foreign key constraint
            $table->foreign('driver_booking_id')
                  ->references('id')
                  ->on('driver_bookings')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('driver_booking_comments');
    }
};
