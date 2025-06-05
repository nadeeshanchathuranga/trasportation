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
        Schema::create('booking_summaries', function (Blueprint $table) {

            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // User making the booking
            $table->foreignId('flight_id')->constrained()->onDelete('cascade'); // Related flight
            $table->string('seat_number');
            $table->decimal('price', 10, 2);
            $table->decimal('tax', 10, 2)->default(0.00);
            $table->string('baggage')->nullable(); // e.g., "20kg Checked, 7kg Hand"
            $table->time('departure_time');
            $table->time('arrival_time')->nullable();
               $table->enum('status', ['pending', 'confirmed', 'cancelled'])
                  ->default('pending');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_summaries');
    }
};
