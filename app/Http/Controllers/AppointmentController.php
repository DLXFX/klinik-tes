<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // melihat semua janji temu
    public function index()
    {
        return Appointment::with(['doctor','patient'])
            ->orderBy('appointment_date','asc')
            ->orderBy('appointment_time','asc')
            ->get();
    }

    // membuat janji temu
    public function store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required',
            'doctor_id' => 'required',
            'service' => 'required',
            'appointment_date' => 'required',
            'appointment_time' => 'required'
        ]);

        // cek jadwal dokter
        $exists = Appointment::where('doctor_id',$request->doctor_id)
            ->where('appointment_date',$request->appointment_date)
            ->where('appointment_time',$request->appointment_time)
            ->exists();

        if($exists){
            return response()->json([
                'message' => 'Jadwal dokter sudah terisi'
            ],400);
        }

        $appointment = Appointment::create([
            'patient_id' => $request->patient_id,
            'doctor_id' => $request->doctor_id,
            'service' => $request->service,
            'appointment_date' => $request->appointment_date,
            'appointment_time' => $request->appointment_time,
            'complaint' => $request->complaint,
            'status' => 'pending'
        ]);

        return response()->json($appointment);
    }

    // UPDATE STATUS RESERVASI
    public function updateStatus(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = $request->status;
        $appointment->save();

        return response()->json([
            'message' => 'Status updated'
        ]);
    }

    // HAPUS RESERVASI
    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json([
            'message' => 'Appointment deleted'
        ]);
    }
}