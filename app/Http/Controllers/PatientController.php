<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
   public function store(Request $request)
{
    $request->validate([
    'name' => 'required|string|max:255',
    'nik' => 'required|digits:16|unique:patients,nik',
    'email' => 'required|email|unique:patients,email',
    'password' => 'required|string|min:4',
    'foto_ktp' => 'required|image|mimes:jpg,jpeg,png|max:2048'
]);

    $path = null;

    if ($request->hasFile('foto_ktp')) {
        $path = $request->file('foto_ktp')->store('ktp', 'public');
    }

    $patient = Patient::create([
        'name' => $request->name,
        'nik' => $request->nik,
        'medical_record_number' => null,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'foto_ktp' => $path,
        'no_whatsapp' => $request->no_whatsapp,
    ]);

    return response()->json([
        'message' => 'Register berhasil',
        'patient' => $patient
    ]);
}

    public function destroy($id) 
{
    $patient = Patient::findOrFail($id);
    $patient->delete(); // Ini yang menghapus di database
     
    return response()->json([
        'message' => 'Pasien berhasil dihapus'
    ]);
}

    // mengambil semua pasien
    public function index()
    {
        return response()->json(Patient::all());
    }

    // approve pasien
    public function approve($id)
    {
        $patient = Patient::findOrFail($id);

        $patient->status = 'approved';
        $patient->medical_record_number = 'RM-' . date('Y') . '-' . rand(1000,9999);

        $patient->save();

        return response()->json([
            'message' => 'Pasien disetujui',
            'patient' => $patient
        ]);
    }
}