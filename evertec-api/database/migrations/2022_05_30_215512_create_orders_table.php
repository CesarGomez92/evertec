<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('customer_identification_type', 10)->nullable();
            $table->string('customer_identification')->nullable();
            $table->string('customer_name', 80)->nullable();
            $table->string('customer_surname', 80)->nullable();
            $table->string('customer_email', 120)->nullable();
            $table->string('customer_mobile', 40)->nullable();
            $table->string('customer_country')->nullable();
            $table->string('customer_state')->nullable();
            $table->string('customer_city')->nullable();
            $table->string('customer_postal_code')->nullable();
            $table->string('customer_street')->nullable();
            $table->string('status', 20)->nullable();
            $table->string('reference')->nullable();
            $table->integer('request_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
