<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Beranda
Route::get('/', function () {
    return Inertia::render('Home');
});

// Tentang Kami
Route::get('/tentang-kami', function () {
    return Inertia::render('About');
});

// Layanan
Route::get('/layanan', function () {
    return Inertia::render('Services');
});

// Tim Dokter
Route::get('/tim-dokter', function () {
    return Inertia::render('Doctors');
});

// Berita
Route::get('/berita', function () {
    return Inertia::render('News');
});

// Kontak
Route::get('/kontak', function () {
    return Inertia::render('Contact');
});

// Form Janji Temu (Tombol CTA)
Route::get('/buat-janji', function () {
    return Inertia::render('Appointment');
});