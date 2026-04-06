import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { 
  LayoutDashboard, Users, Calendar, LogOut, User, CreditCard, 
  FileText, Check, X, Clock, CheckCircle, XCircle, AlertCircle, 
  Heart, Phone, MapPin, Eye, Trash2, Plus, Stethoscope
} from 'lucide-react';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [patientTab, setPatientTab] = useState('pending');
  const [pendingList, setPendingList] = useState<any[]>([]);
  const [approvedList, setApprovedList] = useState<any[]>([]);
  const [reservationList, setReservationList] = useState<any[]>([]);
  const [selectedKTP, setSelectedKTP] = useState<string | null>(null);

  // ================= STATE KHUSUS DOKTER =================
  const [doctorList, setDoctorList] = useState<any[]>([]);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '', specialization: '', experience: '', education: '', image: ''
  });

  // State Khusus Untuk Memecah Input Jadwal agar tidak Typo
  const [scheduleStartDay, setScheduleStartDay] = useState('Senin');
  const [scheduleEndDay, setScheduleEndDay] = useState('Jumat');
  const [scheduleStartTime, setScheduleStartTime] = useState('08:00');
  const [scheduleEndTime, setScheduleEndTime] = useState('15:00');

  const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  useEffect(() => {
    // Fetch Pasien
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => {
        setPendingList(data.filter((p:any) => p.status === 'pending'));
        setApprovedList(data.filter((p:any) => p.status === 'approved'));
      });

    // Fetch Reservasi
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        setReservationList(data);
      });

    // Fetch Dokter
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        setDoctorList(data);
      });
  }, []);

  // ================= FUNGSI KELOLA DOKTER =================
  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Gabungkan jadwal otomatis
      const finalSchedule = `${scheduleStartDay} - ${scheduleEndDay} ${scheduleStartTime} - ${scheduleEndTime}`;
      
      const payload = {
        ...newDoctor,
        schedule: finalSchedule
      };

      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        alert('Dokter berhasil ditambahkan!');
        setShowAddDoctor(false);
        // Reset Form
        setNewDoctor({ name: '', specialization: '', experience: '', education: '', image: '' });
        setScheduleStartDay('Senin'); setScheduleEndDay('Jumat'); setScheduleStartTime('08:00'); setScheduleEndTime('15:00');
        // Refresh daftar dokter
        fetch('/api/doctors').then(r => r.json()).then(d => setDoctorList(d));
      } else {
        alert('Gagal menambahkan dokter');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    if (!confirm('Yakin ingin menghapus dokter ini dari sistem?')) return;
    
    try {
      const res = await fetch(`/api/doctors/${id}`, { 
        method: 'DELETE',
        headers: { 
          'Accept': 'application/json' // Wajib agar Laravel membalas dengan JSON
        }
      });
      
      if (res.ok) {
        alert('Dokter berhasil dihapus!');
        // Refresh daftar dokter
        fetch('/api/doctors').then(r => r.json()).then(d => setDoctorList(d));
      } else {
        // Jika gagal, tangkap pesan error dari Laravel
        const errorData = await res.json();
        alert('Gagal menghapus: ' + (errorData.message || res.statusText));
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan/server.');
    }
  };

  // ================= FUNGSI PASIEN & RESERVASI =================
  const handleApprovePatient = async (id:number) => {
    await fetch(`/api/patients/${id}/approve`,{
      method:'POST'
    });

    const res = await fetch('/api/patients');
    const data = await res.json();

    setPendingList(data.filter((p:any)=>p.status==='pending'));
    setApprovedList(data.filter((p:any)=>p.status==='approved'));
  };

  const handleRejectPatient = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menolak pendaftaran ini?')) {
      try {
        const response = await fetch(`/api/patients/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPendingList(prev => prev.filter((p: any) => p.id !== id));
          alert('Pendaftaran berhasil ditolak dan data dihapus.');
        } else {
          alert('Gagal menghapus data di server.');
        }
      } catch (error) {
        console.error("Error:", error);
        alert('Terjadi kesalahan koneksi.');
      }
    }
  };

  const handleDeletePatient = async (id: number) => {
    if (!confirm('Yakin ingin menghapus data pasien ini secara permanen?')) return;

    try {
      await fetch(`/api/patients/${id}`, {
        method: 'DELETE'
      });
      setApprovedList(prev => prev.filter((p:any) => p.id !== id));
      setPendingList(prev => prev.filter((p:any) => p.id !== id));
    } catch (error) {
      alert('Gagal menghapus pasien');
      console.error(error);
    }
  };

  const handleUpdateStatus = async (id:number,newStatus:string) => {
    await fetch(`/api/appointments/${id}/status`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        status:newStatus
      })
    })
    
    const res = await fetch('/api/appointments')
    const data = await res.json()
    setReservationList(data)
  };

  const handleDeleteReservation = async (id:number)=>{
    if(confirm('Yakin ingin menghapus jadwal reservasi ini dari sistem?')){
      await fetch(`/api/appointments/${id}`,{
        method:'DELETE'
      })
      const res = await fetch('/api/appointments')
      const data = await res.json()
      setReservationList(data)
    }
  };

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

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = reservationList.filter(
    (r:any) => r.appointment_date === today
  ).length;

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
          <button onClick={() => setCurrentView('doctors')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === 'doctors' ? 'bg-emerald-500 text-white shadow-lg font-bold' : 'text-gray-300 hover:bg-white/10'}`}>
            <Stethoscope className="w-5 h-5" /> Kelola Dokter
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{approvedList.length}</span>
                </div>
                <h3 className="text-gray-800 font-bold text-sm">Pasien Terdaftar</h3>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{doctorList.length}</span>
                </div>
                <h3 className="text-gray-800 font-bold text-sm">Dokter Aktif</h3>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{pendingList.length}</span>
                </div>
                <h3 className="text-gray-800 font-bold text-sm">Butuh Persetujuan</h3>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{todayAppointments}</span>
                </div>
                <h3 className="text-gray-800 font-bold text-sm">Janji Temu Hari Ini</h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[#0B2447] mb-4">Aksi Cepat</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button onClick={() => setCurrentView('patients')} className="flex items-center gap-4 p-5 border-2 border-gray-100 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left">
                  <Users className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="font-bold text-gray-900">Data Pasien</p>
                    <p className="text-xs text-gray-600">Kelola pendaftaran</p>
                  </div>
                </button>
                <button onClick={() => setCurrentView('doctors')} className="flex items-center gap-4 p-5 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                  <Stethoscope className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900">Data Dokter</p>
                    <p className="text-xs text-gray-600">Tambah dokter baru</p>
                  </div>
                </button>
                <button onClick={() => setCurrentView('reservations')} className="flex items-center gap-4 p-5 border-2 border-gray-100 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left">
                  <Calendar className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="font-bold text-gray-900">Jadwal Reservasi</p>
                    <p className="text-xs text-gray-600">Update status janji</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== VIEW: KELOLA DOKTER ===================== */}
        {currentView === 'doctors' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-[#0B2447]">Kelola Dokter</h2>
                    <p className="text-gray-600">Tambah atau hapus dokter dari sistem.</p>
                </div>
                <button onClick={() => setShowAddDoctor(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all">
                    <Plus className="w-5 h-5" /> Tambah Dokter Baru
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b-2 border-gray-100">
                            <tr>
                                <th className="py-4 px-6 font-bold text-gray-800">Nama Dokter</th>
                                <th className="py-4 px-6 font-bold text-gray-800">Layanan/Spesialis</th>
                                <th className="py-4 px-6 font-bold text-gray-800">Jadwal Praktik</th>
                                <th className="py-4 px-6 font-bold text-center text-gray-800">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {doctorList.map((d) => (
                                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 font-bold text-gray-900 flex items-center gap-3">
                                        <img src={d.image} alt={d.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm" />
                                        {d.name}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                                          {d.specialization}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600 text-sm">{d.schedule}</td>
                                    <td className="py-4 px-6 text-center">
                                        <button onClick={() => handleDeleteDoctor(d.id)} className="text-red-500 hover:text-white hover:bg-red-500 border border-red-200 p-2 rounded-full transition-all" title="Hapus Dokter">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {doctorList.length === 0 && (
                              <tr><td colSpan={4} className="text-center py-8 text-gray-500">Belum ada data dokter.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Tambah Dokter */}
            {showAddDoctor && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-[#0B2447]">Form Dokter Baru</h3>
                            <button onClick={() => setShowAddDoctor(false)} className="text-gray-400 hover:text-red-500 bg-gray-100 p-2 rounded-full"><X className="w-5 h-5"/></button>
                        </div>
                        <form onSubmit={handleAddDoctor} className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-[#0B2447] mb-1">Nama Lengkap & Gelar <span className="text-red-500">*</span></label>
                              <input type="text" placeholder="Contoh: Dr. John Doe, Sp.A" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-gray-900 bg-white" required value={newDoctor.name} onChange={e => setNewDoctor({...newDoctor, name: e.target.value})} />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-[#0B2447] mb-1">Spesialisasi / Layanan <span className="text-red-500">*</span></label>
                              <input type="text" placeholder="Contoh: Dokter Umum" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-gray-900 bg-white" required value={newDoctor.specialization} onChange={e => setNewDoctor({...newDoctor, specialization: e.target.value})} />
                              <p className="text-xs text-gray-500 mt-1">*Pastikan penulisan sama (contoh: "Dokter Umum") agar tergabung di opsi yang sama pada saat buat janji.</p>
                            </div>

                            {/* PERBAIKAN: Input Jadwal Praktik Dipecah */}
                            <div>
                              <label className="block text-sm font-semibold text-[#0B2447] mb-2">Jadwal Praktik <span className="text-red-500">*</span></label>
                              
                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Hari Mulai</label>
                                  <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-gray-900 bg-white" value={scheduleStartDay} onChange={e => setScheduleStartDay(e.target.value)}>
                                    {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Hari Selesai</label>
                                  <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-gray-900 bg-white" value={scheduleEndDay} onChange={e => setScheduleEndDay(e.target.value)}>
                                    {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Jam Buka</label>
                                  <input type="time" required className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-gray-900 bg-white" value={scheduleStartTime} onChange={e => setScheduleStartTime(e.target.value)} />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Jam Tutup</label>
                                  <input type="time" required className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-gray-900 bg-white" value={scheduleEndTime} onChange={e => setScheduleEndTime(e.target.value)} />
                                </div>
                              </div>

                              <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                <p className="text-xs text-emerald-800">
                                  <strong>Hasil Jadwal: </strong> 
                                  {scheduleStartDay} - {scheduleEndDay} {scheduleStartTime} - {scheduleEndTime}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-[#0B2447] mb-1">Lama Pengalaman</label>
                                <input type="text" placeholder="Contoh: 5 Tahun" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-gray-900 bg-white" value={newDoctor.experience} onChange={e => setNewDoctor({...newDoctor, experience: e.target.value})} />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-[#0B2447] mb-1">Lulusan Universitas</label>
                                <input type="text" placeholder="Contoh: Universitas Indonesia" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-gray-900 bg-white" value={newDoctor.education} onChange={e => setNewDoctor({...newDoctor, education: e.target.value})} />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-[#0B2447] mb-1">Link Foto Dokter (Opsional)</label>
                              <input type="url" placeholder="Contoh: https://images.unsplash.com/..." className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-gray-900 bg-white" value={newDoctor.image} onChange={e => setNewDoctor({...newDoctor, image: e.target.value})} />
                              <p className="text-xs text-gray-500 mt-1">Gunakan link gambar (URL). Kosongkan untuk menggunakan gambar default.</p>
                            </div>

                            <button type="submit" className="w-full bg-[#0B2447] hover:bg-[#0B2447]/90 text-white py-4 rounded-full font-bold shadow-lg transition-all text-lg mt-4">Simpan Data Dokter</button>
                        </form>
                    </div>
                </div>
            )}
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
                        <tbody className="divide-y divide-gray-100">
                          {pendingList.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 align-middle">
                                <p className="font-bold text-gray-900">{p.name}</p>
                                <p className="text-sm text-gray-500">{p.nik}</p>
                              </td>
                              <td className="py-4 px-4 align-middle text-gray-600">
                                {p.no_whatsapp || p.noWhatsApp || <span className="text-gray-400 italic">Kosong</span>}
                              </td>
                              <td className="py-4 px-4 align-middle text-center">
                                <button
                                  onClick={() => setSelectedKTP(`/storage/${p.foto_ktp}`)}
                                  className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all"
                                >
                                  Lihat KTP
                                </button>
                              </td>
                              <td className="py-4 px-4 align-middle">
                                <div className="flex items-center justify-center gap-3">
                                  <button onClick={() => handleApprovePatient(p.id)} className="bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-200 px-4 py-1.5 rounded-full transition-all text-sm font-bold shadow-sm">
                                    Terima
                                  </button>
                                  <button onClick={() => handleRejectPatient(p.id)} className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 px-4 py-1.5 rounded-full transition-all text-sm font-bold shadow-sm">
                                    Tolak
                                  </button>
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
                          <th className="py-3 px-4 font-bold">Nama & NIK</th>
                          <th className="py-3 px-4 font-bold">WhatsApp</th>
                          <th className="py-3 px-4 font-bold text-center">Foto KTP</th>
                          <th className="py-3 px-4 font-bold text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {approvedList.map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 align-middle">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700">
                                {p.medical_record_number || 'Belum Ada'}
                              </span>
                            </td>
                            <td className="py-4 px-4 align-middle">
                              <p className="font-bold text-gray-900">{p.name}</p>
                              <p className="text-sm text-gray-500">{p.nik}</p>
                            </td>
                            <td className="py-4 px-4 align-middle text-gray-600">
                              {p.no_whatsapp || p.noWhatsApp || <span className="text-gray-400 italic">Kosong</span>}
                            </td>
                            <td className="py-4 px-4 align-middle text-center">
                                <button
                                  onClick={() => setSelectedKTP(`/storage/${p.foto_ktp}`)}
                                  className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all"
                                >
                                  Lihat KTP
                                </button>
                            </td>
                            <td className="py-4 px-4 align-middle text-center">
                              <button onClick={() => handleDeletePatient(p.id)} className="inline-flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 px-4 py-1.5 rounded-full transition-all text-sm font-bold shadow-sm">
                                <Trash2 className="w-4 h-4" /> Hapus
                              </button>
                            </td>
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
                      <th className="py-3 px-4 font-bold">Pasien & Kontak</th>
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
                          <p className="font-bold text-gray-900">{r.patient?.name}</p>
                          <p className="text-xs font-semibold text-emerald-600">{r.patient?.medical_record_number}</p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                            <Phone className="w-3 h-3" />
                            <span>{r.no_whatsapp || 'Tidak ada WA'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-800">{r.service}</p>
                          <p className="text-sm text-gray-600">{r.doctor?.name}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-900">{r.appointment_date}</p>
                          <p className="text-sm text-gray-600">{r.appointment_time} WIB</p>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {getStatusBadge(r.status)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {r.status === 'pending' && (
                              <>
                                <button onClick={() => handleUpdateStatus(r.id, 'confirmed')} className="bg-blue-500 hover:bg-blue-600 text-white px-2.5 py-1 rounded text-xs font-bold shadow">Confirm</button>
                                <button onClick={() => handleUpdateStatus(r.id, 'cancelled')} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2.5 py-1 rounded text-xs font-bold shadow">Batal</button>
                              </>
                            )}
                            {r.status === 'confirmed' && (
                              <button onClick={() => handleUpdateStatus(r.id, 'completed')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-1 rounded text-xs font-bold shadow">Selesai</button>
                            )}
                            {(r.status === 'completed' || r.status === 'cancelled') && (
                              <span className="text-gray-400 text-xs italic flex-1 text-center">Selesai</span>
                            )}
                            
                            <button onClick={() => handleDeleteReservation(r.id)} className="bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 p-1.5 rounded transition-colors ml-1" title="Hapus Permanen">
                              <Trash2 className="w-4 h-4" />
                            </button>
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