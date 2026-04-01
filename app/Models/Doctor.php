<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = [
        'name',
        'specialization',
        'schedule',
        'experience',
        'education',
        'image'
    ];

    public function appointments()
{
    return $this->hasMany(Appointment::class);
}

}