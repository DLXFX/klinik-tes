import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="relative h-[600px] mt-[72px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758691461888-b74515208d7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBjb25zdWx0aW5nJTIwcGF0aWVudCUyMG1vZGVybiUyMGNsaW5pY3xlbnwxfHx8fDE3NzE3NjY3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Doctor consulting patient"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2447]/90 via-[#0B2447]/70 to-[#0B2447]/50"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-2xl text-white">
          <p className="text-emerald-400 tracking-wider mb-4" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '18px' }}>
            SELAMAT DATANG DI KLINIKU
          </p>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Mitra Kesehatan Terpercaya untuk Keluarga Anda
          </h1>
          <p className="text-lg mb-8 text-gray-200 leading-relaxed">
            Kami berkomitmen menyediakan layanan kesehatan berkualitas tinggi dengan dukungan teknologi medis terkini dan tim dokter yang berpengalaman, demi kenyamanan dan kesembuhan Anda.
          </p>
          <button className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-8 py-4 rounded-full transition-colors shadow-lg">
            Buat Janji Temu
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-[#FF6B35] w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
