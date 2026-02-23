import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0B2447] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg rotate-45"></div>
                <Heart className="absolute inset-0 m-auto w-6 h-6 text-white z-10" fill="white" />
              </div>
              <span className="text-2xl font-bold">KliniKu</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Mitra kesehatan terpercaya untuk keluarga Indonesia dengan layanan berkualitas dan teknologi medis modern.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><a href="#beranda" className="text-gray-300 hover:text-emerald-400 transition-colors">Beranda</a></li>
              <li><a href="#tentang" className="text-gray-300 hover:text-emerald-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#layanan" className="text-gray-300 hover:text-emerald-400 transition-colors">Layanan</a></li>
              <li><a href="#dokter" className="text-gray-300 hover:text-emerald-400 transition-colors">Tim Dokter</a></li>
              <li><a href="#kontak" className="text-gray-300 hover:text-emerald-400 transition-colors">Kontak</a></li>
            </ul>
          </div>

          {/* Column 3 - Layanan */}
          <div>
            <h3 className="text-xl font-bold mb-4">Layanan Kami</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Poli Umum</li>
              <li className="text-gray-300">Poli Gigi</li>
              <li className="text-gray-300">Laboratorium</li>
              <li className="text-gray-300">Unit Gawat Darurat</li>
              <li className="text-gray-300">Medical Check-Up</li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">Jl. Kesehatan No. 123, Jakarta Selatan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300">info@kliniku.co.id</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          
        </div>
      </div>
    </footer>
  );
}
