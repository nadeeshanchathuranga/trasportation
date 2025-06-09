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
        Schema::create('freight_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('service_type', ['LCL', 'FCL']);
            $table->json('multimodal_preferences')->nullable();
            $table->json('origin');
            $table->json('destination');
            $table->date('preferred_pickup_date')->nullable();
            $table->decimal('total_volume', 10, 2)->nullable(); // For LCL
            $table->string('container_type')->nullable(); // For FCL
            $table->decimal('weight', 10, 2);
            $table->integer('package_count')->nullable();
            $table->string('packing_list_path')->nullable();
            $table->string('commercial_invoice_path')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freight_bookings');
    }
};
