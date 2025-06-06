<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('freight_companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('business_name');
            $table->string('business_type');
            $table->string('registration_number')->unique();
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('location');
            $table->json('service_types'); // Will store array of service types
            $table->json('vehicle_types')->nullable(); // Will store array of vehicle types
            $table->string('capacity_range')->nullable();
            $table->string('business_certificate'); // Path to stored file
            $table->string('tax_document'); // Path to stored file
            $table->string('logo')->nullable(); // Path to stored file
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('freight_companies');
    }
}; 