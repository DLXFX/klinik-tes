import { useState } from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { FloatingButtons } from '../components/floating-buttons';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Terima kasih! Pesan Anda telah dikirim. Tim kami akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
              Hubungi Kami
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui formulir di bawah ini atau informasi kontak yang tersedia.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Left Column - Contact Info (40%) */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#0B2447] mb-6">
                    Informasi Kontak
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Jangan ragu untuk menghubungi kami. Kami tersedia untuk menjawab pertanyaan Anda dan memberikan layanan kesehatan terbaik.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B2447] mb-1">Alamat Klinik</h3>
                      <p className="text-gray-600">
                        Jl. Kesehatan No. 123<br />
                        Indramayu, Jawa Barat 45213<br />
                        Indonesia
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B2447] mb-1">Telepon</h3>
                      <p className="text-gray-600">
                        +62 812-3456-7890<br />
                        +62 234-567-8901 (Kantor)
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B2447] mb-1">Email</h3>
                      <p className="text-gray-600">
                        halo@kliniku.com<br />
                        info@kliniku.com
                      </p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B2447] mb-1">Jam Operasional</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Senin - Jumat: 08:00 - 20:00</p>
                        <p>Sabtu - Minggu: 09:00 - 17:00</p>
                        <p className="text-emerald-600 font-semibold mt-2">UGD: 24 Jam Nonstop</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Google Maps</p>
                    <p className="text-sm text-gray-400">Lokasi KliniKu</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form (60%) */}
              <div className="lg:col-span-3">
                {/* Form container updated with shadow and border */}
                <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-8 lg:p-10">
                  <h2 className="text-2xl font-bold text-[#0B2447] mb-6">
                    Kirim Pesan
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Isi formulir di bawah ini dan kami akan merespons secepat mungkin.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-[#0B2447] font-semibold mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-gray-400"
                        placeholder="Masukkan nama lengkap Anda"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-[#0B2447] font-semibold mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-gray-400"
                        placeholder="email@example.com"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-[#0B2447] font-semibold mb-2">
                        Subjek <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      >
                        <option value="" className="text-gray-400">-- Pilih Subjek --</option>
                        <option value="konsultasi">Konsultasi Kesehatan</option>
                        <option value="janji-temu">Buat Janji Temu</option>
                        <option value="informasi-layanan">Informasi Layanan</option>
                        <option value="keluhan">Keluhan & Saran</option>
                        <option value="kerjasama">Kerjasama</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-[#0B2447] font-semibold mb-2">
                        Pesan <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none placeholder:text-gray-400"
                        placeholder="Tuliskan pesan Anda di sini..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#FF6B35] hover:bg-[#ff5722] text-white py-4 rounded-full transition-colors shadow-lg text-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Kirim Pesan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-16 bg-gradient-to-r from-[#0B2447] to-[#0B2447]/90">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Hubungi Langsung</h3>
                <p className="text-gray-300 mb-4">
                  Butuh bantuan segera? Hubungi kami melalui telepon
                </p>
                <a
                  href="tel:+6281234567890"
                  className="inline-block bg-[#FF6B35] hover:bg-[#ff5722] text-white px-6 py-3 rounded-full transition-colors"
                >
                  Telepon Sekarang
                </a>
              </div>

              <div>
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email Kami</h3>
                <p className="text-gray-300 mb-4">
                  Kirim pertanyaan Anda melalui email
                </p>
                <a
                  href="mailto:halo@kliniku.com"
                  className="inline-block bg-[#FF6B35] hover:bg-[#ff5722] text-white px-6 py-3 rounded-full transition-colors"
                >
                  Kirim Email
                </a>
              </div>

              <div>
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Kunjungi Kami</h3>
                <p className="text-gray-300 mb-4">
                  Datang langsung ke klinik kami
                </p>
                <button className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-6 py-3 rounded-full transition-colors">
                  Lihat Lokasi
                </button>
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