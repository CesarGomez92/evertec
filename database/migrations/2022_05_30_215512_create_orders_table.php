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
            $table->string('customer_identification_type', 10);
            $table->string('customer_identification');
            $table->string('customer_name', 80);
            $table->string('customer_surname', 80);
            $table->string('customer_email', 120);
            $table->string('customer_mobile', 40);
            $table->string('customer_country');
            $table->string('customer_state');
            $table->string('customer_city');
            $table->string('customer_postal_code');
            $table->string('customer_street');
            $table->string('status', 20)->nullable();
            $table->integer('product_id')->nullable();
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
