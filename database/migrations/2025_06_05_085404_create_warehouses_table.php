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
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('address');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->decimal('total_area', 10, 2); // in sq. ft.
            $table->integer('capacity');
            $table->enum('type', ['cold_storage', 'dry', 'bonded', 'open_yard']);
            $table->json('amenities'); // Store as JSON array
            $table->json('images'); // Store image paths as JSON array
            $table->json('documents'); // Store document paths as JSON array
            $table->enum('pricing_model', ['hourly', 'daily', 'monthly']);
            $table->decimal('price', 10, 2);
            $table->text('terms_conditions');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Create table for warehouse availability/blocking dates
        Schema::create('warehouse_availability', function (Blueprint $table) {
            $table->id();
            $table->foreignId('warehouse_id')->constrained()->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['available', 'blocked', 'maintenance']);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warehouse_availability');
        Schema::dropIfExists('warehouses');
    }
};
