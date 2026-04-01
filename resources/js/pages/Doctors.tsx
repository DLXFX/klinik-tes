import { useState, useEffect } from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { FloatingButtons } from '../components/floating-buttons';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Calendar, Award } from 'lucide-react';
import { Link } from '@inertiajs/react';

  type Doctor = {
  id: number
  name: string
  specialization: string
  schedule: string
  experience: string
  education: string
  image: string
}

export default function DoctorsPage() {

const [doctors, setDoctors] = useState<Doctor[]>([]);


useEffect(() => {
  fetch('http://127.0.0.1:8000/api/doctors')
    .then(res => res.json())
    .then(data => setDoctors(data))
    .catch(err => console.log(err));
}, []);
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
              {doctors.map((doctor) => (
               <div
                key={doctor.id}
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