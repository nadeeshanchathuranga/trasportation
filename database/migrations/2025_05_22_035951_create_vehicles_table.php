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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vendor_id');
            // $table->unsignedBigInteger('type_id');
            $table->string('model');
            $table->string('manufracture');
            $table->year('manufracture_year');
            $table->year('register_year');
            $table->string('vehicle_no')->unique();
            $table->string('category'); // Air, Land, Sea (optional if using category table)
            $table->string('color');
            $table->string('condition');
            $table->string('ownership_type');
            $table->integer('passenger_capacity')->nullable();
            $table->integer('currect_milage')->nullable();
            $table->text('description')->nullable();
            $table->string('insuarance_provider_name')->nullable();
            $table->string('insuarance_document')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
