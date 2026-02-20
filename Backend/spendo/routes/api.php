<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CurrencyController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\Dashboard\SummaryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', fn(Request $request) => $request->user());

    Route::apiResource('accounts', AccountController::class);
    Route::apiResource('transactions', TransactionController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('currencies', CurrencyController::class);

    Route::prefix('dashboard')->group(function () {
        Route::get('/main', [SummaryController::class, 'getMainDashboard']);
        Route::get('/expenses', [SummaryController::class, 'getExpenseAnalysis']);
        Route::get('/savings', [SummaryController::class, 'getSavingsDashboard']);
    });

});