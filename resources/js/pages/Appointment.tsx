import { useState } from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { FloatingButtons } from '../components/floating-buttons';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nomorWhatsApp: '',
    layanan: '',
    dokter: '',
    tanggal: '',
    waktu: '',
    keluhan: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Janji temu Anda telah dikonfirmasi! Tim kami akan menghubungi Anda segera.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Header />
      
      <main className="flex-grow mt-[72px]">
        {/* Page Title Header */}
        <section className="bg-gradient-to-r from-[#0B2447]/5 to-[#0B2447]/10 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-[#0B2447] mb-4">
              Buat Janji Temu
            </h1>
            <p className="text-gray-600 text-lg">
              Jadwalkan konsultasi kesehatan Anda dengan tim dokter ahli kami.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-5">
                {/* Left Column - Contact Info (40%) */}
                <div className="md:col-span-2 bg-[#0B2447] text-white p-10">
                  <h2 className="text-2xl font-bold mb-8">Informasi Kontak</h2>
                  
                  <div className="space-y-6">
                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Alamat</h3>
                        <p className="text-gray-300">
                          Jl. Kesehatan No. 123<br />
                          Indramayu, Jawa Barat
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Telepon / WhatsApp</h3>
                        <p className="text-gray-300">+62 812-3456-7890</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-gray-300">halo@kliniku.com</p>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Jam Operasional</h3>
                        <div className="text-gray-300 space-y-1">
                          <p>Senin - Jumat: 08:00 - 20:00</p>
                          <p>Sabtu - Minggu: 09:00 - 17:00</p>
                          <p className="text-emerald-400 font-semibold mt-2">UGD: 24 Jam</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info Box */}
                  <div className="mt-10 p-5 bg-white/10 rounded-xl border border-white/20">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      <span className="font-semibold text-white">Catatan:</span> Konfirmasi janji temu akan dikirim melalui WhatsApp. Pastikan nomor yang Anda masukkan aktif.
                    </p>
                  </div>
                </div>

                {/* Right Column - Form (60%) */}
                <div className="md:col-span-3 p-10">
                  <h2 className="text-2xl font-bold text-[#0B2447] mb-8">
                    Formulir Reservasi
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nama Lengkap */}
                    <div>
                      <label htmlFor="namaLengkap" className="block text-[#0B2447] font-semibold mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="namaLengkap"
                        name="namaLengkap"
                        value={formData.namaLengkap}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-gray-400"
                        placeholder="Masukkan nama lengkap Anda"
                      />
                    </div>

                    {/* Nomor WhatsApp */}
                    <div>
                      <label htmlFor="nomorWhatsApp" className="block text-[#0B2447] font-semibold mb-2">
                        Nomor WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="nomorWhatsApp"
                        name="nomorWhatsApp"
                        value={formData.nomorWhatsApp}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-gray-400"
                        placeholder="08123456789"
                      />
                    </div>

                    {/* Pilih Layanan */}
                    <div>
                      <label htmlFor="layanan" className="block text-[#0B2447] font-semibold mb-2">
                        Pilih Layanan <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="layanan"
                        name="layanan"
                        value={formData.layanan}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      >
                        <option value="" className="text-gray-400">-- Pilih Layanan --</option>
                        <option value="konsultasi-umum">Konsultasi Dokter Umum</option>
                        <option value="gigi">Perawatan Gigi & Mulut</option>
                        <option value="laboratorium">Cek Laboratorium</option>
                        <option value="ugd">Unit Gawat Darurat</option>
                        <option value="medical-checkup">Medical Check-Up</option>
                      </select>
                    </div>

                    {/* Pilih Dokter */}
                    <div>
                      <label htmlFor="dokter" className="block text-[#0B2447] font-semibold mb-2">
                        Pilih Dokter <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="dokter"
                        name="dokter"
                        value={formData.dokter}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      >
                        <option value="" className="text-gray-400">-- Pilih Dokter --</option>
                        <option value="tersedia">Dokter Tersedia</option>
                        <option value="dr-andi">Dr. Andi Wijaya, Sp.PD (Dokter Umum)</option>
                        <option value="dr-budi">Dr. Budi Santoso, Sp.KG (Dokter Gigi)</option>
                        <option value="dr-citra">Dr. Citra Dewi, Sp.A (Dokter Anak)</option>
                        <option value="dr-dian">Dr. Dian Pratama, Sp.OG (Dokter Kandungan)</option>
                      </select>
                    </div>

                    {/* Tanggal & Waktu */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Tanggal */}
                      <div>
                        <label htmlFor="tanggal" className="block text-[#0B2447] font-semibold mb-2">
                          Tanggal <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="tanggal"
                          name="tanggal"
                          value={formData.tanggal}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        />
                      </div>

                      {/* Waktu */}
                      <div>
                        <label htmlFor="waktu" className="block text-[#0B2447] font-semibold mb-2">
                          Waktu <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="waktu"
                          name="waktu"
                          value={formData.waktu}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        >
                          <option value="" className="text-gray-400">-- Pilih Waktu --</option>
                          <option value="09:00">09:00 WIB</option>
                          <option value="10:00">10:00 WIB</option>
                          <option value="11:00">11:00 WIB</option>
                          <option value="13:00">13:00 WIB</option>
                          <option value="14:00">14:00 WIB</option>
                          <option value="15:00">15:00 WIB</option>
                          <option value="16:00">16:00 WIB</option>
                          <option value="17:00">17:00 WIB</option>
                        </select>
                      </div>
                    </div>

                    {/* Keluhan / Catatan */}
                    <div>
                      <label htmlFor="keluhan" className="block text-[#0B2447] font-semibold mb-2">
                        Keluhan / Catatan Tambahan
                      </label>
                      <textarea
                        id="keluhan"
                        name="keluhan"
                        value={formData.keluhan}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none placeholder:text-gray-400"
                        placeholder="Jelaskan keluhan atau informasi tambahan yang perlu kami ketahui..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#FF6B35] hover:bg-[#ff5722] text-white py-4 rounded-full transition-colors shadow-lg text-lg font-semibold"
                    >
                      Konfirmasi Janji Temu
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}