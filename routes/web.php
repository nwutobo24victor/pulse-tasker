<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AuthController::class, 'index'])->name('home');
Route::post('/login-pass', [AuthController::class, 'loginWithUserPass'])->name('login-pass');
Route::post('/login-code', [AuthController::class, 'loginWithPassCode'])->name('login-code');
