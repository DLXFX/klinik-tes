import { useState } from 'react';
import { Heart, ChevronDown } from 'lucide-react';

export function Header() {
  const [isLayananOpen, setIsLayananOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg rotate-45"></div>
            <Heart className="absolute inset-0 m-auto w-6 h-6 text-white z-10" fill="white" />
          </div>
          <span className="text-2xl font-bold text-[#0B2447]">KliniKu</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a href="#beranda" className="text-[#0B2447] hover:text-emerald-600 transition-colors">
            Beranda
          </a>
          <a href="#tentang" className="text-[#0B2447] hover:text-emerald-600 transition-colors">
            Tentang Kami
          </a>
          
          {/* Layanan Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsLayananOpen(true)}
            onMouseLeave={() => setIsLayananOpen(false)}
          >
            <button className="flex items-center gap-1 text-[#0B2447] hover:text-emerald-600 transition-colors">
              Layanan
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isLayananOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                <a href="#poli-umum" className="block px-4 py-2 text-[#0B2447] hover:bg-gray-50 transition-colors">
                  Poli Umum
                </a>
                <a href="#poli-gigi" className="block px-4 py-2 text-[#0B2447] hover:bg-gray-50 transition-colors">
                  Poli Gigi
                </a>
                <a href="#laboratorium" className="block px-4 py-2 text-[#0B2447] hover:bg-gray-50 transition-colors">
                  Laboratorium
                </a>
                <a href="#ugd" className="block px-4 py-2 text-[#0B2447] hover:bg-gray-50 transition-colors">
                  Unit Gawat Darurat
                </a>
              </div>
            )}
          </div>

          <a href="#dokter" className="text-[#0B2447] hover:text-emerald-600 transition-colors">
            Tim Dokter
          </a>
          <a href="#berita" className="text-[#0B2447] hover:text-emerald-600 transition-colors">
            Berita
          </a>
          <a href="#kontak" className="text-[#0B2447] hover:text-emerald-600 transition-colors">
            Kontak
          </a>
        </nav>
      </div>
    </header>
  );
}
