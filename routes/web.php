<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rute Halaman Utama
Route::get('/', function () { return Inertia::render('Home'); });
Route::get('/tentang-kami', function () { return Inertia::render('About'); });
Route::get('/layanan', function () { return Inertia::render('Services'); });
Route::get('/tim-dokter', function () { return Inertia::render('Doctors'); });
Route::get('/berita', function () { return Inertia::render('News'); });
Route::get('/kontak', function () { return Inertia::render('Contact'); });
Route::get('/buat-janji', function () { return Inertia::render('Appointment'); });

// Rute Autentikasi (Tambahan Baru)
Route::get('/login', function () { return Inertia::render('Login'); });
Route::get('/register', function () { return Inertia::render('Register'); });

// Rute Admin (Disesuaikan dengan nama file Admin.tsx)
Route::get('/admin/dashboard', function () { return Inertia::render('Admin'); });
Route::get('/admin/jadwal-reservasi', function () { return Inertia::render('Admin'); });