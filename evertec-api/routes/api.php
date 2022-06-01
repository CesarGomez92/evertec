<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/order/create', [OrderController::class, 'create']);
Route::get('/products', [ProductController::class, 'index']);
Route::post('/order/{request_id}', [OrderController::class, 'searchOrder']);
Route::get('/orders', [OrderController::class, 'index']);
Route::put('/orders/{order:request_id}', [OrderController::class, 'update']);
