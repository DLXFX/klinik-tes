<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function index()
    {
        return response()->json(Doctor::all());
    }

    // TAMBAHKAN KODE DI BAWAH INI:
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'specialization' => 'required',
            'schedule' => 'required',
        ]);

        // Beri foto default jika saat mendaftar tidak ada link foto yang dimasukkan
        $image = $request->image ?: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d';

        $doctor = Doctor::create([
            'name' => $request->name,
            'specialization' => $request->specialization,
            'schedule' => $request->schedule,
            'experience' => $request->experience ?: '-',
            'education' => $request->education ?: '-',
            'image' => $image,
        ]);

        return response()->json(['message' => 'Dokter berhasil ditambahkan', 'doctor' => $doctor]);
    }

    public function destroy($id)
    {
        if (Doctor::destroy($id)) {
            return response()->json(['message' => 'Dokter berhasil dihapus']);
        }
        
        return response()->json(['message' => 'Dokter tidak ditemukan'], 404);
    }
}