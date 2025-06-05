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
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs('causer'); // User who performed the action
            $table->nullableMorphs('subject'); // Model that was acted upon
            $table->string('action'); // Type of action performed
            $table->text('description')->nullable(); // Human-readable description
            $table->json('properties')->nullable(); // Additional data
            $table->string('ip_address', 45)->nullable(); // IP address of user
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
