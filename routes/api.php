<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Routes publiques (pas besoin d'être connecté)
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées (il faut être connecté)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});