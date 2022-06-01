<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_identification_type',
        'customer_identification',
        'customer_name',
        'customer_surname',
        'customer_email',
        'customer_mobile',
        'customer_country',
        'customer_state',
        'customer_city',
        'customer_postal_code',
        'customer_street',
        'status',
        'request_id',
        'reference',
    ];
}
