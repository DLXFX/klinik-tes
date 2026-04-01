import { useState, useEffect } from 'react';
import { Heart, User, LogOut } from 'lucide-react';
import { Link, router } from '@inertiajs/react';

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Mengecek status login saat Header dimuat
  useEffect(() => {
  const userData = localStorage.getItem('kliniku_currentUser');

  if (!userData) return;

  try {
    const user = JSON.parse(userData);

    setIsLoggedIn(true);

    setUserName(
      user?.name
        ? user.name.split(' ')[0]
        : 'Pasien'
    );

  } catch (error) {
    console.error("User data rusak:", error);
    localStorage.removeItem('kliniku_currentUser');
  }
}, []);

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('kliniku_currentUser');
      setIsLoggedIn(false);
      router.visit('/'); // Redirect ke beranda
    }
  };

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
          
          {/* Login / Logout Button Dinamis */}
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 px-5 py-2 rounded-full transition-colors font-medium shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout ({userName})</span>
            </button>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full transition-colors font-medium shadow-md"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}