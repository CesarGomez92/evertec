<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;

class ProductTest extends TestCase
{
    protected $request_buy_id;

    public function __counstructor() {
        $this->setUp();
    }

    function setUp():void {
        parent::setUp();
    }

    public function test_products_list() {

        $response = $this->get('/api/products');

        $response->assertStatus(200);
    }

}
