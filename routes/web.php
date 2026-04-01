<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\LoginController;

// ===== HALAMAN =====

Route::get('/', fn () => Inertia::render('Home'));
Route::get('/tentang-kami', fn () => Inertia::render('About'));
Route::get('/layanan', fn () => Inertia::render('Services'));
Route::get('/tim-dokter', fn () => Inertia::render('Doctors'));
Route::get('/berita', fn () => Inertia::render('News'));
Route::get('/kontak', fn () => Inertia::render('Contact'));
Route::get('/buat-janji', fn () => Inertia::render('Appointment'));

Route::get('/login', fn () => Inertia::render('Login'));
Route::get('/register', fn () => Inertia::render('Register'));


// ===== ADMIN =====

Route::middleware(['web','admin'])->group(function(){

    Route::get('/admin/dashboard', fn () => Inertia::render('Admin'));
    Route::get('/admin/jadwal-reservasi', fn () => Inertia::render('Admin'));
    Route::get('/logout', [LoginController::class, 'logout']);

});


// ===== API =====

Route::post('/api/patients', [PatientController::class, 'store']);
Route::delete('/api/patients/{id}', [PatientController::class, 'destroy']);

Route::get('/api/doctors', [DoctorController::class, 'index']);
Route::post('/api/doctors', [DoctorController::class, 'store']);

Route::get('/api/appointments', [AppointmentController::class, 'index']);
Route::post('/api/appointments', [AppointmentController::class, 'store']);

Route::post('/api/appointments/{id}/status', [AppointmentController::class, 'updateStatus']);
Route::delete('/api/appointments/{id}', [AppointmentController::class, 'destroy']);

Route::post('/api/login', [LoginController::class, 'login']);

Route::get('/api/patients', [PatientController::class,'index']);
Route::post('/api/patients/{id}/approve', [PatientController::class,'approve']);