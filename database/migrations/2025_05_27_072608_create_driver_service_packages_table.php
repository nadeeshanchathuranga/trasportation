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
        Schema::create('driver_service_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained()->onDelete('cascade');
            $table->string('type'); // hourly, route-based, daily
            $table->string('title'); // e.g., "Colombo to Kandy Route"
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('duration_in_hours')->nullable(); // for hourly type
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_service_packages');
    }
};
