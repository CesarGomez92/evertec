<?php

namespace Tests\Unit;

use Carbon\Carbon;
use Tests\TestCase;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Http;

class OrderTest extends TestCase
{
    protected $request_buy_id;

    public function __counstructor() {
        $this->setUp();
    }

    function setUp():void {
        parent::setUp();
    }

    public function test_create_order() {
        $product = Product::find(1);
        $data = [
            "customer_identification_type" => "cc",
            "customer_identification" => "1152165984",
            "customer_name" => "Julio",
            "customer_surname" => "Gomez",
            "customer_email" => "cesar@example.com",
            "customer_mobile" => "3146987456",
            "customer_country" => "Colombia",
            "customer_state" => "Antioquía",
            "customer_city" => "Medellín",
            "customer_postal_code" => "002400",
            "customer_street" => "Calle falsa 123",
            "reference" => $product->reference,
            "description" => $product->name,
            "price" => $product->price,
        ];

        $response = $this->postJson('/api/order/create', $data);

        $this->assertEquals($response->status(), 200);
    }

    public function test_search_order() {
        $order = Order::find(1);

        $response = $this->postJson('/api/order/' . $order->request_id);

        $this->assertEquals($response->status(), 200);
    }

    public function test_update_order() {
        $order = Order::find(1);

        $response = $this->putJson('/api/orders/' . $order->request_id, ["status" => "APPROVED"]);

        $this->assertEquals($response->status(), 200);
    }

    public function test_order_list() {

        $response = $this->get('/api/orders');

        $response->assertStatus(200);
    }

}
