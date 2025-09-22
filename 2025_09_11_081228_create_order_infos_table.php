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
        Schema::create('order_infos', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("street");
            $table->string("street_number");
            $table->string("postal");
            $table->string("country");
            $table->boolean("reduction");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_infos');
    }
};
