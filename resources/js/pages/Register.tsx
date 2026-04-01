import { useState, useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import { Heart, User, Lock, Phone, MapPin, Calendar, Upload, X, CheckCircle, Eye, EyeOff, CreditCard, AlertCircle } from 'lucide-react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [nikError, setNikError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nik: '', namaLengkap: '', tanggalLahir: '', alamat: '', noWhatsApp: '', password: '', confirmPassword: '',
  });

  const handleNIKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setFormData({ ...formData, nik: value });
      if (value.length > 0 && value.length !== 16) setNikError('NIK harus terdiri dari 16 digit');
      else setNikError('');
    }
  };

  const handleFileSelect = (file: File) => {
    setKtpFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setKtpPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.nik.length !== 16) {
    setNikError('NIK harus terdiri dari 16 digit');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert('Password tidak cocok!');
    return;
  }

  if (!ktpFile) {
    alert('Silakan upload foto KTP Anda');
    return;
  }

  const data = new FormData();

  data.append("nik", formData.nik);
  data.append("name", formData.namaLengkap);
  data.append("email", formData.nik + "@pasien.com");
  data.append("password", formData.password);
  data.append("medical_record_number", "");
  data.append("foto_ktp", ktpFile); // KTP

  try {
    const res = await fetch("http://127.0.0.1:8000/api/patients", {
      method: "POST",
      body: data
    });

    if (!res.ok) {
      throw new Error("Register gagal");
    }

    setShowSuccessModal(true);

  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mendaftar");
  }
};
    // LOGIC: Simpan ke localStorage

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg rotate-45"></div>
              <Heart className="absolute inset-0 m-auto w-6 h-6 text-white z-10" fill="white" />
            </div>
            <span className="text-2xl font-bold text-[#0B2447]">KliniKu</span>
          </Link>
          <div className="text-sm text-gray-600">
            Sudah punya akun? <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">Masuk</Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B2447] mb-2">Daftar Akun Pasien Baru</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#0B2447] mb-2">NIK <span className="text-red-500">*</span></label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" value={formData.nik} onChange={handleNIKChange} placeholder="Masukkan 16 digit NIK" className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0B2447] mb-2">Upload KTP <span className="text-red-500">*</span></label>
              {!ktpPreview ? (
                <input type="file" accept="image/*" onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])} className="w-full text-gray-900 border p-3 rounded" required />
              ) : (
                <p className="text-emerald-600 font-bold">✓ KTP Terupload</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0B2447] mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
              <input type="text" value={formData.namaLengkap} onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })} className="w-full px-4 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0B2447] mb-2">Tanggal Lahir <span className="text-red-500">*</span></label>
              <input type="date" value={formData.tanggalLahir} onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })} className="w-full px-4 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0B2447] mb-2">Password <span className="text-red-500">*</span></label>
              <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0B2447] mb-2">Konfirmasi Password <span className="text-red-500">*</span></label>
              <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full px-4 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none" required />
            </div>
            <button type="submit" className="w-full bg-[#0B2447] hover:bg-[#0B2447]/90 text-white py-4 rounded-full font-semibold">Daftar Sekarang</button>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
            <h2 className="text-2xl font-bold text-[#0B2447] mb-3">Pendaftaran Berhasil!</h2>
            <p className="mb-6 text-gray-700">Akun Anda sedang menunggu persetujuan Admin.</p>
            <Link href="/login" className="block w-full bg-[#0B2447] text-white py-3 rounded-full font-semibold">Ke Halaman Login</Link>
          </div>
        </div>
      )}
    </div>
  );
}