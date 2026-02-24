import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { FloatingButtons } from '../components/floating-buttons';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Target, Eye, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Header />
      
      <main className="flex-grow mt-[72px]">
        {/* Page Title Header */}
        <section className="bg-gradient-to-r from-[#0B2447]/5 to-[#0B2447]/10 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-[#0B2447] mb-4">
              Tentang KliniKu
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              KliniKu adalah klinik kesehatan modern yang berkomitmen memberikan pelayanan medis terbaik dengan dukungan teknologi terkini dan tim medis profesional yang berpengalaman.
            </p>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#0B2447] mb-6">
                  Sejarah Kami
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Didirikan pada tahun 2015, KliniKu hadir sebagai jawaban atas kebutuhan masyarakat akan layanan kesehatan yang berkualitas, terjangkau, dan mudah diakses. Berawal dari klinik kecil dengan 5 staf medis, kini kami telah berkembang menjadi pusat kesehatan terpercaya dengan lebih dari 30 tenaga medis profesional.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Kami melayani ribuan pasien setiap tahunnya dengan berbagai layanan mulai dari konsultasi umum hingga pemeriksaan spesialis. Komitmen kami adalah menempatkan kesehatan dan kenyamanan pasien sebagai prioritas utama.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Dengan pengalaman lebih dari 8 tahun, KliniKu terus berinovasi dalam memberikan pelayanan kesehatan yang modern, ramah, dan profesional untuk seluruh keluarga Indonesia.
                </p>
              </div>
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwY2xpbmljJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzQwMjcwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="KliniKu Building"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2447] mb-4">Visi Kami</h3>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi pusat layanan kesehatan terdepan yang dikenal karena kualitas, inovasi, dan kepedulian terhadap kesejahteraan masyarakat. Kami bercita-cita menjadi mitra kesehatan keluarga Indonesia yang dapat diandalkan di setiap tahap kehidupan.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2447] mb-4">Misi Kami</h3>
                <ul className="text-gray-600 leading-relaxed space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Menyediakan layanan kesehatan berkualitas tinggi dengan teknologi medis terkini</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Meningkatkan akses kesehatan yang terjangkau bagi seluruh lapisan masyarakat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Membangun kepercayaan melalui pelayanan yang ramah dan profesional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Berinovasi dalam memberikan solusi kesehatan yang holistik</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0B2447] mb-4">Nilai-Nilai Kami</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nilai-nilai fundamental yang menjadi pondasi setiap layanan yang kami berikan
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2447] mb-2">Empati</h3>
                <p className="text-gray-600">
                  Kami mendengarkan dan memahami setiap kebutuhan pasien dengan penuh perhatian
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2447] mb-2">Profesional</h3>
                <p className="text-gray-600">
                  Standar medis tertinggi dengan tim dokter dan perawat bersertifikat
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2447] mb-2">Integritas</h3>
                <p className="text-gray-600">
                  Transparansi dan kejujuran dalam setiap tindakan medis dan pelayanan
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2447] mb-2">Inovasi</h3>
                <p className="text-gray-600">
                  Selalu mengadopsi teknologi dan metode terbaru untuk hasil terbaik
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