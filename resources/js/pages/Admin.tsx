import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { 
  LayoutDashboard, Users, Calendar, LogOut, User, CreditCard, 
  FileText, Check, X, Clock, CheckCircle, XCircle, AlertCircle, 
  Heart, Phone, MapPin, Eye 
} from 'lucide-react';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [patientTab, setPatientTab] = useState('pending');
  const [pendingList, setPendingList] = useState<any[]>([]);
  const [approvedList, setApprovedList] = useState<any[]>([]);
  const [reservationList, setReservationList] = useState<any[]>([]);
  const [selectedKTP, setSelectedKTP] = useState<string | null>(null);

  // Mengambil data dari localStorage saat halaman dimuat
  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem('kliniku_patients') || '[]');
    setPendingList(patients.filter((p: any) => p.status === 'pending'));
    setApprovedList(patients.filter((p: any) => p.status === 'approved'));
    setReservationList(JSON.parse(localStorage.getItem('kliniku_reservations') || '[]'));
  }, []);

  // Fungsi Terima Pasien
  const handleApprovePatient = (id: number) => {
    const patients = JSON.parse(localStorage.getItem('kliniku_patients') || '[]');
    const index = patients.findIndex((p: any) => p.id === id);
    if (index > -1) {
      const newRM = `RM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
      patients[index].status = 'approved';
      patients[index].noRM = newRM;
      localStorage.setItem('kliniku_patients', JSON.stringify(patients));
      
      setPendingList(patients.filter((p: any) => p.status === 'pending'));
      setApprovedList(patients.filter((p: any) => p.status === 'approved'));
      alert(`Pasien disetujui! No. RM: ${newRM}`);
    }
  };

  // Fungsi Tolak Pasien
  const handleRejectPatient = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menolak pendaftaran ini?')) {
      let patients = JSON.parse(localStorage.getItem('kliniku_patients') || '[]');
      patients = patients.filter((p: any) => p.id !== id);
      localStorage.setItem('kliniku_patients', JSON.stringify(patients));
      setPendingList(patients.filter((p: any) => p.status === 'pending'));
    }
  };

  // Fungsi Update Status Reservasi
  const handleUpdateStatus = (id: string, newStatus: string) => {
    const res = JSON.parse(localStorage.getItem('kliniku_reservations') || '[]');
    const index = res.findIndex((r: any) => r.id === id);
    if (index > -1) {
      res[index].status = newStatus;
      localStorage.setItem('kliniku_reservations', JSON.stringify(res));
      setReservationList(res);
    }
  };

  // Label Status Cantik
  const getStatusBadge = (status: string) => {
    const badges: any = {
      pending: { bg: 'bg-amber-100', text: 'text-amber-700', icon: <Clock className="w-3.5 h-3.5" />, label: 'Pending' },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: <CheckCircle className="w-3.5 h-3.5" />, label: 'Confirmed' },
      completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: <Check className="w-3.5 h-3.5" />, label: 'Completed' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: <XCircle className="w-3.5 h-3.5" />, label: 'Cancelled' }
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
        {badge.icon} {badge.label}
      </span>
    );
  };

  // Hitung jadwal hari ini
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = reservationList.filter(r => r.tanggal === today).length;

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Sidebar Kiri */}
      <aside className="w-64 bg-[#0B2447] text-white flex flex-col fixed h-screen shadow-2xl z-20">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg rotate-45"></div>
              <Heart className="absolute inset-0 m-auto w-6 h-6 text-white z-10" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">KliniKu</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => setCurrentView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === 'dashboard' ? 'bg-emerald-500 text-white shadow-lg font-bold' : 'text-gray-300 hover:bg-white/10'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => setCurrentView('patients')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === 'patients' ? 'bg-emerald-500 text-white shadow-lg font-bold' : 'text-gray-300 hover:bg-white/10'}`}>
            <Users className="w-5 h-5" /> Data Pasien
          </button>
          <button onClick={() => setCurrentView('reservations')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === 'reservations' ? 'bg-emerald-500 text-white shadow-lg font-bold' : 'text-gray-300 hover:bg-white/10'}`}>
            <Calendar className="w-5 h-5" /> Jadwal Reservasi
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all font-medium">
            <LogOut className="w-5 h-5" /> Ke Beranda
          </Link>
        </div>
      </aside>

      {/* Konten Utama Kanan */}
      <main className="flex-1 ml-64 p-8">
        
        {/* ===================== VIEW: DASHBOARD ===================== */}
        {currentView === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0B2447] mb-2">Dashboard Utama</h2>
              <p className="text-gray-600">Ringkasan aktivitas klinik hari ini.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Kartu 1 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{approvedList.length}</span>
                </div>
                <h3 className="text-gray-800 font-bold text-lg">Pasien Terdaftar</h3>
                <p className="text-sm text-emerald-600 mt-1">Pasien aktif di sistem</p>
              </div>

              {/* Kartu 2 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{pendingList.length}</span>
                </div>
                <h3 className="text-gray-800 font-bold text-lg">Butuh Persetujuan</h3>
                <p className="text-sm text-amber-600 mt-1">Pendaftaran baru pasien</p>
              </div>

              {/* Kartu 3 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{todayAppointments}</span>
                </div>
                <h3 className="text-gray-800 font-bold text-lg">Janji Temu Hari Ini</h3>
                <p className="text-sm text-blue-600 mt-1">Total pasien yang akan datang</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[#0B2447] mb-4">Aksi Cepat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button onClick={() => setCurrentView('patients')} className="flex items-center gap-4 p-5 border-2 border-gray-100 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left">
                  <Users className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="font-bold text-gray-900">Kelola Data Pasien</p>
                    <p className="text-sm text-gray-600">Setujui atau tolak pendaftaran baru</p>
                  </div>
                </button>
                <button onClick={() => setCurrentView('reservations')} className="flex items-center gap-4 p-5 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900">Kelola Jadwal Reservasi</p>
                    <p className="text-sm text-gray-600">Update status janji temu pasien</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== VIEW: DATA PASIEN ===================== */}
        {currentView === 'patients' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0B2447] mb-2">Data Pasien</h2>
              <p className="text-gray-600">Kelola persetujuan pendaftaran dan database pasien aktif.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button onClick={() => setPatientTab('pending')} className={`flex-1 px-6 py-4 font-bold text-lg transition-all relative ${patientTab === 'pending' ? 'text-emerald-600 bg-emerald-50/50' : 'text-gray-500 hover:bg-gray-50'}`}>
                  Menunggu Persetujuan ({pendingList.length})
                  {patientTab === 'pending' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>}
                </button>
                <button onClick={() => setPatientTab('approved')} className={`flex-1 px-6 py-4 font-bold text-lg transition-all relative ${patientTab === 'approved' ? 'text-emerald-600 bg-emerald-50/50' : 'text-gray-500 hover:bg-gray-50'}`}>
                  Pasien Terdaftar ({approvedList.length})
                  {patientTab === 'approved' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>}
                </button>
              </div>

              <div className="p-6">
                {patientTab === 'pending' && (
                  pendingList.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 font-medium">Tidak ada pendaftaran baru.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b-2 border-gray-200 text-gray-800">
                            <th className="py-3 px-4 font-bold">NIK & Nama</th>
                            <th className="py-3 px-4 font-bold">WhatsApp</th>
                            <th className="py-3 px-4 font-bold text-center">Foto KTP</th>
                            <th className="py-3 px-4 font-bold text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingList.map((p) => (
                            <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <p className="font-bold text-gray-900">{p.namaLengkap}</p>
                                <p className="text-sm text-gray-600">{p.nik}</p>
                              </td>
                              <td className="py-4 px-4 text-gray-800">{p.noWhatsApp}</td>
                              <td className="py-4 px-4 text-center">
                                <button onClick={() => setSelectedKTP(p.ktpPhoto)} className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded font-semibold text-sm hover:bg-blue-200 transition-colors">Lihat KTP</button>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button onClick={() => handleApprovePatient(p.id)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-lg transition-all text-sm font-bold shadow">Terima</button>
                                  <button onClick={() => handleRejectPatient(p.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition-all text-sm font-bold shadow">Tolak</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                )}

                {patientTab === 'approved' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b-2 border-gray-200 text-gray-800">
                          <th className="py-3 px-4 font-bold">No. RM</th>
                          <th className="py-3 px-4 font-bold">Nama Lengkap</th>
                          <th className="py-3 px-4 font-bold">NIK</th>
                          <th className="py-3 px-4 font-bold">No. WhatsApp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedList.map((p) => (
                          <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4"><span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">{p.noRM}</span></td>
                            <td className="py-4 px-4 text-gray-900 font-bold">{p.namaLengkap}</td>
                            <td className="py-4 px-4 text-gray-600">{p.nik}</td>
                            <td className="py-4 px-4 text-gray-800">{p.noWhatsApp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== VIEW: RESERVASI ===================== */}
        {currentView === 'reservations' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0B2447] mb-2">Jadwal Reservasi</h2>
              <p className="text-gray-600">Daftar semua janji temu yang masuk dari pasien.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200 text-gray-800">
                      <th className="py-3 px-4 font-bold">Pasien</th>
                      <th className="py-3 px-4 font-bold">Layanan & Dokter</th>
                      <th className="py-3 px-4 font-bold">Jadwal</th>
                      <th className="py-3 px-4 font-bold text-center">Status</th>
                      <th className="py-3 px-4 font-bold text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservationList.length === 0 && (
                      <tr><td colSpan={5} className="text-center py-8 text-gray-500">Belum ada reservasi.</td></tr>
                    )}
                    {reservationList.map((r) => (
                      <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-900">{r.nama}</p>
                          <p className="text-xs font-semibold text-emerald-600">{r.noRM}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-800">{r.layanan}</p>
                          <p className="text-sm text-gray-600">{r.dokter}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-900">{r.tanggal}</p>
                          <p className="text-sm text-gray-600">{r.waktu} WIB</p>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {getStatusBadge(r.status)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            {r.status === 'pending' && (
                              <>
                                <button onClick={() => handleUpdateStatus(r.id, 'confirmed')} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold shadow">Confirm</button>
                                <button onClick={() => handleUpdateStatus(r.id, 'cancelled')} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-bold shadow">Batal</button>
                              </>
                            )}
                            {r.status === 'confirmed' && (
                              <button onClick={() => handleUpdateStatus(r.id, 'completed')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-xs font-bold shadow">Selesai</button>
                            )}
                            {(r.status === 'completed' || r.status === 'cancelled') && (
                              <span className="text-gray-400 text-xs italic">Selesai</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Lihat Foto KTP */}
      {selectedKTP && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setSelectedKTP(null)}>
          <div className="bg-white rounded-2xl p-4 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl text-gray-900">Foto KTP Pasien</h3>
              <button onClick={() => setSelectedKTP(null)} className="text-gray-500 hover:text-red-500"><X className="w-6 h-6" /></button>
            </div>
            <img src={selectedKTP} alt="KTP" className="w-full rounded-lg border-2 border-gray-200 shadow-inner" />
          </div>
        </div>
      )}

    </div>
  );
}