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
        Schema::create('couriers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            
            // Sender details
            $table->string('sender_name');
            $table->text('sender_address');
            $table->string('sender_telephone');
            $table->string('parcel_type');
            $table->string('custom_parcel_type')->nullable();
            $table->integer('parcel_count');
            $table->decimal('parcel_weight', 8, 2); // weight in kg
            $table->string('payment_method');
            
            // Tracking and status
            $table->string('tracking_number')->unique();
            $table->string('status')->default('pending');
            $table->timestamps();
        });

        Schema::create('courier_receivers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('courier_id')->constrained()->onDelete('cascade');
            $table->string('receiver_name');
            $table->text('receiver_address');
            $table->string('receiver_telephone');
            $table->integer('location_order');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courier_receivers');
        Schema::dropIfExists('couriers');
    }
};
