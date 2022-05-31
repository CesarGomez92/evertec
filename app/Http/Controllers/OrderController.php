<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Model\Order;
use Illuminate\Support\Facades\Http;

class OrderController extends Controller
{
    public function create() {

        $login = env('P2P_LOGIN');
        $secretKey = env('P2P_KEY');

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

        $data = [
            $customer_identification_type,
            $customer_identification,
            $customer_name,
            $customer_surname,
            $customer_email,
            $customer_mobile,
            $customer_country,
            $customer_state,
            $customer_city,
            $customer_postal_code,
            $customer_street,
        ];


        $reference = request()->get('reference');
        $description = request()->get('description');
        $price = request()->get('price');

        $nonce = $nonce = mt_rand();;
        $seed = Carbon::now()->setTimezone('America/Bogota')->toIso8601String();
        $trankey = base64_encode(sha1($nonce . $seed . $secretKey, true));
        $nonceBase64 = base64_encode($nonce);

        $order = Http::withHeaders([
            'content-type' => 'application/json',
        ])->post('https://dev.placetopay.com/redirection/api/session',
            [
                'locale' => 'es_CO',
                'auth' => [
                    'login' => $login,
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
                'returnUrl' => 'http://localhost:8080',
                'ipAddress' => '127.0.0.1',
                'userAgent' => 'PlacetoPay Sandbox',
            ]
        );

        $this->saveOrder($order, $data);

        return $order;
    }

    public function saveOrder($order, $data) {

        $order_data = json_decode($order->getBody()->getContents());
        if($order_data->status->status == 'OK'){

        }
        // echo '<pre>' . var_export(json_encode($order->getBody()->getContents()), true) . '</pre>';

    }
}
