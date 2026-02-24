import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { FloatingButtons } from '../components/floating-buttons';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Calendar, Award } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function DoctorsPage() {
  const doctors = [
    {
      name: 'Dr. Andi Wijaya, Sp.PD',
      specialization: 'Dokter Umum',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzQwMjcwMDAwfDA&ixlib=rb-4.1.0&q=80&w=400',
      schedule: 'Senin - Jumat: 08:00 - 15:00',
      experience: '12 Tahun',
      education: 'Universitas Indonesia'
    },
    {
      name: 'Dr. Budi Santoso, Sp.KG',
      specialization: 'Dokter Gigi',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzQwMjcwMDAwfDA&ixlib=rb-4.1.0&q=80&w=400',
      schedule: 'Senin - Sabtu: 09:00 - 17:00',
      experience: '10 Tahun',
      education: 'Universitas Gadjah Mada'
    },
    {
      name: 'Dr. Citra Dewi, Sp.A',
      specialization: 'Dokter Anak',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NDAyNzAwMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
      schedule: 'Senin - Jumat: 13:00 - 20:00',
      experience: '8 Tahun',
      education: 'Universitas Airlangga'
    },
    {
      name: 'Dr. Dian Pratama, Sp.OG',
      specialization: 'Dokter Kandungan',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NDAyNzAwMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
      schedule: 'Selasa - Sabtu: 10:00 - 16:00',
      experience: '15 Tahun',
      education: 'Universitas Padjadjaran'
    },
    {
      name: 'Dr. Eko Prasetyo, Sp.JP',
      specialization: 'Dokter Jantung',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzQwMjcwMDAwfDA&ixlib=rb-4.1.0&q=80&w=400',
      schedule: 'Rabu - Jumat: 08:00 - 14:00',
      experience: '18 Tahun',
      education: 'Universitas Indonesia'
    },
    {
      name: 'Dr. Fitri Handayani, Sp.M',
      specialization: 'Dokter Mata',
      image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NDAyNzAwMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
      schedule: 'Senin - Kamis: 09:00 - 15:00',
      experience: '11 Tahun',
      education: 'Universitas Diponegoro'
    },
    {
      name: 'Dr. Gani Wijaksana, Sp.PD',
      specialization: 'Dokter Penyakit Dalam',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzQwMjcwMDAwfDA&ixlib=rb-4.1.0&q=80&w=400',
      schedule: 'Selasa - Sabtu: 08:00 - 14:00',
      experience: '14 Tahun',
      education: 'Universitas Hasanuddin'
    },
    {
      name: 'Dr. Hani Kurniawan, Sp.THT',
      specialization: 'Dokter THT',
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NDAyNzAwMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
      schedule: 'Senin - Jumat: 13:00 - 19:00',
      experience: '9 Tahun',
      education: 'Universitas Brawijaya'
    },
    {
      name: 'Dr. Indra Gunawan, Sp.OT',
      specialization: 'Dokter Bedah Ortopedi',
      image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzQwMjcwMDAwfDA&ixlib=rb-4.1.0&q=80&w=400',
      schedule: 'Rabu - Sabtu: 09:00 - 16:00',
      experience: '16 Tahun',
      education: 'Universitas Indonesia'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Header />
      
      <main className="flex-grow mt-[72px]">
        {/* Page Title Header */}
        <section className="bg-gradient-to-r from-[#0B2447]/5 to-[#0B2447]/10 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-[#0B2447] mb-4">
              Kenali Tim Ahli Kami
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Tim dokter profesional dan berpengalaman yang siap memberikan pelayanan kesehatan terbaik untuk Anda dan keluarga.
            </p>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <ImageWithFallback
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2447]/80 via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#0B2447] mb-2">
                      {doctor.name}
                    </h3>
                    <p className="text-emerald-600 font-semibold mb-4">
                      {doctor.specialization}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{doctor.schedule}</span>
                      </div>
                      <div className="flex items-start gap-2 text-gray-600 text-sm">
                        <Award className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div>{doctor.experience} Pengalaman</div>
                          <div className="text-xs text-gray-500">{doctor.education}</div>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      href="/buat-janji"
                      className="w-full bg-[#FF6B35] hover:bg-[#ff5722] text-white py-3 rounded-full transition-colors block text-center"
                    >
                      Buat Janji
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#0B2447]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap Berkonsultasi dengan Dokter Kami?
            </h2>
            <p className="text-gray-300 mb-8">
              Jadwalkan janji temu Anda sekarang dan dapatkan pelayanan kesehatan terbaik dari tim medis profesional kami.
            </p>
            <Link 
              href="/buat-janji"
              className="inline-block bg-[#FF6B35] hover:bg-[#ff5722] text-white px-12 py-4 rounded-full transition-colors shadow-lg text-lg"
            >
              Buat Janji Temu
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}