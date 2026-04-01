<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
    'name',
    'nik',
    'medical_record_number',
    'email',
    'password',
    'foto_ktp',
    'status'
];
}