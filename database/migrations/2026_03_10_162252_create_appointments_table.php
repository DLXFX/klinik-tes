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
       Schema::create('appointments', function (Blueprint $table) {
    $table->id();

    $table->unsignedBigInteger('patient_id');
    $table->unsignedBigInteger('doctor_id');

    $table->string('service');
    $table->date('appointment_date');
    $table->string('appointment_time');
    $table->text('complaint')->nullable();
    $table->string('status')->default('pending');

    $table->timestamps();

    $table->foreign('patient_id')->references('id')->on('patients')->cascadeOnDelete();
    $table->foreign('doctor_id')->references('id')->on('doctors')->cascadeOnDelete();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
