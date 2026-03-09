import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { User, CreditCard, FileText, Calendar as CalendarIcon, Stethoscope, Clock, MapPin, Phone, Mail, Shield } from 'lucide-react';

export default function AppointmentPage() {
  const [loggedInPatient, setLoggedInPatient] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const [appointmentData, setAppointmentData] = useState({
    layanan: '', dokter: '', tanggal: '', waktu: '', keluhan: '',
  });

  // Cek Login Saat Halaman Dimuat
  useEffect(() => {
    const userData = localStorage.getItem('kliniku_currentUser');
    if (userData) {
      setLoggedInPatient(JSON.parse(userData));
      setIsCheckingAuth(false);
    } else {
      alert('Anda harus login terlebih dahulu untuk membuat janji!');
      router.visit('/login');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pastikan data pasien ada sebelum disubmit
    if (!loggedInPatient) return;

    const newReservation = {
      id: `RES-${Date.now()}`,
      patientId: loggedInPatient.id,
      noRM: loggedInPatient.noRM,
      nama: loggedInPatient.namaLengkap,
      ...appointmentData,
      status: 'pending'
    };

    const existingRes = JSON.parse(localStorage.getItem('kliniku_reservations') || '[]');
    localStorage.setItem('kliniku_reservations', JSON.stringify([...existingRes, newReservation]));
    
    alert('Sukses! Janji temu Anda telah dikirim dan dapat dilihat oleh Admin.');
    router.visit('/'); 
  };

  // 1. Tahan render dengan layar loading agar tidak crash (Mencegah Black Screen)
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B2447]">
        <div className="text-emerald-400 font-semibold text-xl animate-pulse flex items-center gap-3">
          <Stethoscope className="w-8 h-8" />
          Memeriksa data pasien...
        </div>
      </div>
    );
  }

  // 2. Proteksi ganda: Jika entah kenapa data gagal diload, jangan tampilkan error
  if (!loggedInPatient) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Header />
      
      <main className="flex-grow mt-[72px] bg-gray-50">
        <section className="bg-gradient-to-r from-[#0B2447]/5 to-[#0B2447]/10 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-[#0B2447] mb-4">Buat Janji Temu</h1>
            <p className="text-gray-600 text-lg">Jadwalkan konsultasi kesehatan Anda dengan tim dokter ahli kami.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Profil & Kontak */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-emerald-500/20">
                <div className="bg-gradient-to-r from-[#0B2447] to-[#1a3a5f] p-6 text-white flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Data Pasien</p>
                    <h3 className="text-xl font-bold">Informasi Anda</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div><p className="text-xs text-gray-500 mb-1">Nama Lengkap</p><p className="text-[#0B2447] font-semibold">{loggedInPatient.namaLengkap}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div><p className="text-xs text-gray-500 mb-1">NIK</p><p className="text-[#0B2447] font-semibold">{loggedInPatient.nik}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div><p className="text-xs text-gray-500 mb-1">No. Rekam Medis</p><p className="text-[#0B2447] font-semibold">{loggedInPatient.noRM}</p></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#0B2447] mb-6">Informasi Kontak</h3>
                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-emerald-600" /><div><h4 className="font-semibold text-[#0B2447]">Alamat</h4><p className="text-gray-600">Jl. Kesehatan No. 123, Indramayu</p></div></div>
                  <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-emerald-600" /><div><h4 className="font-semibold text-[#0B2447]">Telepon</h4><p className="text-gray-600">+62 812-3456-7890</p></div></div>
                  <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-emerald-600" /><div><h4 className="font-semibold text-[#0B2447]">Operasional</h4><p className="text-gray-600">Senin - Minggu (UGD 24 Jam)</p></div></div>
                </div>
              </div>
            </div>

            {/* Right Column - Form Reservasi */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0B2447]">Formulir Janji Temu</h2>
                  <p className="text-sm text-gray-600">Pilih layanan dan jadwal konsultasi Anda.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0B2447] mb-2">Pilih Layanan <span className="text-red-500">*</span></label>
                  <select name="layanan" value={appointmentData.layanan} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 bg-white text-gray-900 outline-none">
                    <option value="">-- Pilih Layanan --</option>
                    <option value="Konsultasi Dokter Umum">Konsultasi Dokter Umum</option>
                    <option value="Perawatan Gigi & Mulut">Perawatan Gigi & Mulut</option>
                    <option value="Cek Laboratorium">Cek Laboratorium</option>
                    <option value="Medical Check-Up">Medical Check-Up</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0B2447] mb-2">Pilih Dokter <span className="text-red-500">*</span></label>
                  <select name="dokter" value={appointmentData.dokter} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 bg-white text-gray-900 outline-none">
                    <option value="">-- Pilih Dokter --</option>
                    <option value="Dokter Tersedia (Umum)">Dokter Tersedia (Umum)</option>
                    <option value="Dr. Andi Wijaya, Sp.PD">Dr. Andi Wijaya, Sp.PD</option>
                    <option value="Dr. Budi Santoso, Sp.KG">Dr. Budi Santoso, Sp.KG</option>
                    <option value="Dr. Citra Dewi, Sp.A">Dr. Citra Dewi, Sp.A</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2447] mb-2">Tanggal <span className="text-red-500">*</span></label>
                    <input type="date" name="tanggal" value={appointmentData.tanggal} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 text-gray-900 outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2447] mb-2">Waktu <span className="text-red-500">*</span></label>
                    <select name="waktu" value={appointmentData.waktu} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 bg-white text-gray-900 outline-none">
                      <option value="">-- Pilih Waktu --</option>
                      <option value="09:00">09:00 WIB</option>
                      <option value="10:00">10:00 WIB</option>
                      <option value="11:00">11:00 WIB</option>
                      <option value="13:00">13:00 WIB</option>
                      <option value="15:00">15:00 WIB</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0B2447] mb-2">Keluhan / Catatan (Opsional)</label>
                  <textarea name="keluhan" value={appointmentData.keluhan} onChange={handleChange} rows={3} placeholder="Jelaskan keluhan Anda..." className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 text-gray-900 bg-white outline-none resize-none" />
                </div>

                <button type="submit" className="w-full bg-[#0B2447] hover:bg-[#0B2447]/90 text-white py-4 rounded-full font-bold text-lg shadow-lg transition-all">
                  Konfirmasi Janji Temu
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}