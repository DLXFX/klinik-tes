import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { FloatingButtons } from '../components/floating-buttons';
import { Stethoscope, Smile, FlaskConical, Ambulance, Bed, Activity } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ServicesPage() {
  const services = [
    {
      icon: Stethoscope,
      title: 'Poli Umum',
      description: 'Layanan konsultasi kesehatan umum untuk berbagai keluhan seperti demam, batuk, pilek, dan pemeriksaan kesehatan rutin oleh dokter umum berpengalaman.',
      features: ['Konsultasi Dokter Umum', 'Pemeriksaan Fisik', 'Resep Obat', 'Surat Keterangan Sehat'],
    },
    {
      icon: Smile,
      title: 'Poli Gigi',
      description: 'Perawatan kesehatan gigi dan mulut lengkap termasuk pembersihan, penambalan, pencabutan gigi, dan konsultasi ortodonti dengan dokter gigi spesialis.',
      features: ['Pembersihan Karang Gigi', 'Penambalan Gigi', 'Pencabutan Gigi', 'Perawatan Ortodonti'],
    },
    {
      icon: FlaskConical,
      title: 'Laboratorium',
      description: 'Layanan pemeriksaan laboratorium lengkap dengan teknologi modern untuk diagnosis akurat dan cepat, termasuk tes darah, urine, dan pemeriksaan lainnya.',
      features: ['Tes Darah Lengkap', 'Tes Urine', 'Tes Gula Darah', 'Tes Kolesterol'],
    },
    {
      icon: Ambulance,
      title: 'UGD 24 Jam',
      description: 'Unit Gawat Darurat yang siap melayani 24 jam setiap hari dengan tim medis yang sigap menangani kondisi darurat dan kritis dengan cepat dan profesional.',
      features: ['Penanganan Darurat', 'Ambulans Siaga', 'Tim Medis 24/7', 'Peralatan Lengkap'],
    },
    {
      icon: Bed,
      title: 'Rawat Inap',
      description: 'Fasilitas rawat inap yang nyaman dengan kamar bersih dan perawatan intensif oleh tim medis profesional yang siap mendampingi proses penyembuhan Anda.',
      features: ['Kamar Nyaman', 'Perawatan Intensif', 'Monitoring 24 Jam', 'Fasilitas Lengkap'],
    },
    {
      icon: Activity,
      title: 'Terapi Khusus',
      description: 'Layanan terapi rehabilitasi medis termasuk fisioterapi, terapi wicara, dan terapi okupasi untuk pemulihan pasca cedera atau kondisi medis tertentu.',
      features: ['Fisioterapi', 'Terapi Wicara', 'Terapi Okupasi', 'Program Rehabilitasi'],
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
              Layanan Medis Kami
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Kami menyediakan berbagai layanan kesehatan yang komprehensif dengan standar medis tertinggi untuk memenuhi kebutuhan kesehatan Anda dan keluarga.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0B2447] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-emerald-600 mb-3">Layanan Meliputi:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                            <span className="text-emerald-600 mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href="/buat-janji"
                      className="inline-block w-full text-center bg-[#FF6B35] hover:bg-[#ff5722] text-white py-3 rounded-full transition-colors"
                    >
                      Konsultasi
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Our Services */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0B2447] mb-4">
                Mengapa Memilih Layanan Kami?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                KliniKu berkomitmen memberikan layanan kesehatan terbaik dengan standar internasional
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
                <h3 className="font-bold text-[#0B2447] mb-2">Siaga 24 Jam</h3>
                <p className="text-gray-600 text-sm">
                  Unit Gawat Darurat siap melayani Anda kapan saja
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">30+</div>
                <h3 className="font-bold text-[#0B2447] mb-2">Dokter Ahli</h3>
                <p className="text-gray-600 text-sm">
                  Tim medis berpengalaman dan bersertifikat
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">10K+</div>
                <h3 className="font-bold text-[#0B2447] mb-2">Pasien Puas</h3>
                <p className="text-gray-600 text-sm">
                  Dipercaya oleh ribuan keluarga Indonesia
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">ISO</div>
                <h3 className="font-bold text-[#0B2447] mb-2">Bersertifikat</h3>
                <p className="text-gray-600 text-sm">
                  Standar internasional dalam pelayanan medis
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}