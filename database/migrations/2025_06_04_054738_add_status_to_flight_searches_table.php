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
        Schema::table('flight_searches', function (Blueprint $table) {
          $table->enum('status', ['accepted', 'pending', 'rejected', 'suspended', 'banned'])->default('pending')->after('passenger_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('flight_searches', function (Blueprint $table) {
           $table->dropColumn('status');
        });
    }
};
