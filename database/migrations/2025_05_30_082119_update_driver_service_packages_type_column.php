<?php


 use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateDriverServicePackagesTypeColumn extends Migration
{
    public function up(): void
    {
        Schema::table('driver_service_packages', function (Blueprint $table) {
            // Step 1: Add nullable type_id temporarily (no FK yet)
            $table->unsignedBigInteger('type_id')->nullable()->after('driver_id');
        });

        // Step 2: Optionally, convert old 'type' values to actual type_id
        // You can skip this if your data is already clean and mapped
        DB::statement("
            UPDATE driver_service_packages AS p
            JOIN driver_service_packages_types AS t
            ON p.type = t.name
            SET p.type_id = t.id
            WHERE p.type_id IS NULL
        ");

        // Step 3: Now safely drop 'type' and make type_id required
        Schema::table('driver_service_packages', function (Blueprint $table) {
            $table->dropColumn('type');
            $table->unsignedBigInteger('type_id')->nullable(false)->change(); // make required
            $table->foreign('type_id')
                ->references('id')
                ->on('driver_service_packages_types')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('driver_service_packages', function (Blueprint $table) {
            $table->dropForeign(['type_id']);
            $table->dropColumn('type_id');
            $table->string('type'); // Restore string column
        });
    }
}
