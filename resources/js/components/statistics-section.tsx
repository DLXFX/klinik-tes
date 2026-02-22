import { Users, Stethoscope, Calendar, Building2 } from 'lucide-react';

export function StatisticsSection() {
  const stats = [
    {
      icon: Users,
      number: '15.000+',
      label: 'Pasien Terlayani',
    },
    {
      icon: Stethoscope,
      number: '50+',
      label: 'Dokter & Spesialis',
    },
    {
      icon: Calendar,
      number: '10+',
      label: 'Tahun Pengalaman',
    },
    {
      icon: Building2,
      number: '5',
      label: 'Cabang Klinik',
    },
  ];

  return (
    <section className="relative -mt-16 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0B2447]/5 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-[#0B2447]" />
                </div>
                <div className="text-4xl font-bold text-[#0B2447] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
