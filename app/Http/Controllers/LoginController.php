<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // LOGIN ADMIN
        if($request->nik === "admin" && $request->password === "admin123"){
            
            session([
                'admin_login' => true
            ]);

            return response()->json([
                'message' => 'Login admin berhasil',
                'role' => 'admin'
            ]);
        }

        // LOGIN PASIEN
        $patient = Patient::where('nik', $request->nik)
        ->orWhere('medical_record_number', $request->nik)
        ->first();

        if (!$patient || !Hash::check($request->password, $patient->password)) {
            return response()->json([
                'message' => 'NIK/No. RM atau Password salah!'
            ], 401);
        }

        if ($patient->status !== 'approved') {
    return response()->json([
        'message' => 'Akun belum disetujui admin!'
    ], 403);
}

        return response()->json([
            'message' => 'Login berhasil',
            'patient' => $patient,
            'role' => 'patient'
        ]);
    }

    public function logout()
    {
        session()->forget('admin_login');

        return redirect('/login');
    }
}