<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContratController;
use App\Http\Controllers\ChantierController;
use App\Http\Controllers\AvancementController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\BlocageController;
use App\Models\Notification;
use App\Models\User;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;

// Routes publiques (pas besoin d'être connecté)
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées (il faut être connecté)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});
Route::middleware(['auth:sanctum', 'role:commercial,direction,admin'])->group(function () {
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('contrats', ContratController::class);
});
Route::middleware(['auth:sanctum', 'role:direction,admin,chef_chantier'])->group(function () {
    Route::get('/chantiers', [ChantierController::class, 'index']);
    Route::get('/chantiers/{chantier}', [ChantierController::class, 'show']);
    Route::put('/chantiers/{chantier}', [ChantierController::class, 'update']);
    Route::patch('/chantiers/{chantier}', [ChantierController::class, 'update']);
});

Route::middleware(['auth:sanctum', 'role:direction,admin'])->group(function () {
    Route::post('/chantiers', [ChantierController::class, 'store']);
    Route::delete('/chantiers/{chantier}', [ChantierController::class, 'destroy']);
});
Route::middleware(['auth:sanctum', 'role:direction,admin,chef_chantier'])->group(function () {
    Route::get('/chantiers/{chantier}/avancements', [AvancementController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'role:chef_chantier'])->group(function () {
    Route::post('/chantiers/{chantier}/avancements', [AvancementController::class, 'store']);
});
Route::middleware(['auth:sanctum', 'role:direction,admin,chef_chantier'])->group(function () {
    Route::get('/chantiers/{chantier}/photos', [PhotoController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'role:chef_chantier'])->group(function () {
    Route::post('/chantiers/{chantier}/photos', [PhotoController::class, 'store']);
    Route::delete('/photos/{photo}', [PhotoController::class, 'destroy']);
});
Route::middleware(['auth:sanctum', 'role:direction,admin,chef_chantier'])->group(function () {
    Route::get('/chantiers/{chantier}/blocages', [BlocageController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'role:chef_chantier'])->group(function () {
    Route::post('/chantiers/{chantier}/blocages', [BlocageController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'role:direction,admin,chef_chantier'])->group(function () {
    Route::patch('/blocages/{blocage}', [BlocageController::class, 'update']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::patch('/notifications/{notification}/lu', [NotificationController::class, 'markAsRead']);
});
Route::middleware(['auth:sanctum', 'role:direction,admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('users', UserController::class);
    Route::patch('/users/{user}/toggle-active', [UserController::class, 'toggleActive']);
});