import { Stethoscope, Smile, Ambulance, Microscope } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: Stethoscope,
      title: 'Konsultasi Dokter Umum',
      description: 'Layanan pemeriksaan kesehatan umum dengan dokter berpengalaman untuk diagnosis dan penanganan penyakit.',
    },
    {
      icon: Smile,
      title: 'Perawatan Gigi & Mulut',
      description: 'Perawatan lengkap kesehatan gigi dan mulut mulai dari pembersihan hingga perawatan ortodonti.',
    },
    {
      icon: Ambulance,
      title: 'Layanan Gawat Darurat',
      description: 'Unit gawat darurat 24 jam siap memberikan penanganan cepat untuk kondisi medis darurat.',
    },
    {
      icon: Microscope,
      title: 'Cek Laboratorium Lengkap',
      description: 'Fasilitas laboratorium modern dengan hasil akurat untuk berbagai jenis pemeriksaan kesehatan.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-2" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '20px' }}>
            Layanan Kami
          </p>
          <h2 className="text-4xl font-bold text-[#FF6B35]">
            LAYANAN UNGGULAN
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-[#0B2447]/5 flex items-center justify-center mb-6">
                <service.icon className="w-10 h-10 text-[#0B2447]" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#FF6B35] mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              {/* Button */}
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}