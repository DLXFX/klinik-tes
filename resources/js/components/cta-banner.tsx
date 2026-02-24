import { Link } from '@inertiajs/react';

export function CTABanner() {
  return (
    <section className="relative py-24 bg-[#0B2447] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-white text-9xl">+</div>
        <div className="absolute top-32 right-20 text-white text-7xl">+</div>
        <div className="absolute bottom-20 left-1/4 text-white text-6xl">+</div>
        <div className="absolute bottom-32 right-1/3 text-white text-8xl">+</div>
        <svg className="absolute top-20 right-1/4 w-32 h-32" viewBox="0 0 100 100">
          <path d="M50 10 L60 30 L80 30 L65 45 L70 65 L50 50 L30 65 L35 45 L20 30 L40 30 Z" fill="currentColor" className="text-white" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <p className="text-emerald-400 mb-4 tracking-wider">
          Jangan Tunda Kesehatan Anda
        </p>
        <h2 className="text-5xl font-bold text-white mb-8">
          KONSULTASIKAN KESEHATAN ANDA HARI INI!
        </h2>
        <Link 
          href="/buat-janji" 
          className="inline-block bg-[#FF6B35] hover:bg-[#ff5722] text-white px-10 py-4 rounded-full transition-colors shadow-xl text-lg"
        >
          Hubungi Kami Sekarang
        </Link>
      </div>
    </section>
  );
}