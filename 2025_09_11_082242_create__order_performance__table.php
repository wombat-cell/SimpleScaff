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
        Schema::create('order_performance', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("order_info_id");
            $table->unsignedBigInteger("performance_id");
            $table->string("seat");
            $table->timestamps();

            $table->foreign("order_info_id")->references("id")->on("order_infos");
            $table->foreign("performance_id")->references("id")->on("performances");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_performance');
    }
};
