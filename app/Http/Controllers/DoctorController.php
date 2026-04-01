<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    // mengambil semua dokter
    public function index()
    {
        $doctors = Doctor::all();

        return response()->json($doctors);
    }

    // tambah dokter
    public function store(Request $request)
    {
        $doctor = Doctor::create([
            'name' => $request->name,
            'specialization' => $request->specialization,
            'schedule' => $request->schedule,
            'experience' => $request->experience,
            'education' => $request->education,
            'image' => $request->image
        ]);

        return response()->json($doctor);
    }
}