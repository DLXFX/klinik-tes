<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Doctor;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        Doctor::insert([
            [
                'name' => 'Dr. Andi Wijaya',
                'specialization' => 'Dokter Umum',
                'schedule' => 'Senin - Jumat 08:00 - 15:00',
                'experience' => '12 Tahun',
                'education' => 'Universitas Indonesia',
                'image' => 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d'
            ],
            [
                'name' => 'Dr. Budi Santoso',
                'specialization' => 'Dokter Gigi',
                'schedule' => 'Senin - Sabtu 09:00 - 17:00',
                'experience' => '10 Tahun',
                'education' => 'Universitas Gadjah Mada',
                'image' => 'https://images.unsplash.com/photo-1622253692010-333f2da6031d'
            ],
            [
                'name' => 'Dr. Citra Dewi',
                'specialization' => 'Dokter Anak',
                'schedule' => 'Senin - Jumat 13:00 - 20:00',
                'experience' => '8 Tahun',
                'education' => 'Universitas Airlangga',
                'image' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2'
            ],
            [
                'name' => 'Dr. Dian Pratama',
                'specialization' => 'Dokter Kandungan',
                'schedule' => 'Selasa - Sabtu 10:00 - 16:00',
                'experience' => '15 Tahun',
                'education' => 'Universitas Padjadjaran',
                'image' => 'https://images.unsplash.com/photo-1594824476967-48c8b964273f'
            ],
            [
                'name' => 'Dr. Eko Prasetyo',
                'specialization' => 'Dokter Jantung',
                'schedule' => 'Rabu - Jumat 08:00 - 14:00',
                'experience' => '18 Tahun',
                'education' => 'Universitas Indonesia',
                'image' => 'https://images.unsplash.com/photo-1537368910025-700350fe46c7'
            ],
            [
                'name' => 'Dr. Fitri Handayani',
                'specialization' => 'Dokter Mata',
                'schedule' => 'Senin - Kamis 09:00 - 15:00',
                'experience' => '11 Tahun',
                'education' => 'Universitas Diponegoro',
                'image' => 'https://images.unsplash.com/photo-1527613426441-4da17471b66d'
            ],
            [
                'name' => 'Dr. Gani Wijaksana',
                'specialization' => 'Dokter Penyakit Dalam',
                'schedule' => 'Selasa - Sabtu 08:00 - 14:00',
                'experience' => '14 Tahun',
                'education' => 'Universitas Hasanuddin',
                'image' => 'https://images.unsplash.com/photo-1582750433449-648ed127bb54'
            ],
            [
                'name' => 'Dr. Hani Kurniawan',
                'specialization' => 'Dokter THT',
                'schedule' => 'Senin - Jumat 13:00 - 19:00',
                'experience' => '9 Tahun',
                'education' => 'Universitas Brawijaya',
                'image' => 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634'
            ],
            [
                'name' => 'Dr. Indra Gunawan',
                'specialization' => 'Dokter Bedah Ortopedi',
                'schedule' => 'Rabu - Sabtu 09:00 - 16:00',
                'experience' => '16 Tahun',
                'education' => 'Universitas Indonesia',
                'image' => 'https://images.unsplash.com/photo-1638202993928-7267aad84c31'
            ]
        ]);
    }
}