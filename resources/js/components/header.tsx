import { Heart } from 'lucide-react';
import { Link } from '@inertiajs/react';

export function Header() {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg rotate-45"></div>
            <Heart className="absolute inset-0 m-auto w-6 h-6 text-white z-10" fill="white" />
          </div>
          <span className="text-2xl font-bold text-[#0B2447]">KliniKu</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link href="/" className="text-[#0B2447] hover:text-emerald-600 transition-colors">
            Beranda
          </Link>
          <Link href="/tentang-kami" className="text-[#0B2447] hover:text-emerald-600 transition-colors">
            Tentang Kami
          </Link>
          <Link href="/layanan" className="text-[#0B2447] hover:text-emerald-600 transition-colors">
            Layanan
          </Link>
          <Link href="/tim-dokter" className="text-[#0B2447] hover:text-emerald-600 transition-colors">
            Tim Dokter
          </Link>
          <Link href="/kontak" className="text-[#0B2447] hover:text-emerald-600 transition-colors">
            Kontak
          </Link>
        </nav>
      </div>
    </header>
  );
}