<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Http;

class OrderController extends Controller
{
    private $login;
    private $secretKey;
    private $base_url;

    public function __construct() {
        $this->login = env('P2P_LOGIN');
        $this->secretKey = env('P2P_KEY');
        $this->base_url = env('P2P_API');
    }


    public function index() {
        $orders = Order::all(['customer_identification', 'customer_name', 'customer_surname', 'reference', 'status']);

        foreach($orders as $order){
            $order->product = Product::select(['name'])->where('reference', $order->reference)->first();
        }

        return $orders;
    }

    public function create() {
        $customer_identification_type = request()->get('customer_identification_type');
        $customer_identification = request()->get('customer_identification');
        $customer_name = request()->get('customer_name');
        $customer_surname = request()->get('customer_surname');
        $customer_email = request()->get('customer_email');
        $customer_mobile = request()->get('customer_mobile');
        $customer_country = request()->get('customer_country');
        $customer_state = request()->get('customer_state');
        $customer_city = request()->get('customer_city');
        $customer_postal_code = request()->get('customer_postal_code');
        $customer_street = request()->get('customer_street');
        $reference = request()->get('reference');
        $description = request()->get('description');
        $price = request()->get('price');

        $data = [
            'customer_identification_type' => $customer_identification_type,
            'customer_identification' => $customer_identification,
            'customer_name' => $customer_name,
            'customer_surname' => $customer_surname,
            'customer_email' => $customer_email,
            'customer_mobile' => $customer_mobile,
            'customer_country' => $customer_country,
            'customer_state' => $customer_state,
            'customer_city' => $customer_city,
            'customer_postal_code' => $customer_postal_code,
            'customer_street' => $customer_street,
            'reference' => $reference,
        ];


        $nonce = $nonce = mt_rand();;
        $seed = Carbon::now()->setTimezone('America/Bogota')->toIso8601String();
        $trankey = base64_encode(sha1($nonce . $seed . $this->secretKey, true));
        $nonceBase64 = base64_encode($nonce);

        $order = Http::withHeaders([
            'content-type' => 'application/json',
        ])->post($this->base_url . '/api/session',
            [
                'locale' => 'es_CO',
                'auth' => [
                    'login' => $this->login,
                    'tranKey' => $trankey,
                    'nonce' => $nonceBase64,
                    'seed' =>  $seed,
                ],
                'payment' => [
                    'reference' => $reference,
                    'description' => $description,
                    'amount' => [
                        'currency' => 'COP',
                        'total' => $price,
                    ],
                    'allowPartial' => false,
                ],
                'expiration' => Carbon::now()->addMinutes(10)->setTimezone('America/Bogota')->toIso8601String(),
                'returnUrl' => 'http://localhost:8080/status',
                'ipAddress' => '127.0.0.1',
                'userAgent' => 'PlacetoPay Sandbox',
            ]
        );

        $this->saveOrder($order, $data);

        return json_decode($order);
    }

    public function saveOrder($order, $data) {
        $order_data = json_decode($order->getBody()->getContents());
        $order_statuses = [
            'OK' => 'CREATED',
            'REJECTED' => 'REJECTED',
            'APPROVED' => 'PAYED',
            'DEFAULT' => 'CREATED',
        ];
        $status = $order_statuses[$order_data->status->status]??$order_statuses['DEFAULT'];
        $request_id = $order_data->requestId;

        $data['status'] = $status;
        $data['request_id'] = $request_id;
        Order::create($data);

    }

    public function searchOrder($request_id){
        $nonce = $nonce = mt_rand();;
        $seed = Carbon::now()->setTimezone('America/Bogota')->toIso8601String();
        $trankey = base64_encode(sha1($nonce . $seed . $this->secretKey, true));
        $nonceBase64 = base64_encode($nonce);

        $order = Http::withHeaders([
            'content-type' => 'application/json',
        ])->post($this->base_url . '/api/session/' . $request_id,
            [
                'locale' => 'es_CO',
                'auth' => [
                    'login' => $this->login,
                    'tranKey' => $trankey,
                    'nonce' => $nonceBase64,
                    'seed' =>  $seed,
                ],
            ]
        );
        return json_decode($order);
    }

    public function update(Order $order) {
        $status = request()->get('status');

        $order->update(['status' => $status]);

        return 200;
    }
}
