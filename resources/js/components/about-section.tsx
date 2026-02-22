import { Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  return (
    <section className="py-20 bg-white" id="tentang">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758206523747-69af03fb56e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwQ1QlMjBzY2FuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzE3NjY3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Medical equipment"
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
            />
            {/* Logo Badge */}
            <div className="absolute bottom-6 right-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg rotate-45"></div>
                <Heart className="absolute inset-0 m-auto w-5 h-5 text-white z-10" fill="white" />
              </div>
              <span className="font-bold text-[#0B2447]">KliniKu</span>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-4xl font-bold text-[#0B2447] mb-6">
              Mengapa Memilih KliniKu?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              KliniKu hadir sebagai solusi kesehatan terpadu yang mengutamakan kenyamanan dan kepercayaan pasien. Dengan pengalaman lebih dari 10 tahun melayani masyarakat, kami terus berinovasi menghadirkan layanan medis yang komprehensif dan berkualitas tinggi.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Didukung oleh tim dokter spesialis bersertifikat, peralatan medis modern, dan lingkungan yang bersih serta nyaman, kami berkomitmen memberikan pelayanan kesehatan holistik yang berfokus pada kesembuhan dan kesejahteraan setiap individu dan keluarga.
            </p>
            <button className="border-2 border-[#0B2447] text-[#0B2447] hover:bg-[#0B2447] hover:text-white px-8 py-3 rounded-full transition-all">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
