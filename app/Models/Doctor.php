<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    // Tambahkan baris ini:
    protected $fillable = ['name', 'specialization', 'schedule', 'experience', 'education', 'image'];
}