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
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index(); // vendor user relation
            $table->string('business_name');
            $table->string('business_registration_no');
            $table->string('registration_document'); // path to file
            $table->string('business_logo')->nullable(); // optional
            $table->enum('category_id', ['Air', 'Land', 'Sea']); // vehicle category
            $table->integer('no_of_vehicles')->default(0);
            $table->string('air_certificate')->nullable();
            $table->string('meritime_lisence')->nullable();
            $table->enum('status', ['accepted', 'pending', 'rejected'])->default('pending')->before('meritime_lisence');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
