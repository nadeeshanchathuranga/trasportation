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
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->enum('class', ['Economy', 'Business'])->default('Economy');
            $table->string('airline');
            $table->decimal('price', 10, 2);
            $table->time('departure_time');
            $table->time('arrival_time')->nullable();
            $table->enum('status', ['accepted', 'pending', 'rejected', 'suspended', 'banned'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};
