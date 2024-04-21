<?php

use App\Http\Controllers\CarReturnController;
use App\Http\Controllers\PenaltyController;
use App\Http\Controllers\RentController;
use App\Models\CarReturn;
use Illuminate\Http\Request;
use App\Http\Middleware\CheckToken;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware([CheckToken::class])->group(function () {
    Route::get('/auth/logout', [AuthController::class, 'logout']);

    //register hanlder
    Route::post('/register', [UserController::class, 'register']);
    Route::get('/register', [UserController::class, 'index']);
    Route::put('/register/{id}', [UserController::class, 'update']);
    Route::delete('/register/{id}', [UserController::class, 'delete']);


    Route::apiResource('/rent', RentController::class);
    Route::apiResource('/penalties', PenaltyController::class);
    Route::apiResource('/return', CarReturnController::class);
});
