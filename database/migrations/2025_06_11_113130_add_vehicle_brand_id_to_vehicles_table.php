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
        Schema::table('vehicles', function (Blueprint $table) {
            $table->unsignedBigInteger('vehicle_brand_id')->after('vendor_id');

            $table->foreign('vehicle_brand_id')
                ->references('id')
                ->on('vehicle_brands')
                ->onDelete('cascade'); // optional: set to null/cascade/restrict as needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropForeign(['vehicle_brand_id']);
            $table->dropColumn('vehicle_brand_id');
        });
    }
};
