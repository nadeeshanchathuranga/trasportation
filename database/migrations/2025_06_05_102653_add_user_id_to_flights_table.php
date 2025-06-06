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
        if (!Schema::hasColumn('flights', 'user_id')) {
            Schema::table('flights', function (Blueprint $table) {
                $table->unsignedBigInteger('user_id')->after('class');

                // Optional: Add foreign key constraint if needed
                // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('flights', 'user_id')) {
            Schema::table('flights', function (Blueprint $table) {
                // Optional: Drop foreign key first if added
                // $table->dropForeign(['user_id']);

                $table->dropColumn('user_id');
            });
        }
    }
};
