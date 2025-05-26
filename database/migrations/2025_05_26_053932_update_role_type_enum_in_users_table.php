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
        Schema::table('users', function (Blueprint $table) {
          DB::statement("ALTER TABLE users MODIFY role_type ENUM('user', 'superadmin', 'admin', 'vendor', 'driver') DEFAULT 'user'");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
                  DB::statement("ALTER TABLE users MODIFY role_type ENUM('user', 'superadmin', 'admin', 'vendor') DEFAULT 'user'");

        });
    }
};
