import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { User, CreditCard, FileText, Calendar as CalendarIcon, Stethoscope, Clock, MapPin, Phone } from 'lucide-react';

export default function AppointmentPage() {
  const [loggedInPatient, setLoggedInPatient] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [doctors, setDoctors] = useState<any[]>([]);

  const [appointmentData, setAppointmentData] = useState({
    layanan: '', dokter: '', tanggal: '', waktu: '', noWhatsApp: '', keluhan: '',
  });

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err));
  }, []);

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

  // LOGIC 1: Ambil daftar Layanan unik
  const availableServices = Array.from(new Set(doctors.map(d => d.specialization)));

  // LOGIC 2: Filter Dokter berdasarkan layanan
  const filteredDoctors = appointmentData.layanan
    ? doctors.filter(d => d.specialization === appointmentData.layanan)
    : [];

  // ================= LOGIC 3: SMART DATE PICKER (MENGHITUNG TANGGAL VALID) =================
  let availableTimes: string[] = [];
  let allowedDays: number[] = [];
  let validDates: { value: string; label: string }[] = [];

  const selectedDoctor = doctors.find(d => d.id.toString() === appointmentData.dokter);

  if (selectedDoctor && selectedDoctor.schedule) {
    // Ekstrak Jam (08:00 - 15:00)
    const timeMatch = selectedDoctor.schedule.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);
    if (timeMatch) {
      const startHour = parseInt(timeMatch[1].split(':')[0]);
      const endHour = parseInt(timeMatch[2].split(':')[0]);
      for (let i = startHour; i < endHour; i++) {
        availableTimes.push(`${i.toString().padStart(2, '0')}:00`);
      }
    }

    // Ekstrak Hari (Senin - Jumat) -> Index JS (Minggu=0, Senin=1, dst)
    const dayMatch = selectedDoctor.schedule.match(/([a-zA-Z]+)\s*-\s*([a-zA-Z]+)/);
    if (dayMatch) {
      const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const startIdx = dayNames.indexOf(dayMatch[1]);
      const endIdx = dayNames.indexOf(dayMatch[2]);

      if (startIdx !== -1 && endIdx !== -1) {
        if (startIdx <= endIdx) {
          for (let i = startIdx; i <= endIdx; i++) allowedDays.push(i);
        } else {
          for (let i = startIdx; i <= 6; i++) allowedDays.push(i);
          for (let i = 0; i <= endIdx; i++) allowedDays.push(i);
        }
      }
    }

    // Generate Tanggal Valid untuk 14 Hari Kedepan berdasarkan 'allowedDays'
    if (allowedDays.length > 0) {
      const today = new Date();
      const dayNamesIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const monthNamesIndo = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

      // Mulai dari besok (H+1) agar tidak bentrok dengan jam yang sudah lewat hari ini
      for (let i = 1; i <= 14; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        
        if (allowedDays.includes(futureDate.getDay())) {
          // Format Value untuk Database (YYYY-MM-DD)
          const yyyy = futureDate.getFullYear();
          const mm = String(futureDate.getMonth() + 1).padStart(2, '0');
          const dd = String(futureDate.getDate()).padStart(2, '0');
          const valueDate = `${yyyy}-${mm}-${dd}`;
          
          // Format Label untuk User (Senin, 10 April 2026)
          const dayName = dayNamesIndo[futureDate.getDay()];
          const monthName = monthNamesIndo[futureDate.getMonth()];
          const labelDate = `${dayName}, ${futureDate.getDate()} ${monthName} ${yyyy}`;

          validDates.push({ value: valueDate, label: labelDate });
        }
      }
    }
  }

  // ================= FUNGSI HANDLE CHANGE =================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setAppointmentData(prev => {
      const newData = { ...prev, [name]: value };

      if (name === 'layanan') {
        newData.dokter = ''; newData.waktu = ''; newData.tanggal = '';
      }
      if (name === 'dokter') {
        newData.waktu = ''; newData.tanggal = '';
      }

      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedInPatient) return;

    const data = {
      patient_id: loggedInPatient.id,
      doctor_id: appointmentData.dokter,
      service: appointmentData.layanan,
      appointment_date: appointmentData.tanggal,
      appointment_time: appointmentData.waktu,
      no_whatsapp: appointmentData.noWhatsApp,
      complaint: appointmentData.keluhan
    };

    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      alert('Janji temu berhasil dibuat!');
      router.visit('/');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat membuat janji.');
    }
  };

  if (isCheckingAuth) return null;
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
            
            {/* Left Column - Profil & Kontak (DIPERPENDEK UNTUK KETERBACAAN, SAMA SEPERTI ASLINYA) */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-[#0B2447] p-6 text-white flex items-center gap-4 rounded-t-2xl">
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-500/30 flex items-center justify-center flex-shrink-0 bg-white/5">
                    <User className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div><p className="text-xs text-gray-300 mb-1">Data Pasien</p><h3 className="text-lg font-bold">Informasi Anda</h3></div>
                </div>
                <div className="p-6 space-y-5 bg-white border border-gray-100 rounded-b-2xl">
                  <div className="flex items-center gap-4"><User className="w-5 h-5 text-emerald-500 flex-shrink-0" /><div><p className="text-xs text-gray-500 mb-0.5">Nama Lengkap</p><p className="text-[#0B2447] font-semibold text-sm">{loggedInPatient.name}</p></div></div>
                  <div className="flex items-center gap-4"><CreditCard className="w-5 h-5 text-emerald-500 flex-shrink-0" /><div><p className="text-xs text-gray-500 mb-0.5">NIK</p><p className="text-[#0B2447] font-semibold text-sm">{loggedInPatient.nik}</p></div></div>
                  <div className="flex items-center gap-4"><FileText className="w-5 h-5 text-emerald-500 flex-shrink-0" /><div><p className="text-xs text-gray-500 mb-0.5">No. Rekam Medis</p><p className="text-[#0B2447] font-semibold text-sm">{loggedInPatient.medical_record_number || '-'}</p></div></div>
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
                  <select name="layanan" value={appointmentData.layanan} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 bg-white text-gray-900 outline-none cursor-pointer">
                    <option value="">-- Pilih Layanan --</option>
                    {availableServices.map((service, idx) => (
                      <option key={idx} value={service as string}>{service as string}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0B2447] mb-2">Pilih Dokter <span className="text-red-500">*</span></label>
                  <select
                    name="dokter"
                    value={appointmentData.dokter}
                    onChange={handleChange}
                    required
                    disabled={!appointmentData.layanan}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 bg-white text-gray-900 outline-none disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer"
                  >
                    <option value="">{appointmentData.layanan ? '-- Pilih Dokter --' : '-- Pilih Layanan Terlebih Dahulu --'}</option>
                    {filteredDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} ({doctor.schedule})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* PERUBAHAN UTAMA: DARI INPUT DATE MENJADI DROPDOWN TANGGAL PINTAR */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2447] mb-2">Tanggal <span className="text-red-500">*</span></label>
                    <select 
                      name="tanggal" 
                      value={appointmentData.tanggal} 
                      onChange={handleChange} 
                      required 
                      disabled={!appointmentData.dokter || validDates.length === 0} 
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 text-gray-900 outline-none bg-white disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer" 
                    >
                      <option value="">
                        {!appointmentData.dokter 
                          ? '-- Pilih Dokter Dulu --' 
                          : validDates.length === 0 
                            ? 'Tidak ada jadwal tersedia' 
                            : '-- Pilih Tanggal Tersedia --'}
                      </option>
                      {validDates.map((dateObj, idx) => (
                        <option key={idx} value={dateObj.value}>{dateObj.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0B2447] mb-2">Waktu <span className="text-red-500">*</span></label>
                    <select 
                      name="waktu" 
                      value={appointmentData.waktu} 
                      onChange={handleChange} 
                      required 
                      disabled={!appointmentData.tanggal}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 bg-white text-gray-900 outline-none disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer"
                    >
                      <option value="">{appointmentData.tanggal ? '-- Pilih Waktu --' : '-- Pilih Tanggal Dulu --'}</option>
                      {availableTimes.map((time, idx) => (
                        <option key={idx} value={time}>{time} WIB</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0B2447] mb-2">Nomor WhatsApp <span className="text-red-500">*</span></label>
                  <input type="text" name="noWhatsApp" value={appointmentData.noWhatsApp} onChange={handleChange} required placeholder="Contoh: 081234567890" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 text-gray-900 bg-white outline-none" />
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