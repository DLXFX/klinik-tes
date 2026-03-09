import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Heart, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ nikOrRM: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patients = JSON.parse(localStorage.getItem('kliniku_patients') || '[]');
    
    // Cari user berdasarkan NIK atau NoRM dan password
    const user = patients.find((p: any) => 
      (p.nik === formData.nikOrRM || p.noRM === formData.nikOrRM) && 
      p.password === formData.password
    );

    if (user) {
      if (user.status === 'pending') {
        alert('Gagal: Akun Anda masih menunggu persetujuan Admin.');
      } else {
        // Berhasil login
        localStorage.setItem('kliniku_currentUser', JSON.stringify(user));
        alert(`Selamat datang kembali, ${user.namaLengkap}!`);
        router.visit('/buat-janji'); // Pindah ke halaman reservasi
      }
    } else {
      alert('NIK/No. RM atau Password salah!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0B2447] mb-2">Masuk ke KliniKu</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0B2447] mb-2">NIK / No. Rekam Medis</label>
            <input type="text" value={formData.nikOrRM} onChange={(e) => setFormData({ ...formData, nikOrRM: e.target.value })} className="w-full px-4 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0B2447] mb-2">Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none" required />
          </div>
          <button type="submit" className="w-full bg-[#0B2447] text-white py-3 rounded-full font-bold">Masuk</button>
          <div className="text-center pt-4">
            <Link href="/register" className="text-emerald-600 font-semibold">Belum punya akun? Daftar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}