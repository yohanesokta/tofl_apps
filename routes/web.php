<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
Route::get('/', function () {
    return redirect()->route('dashboard');  
});


Route::get("/auth/login",[AppController::class,"login"])->name("login");
Route::get("/auth/sign",[AppController::class,"register"])->name("sign");

Route::post("/auth/login",[AppController::class,"action_login"]);
Route::post("/auth/sign",[AppController::class,"action_register"]);
Route::post("/auth/logout",[AppController::class,"logout"])->name("logout");



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');
});