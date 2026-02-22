import { Clock, Award, MonitorSmartphone, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function WhyChooseSection() {
  const features = [
    {
      icon: Clock,
      title: 'Pelayanan Cepat & Ramah',
      description: 'Sistem antrian digital dan pelayanan yang efisien untuk kenyamanan Anda.',
    },
    {
      icon: Award,
      title: 'Dokter Tersertifikasi',
      description: 'Tim dokter spesialis berpengalaman dengan sertifikasi nasional dan internasional.',
    },
    {
      icon: MonitorSmartphone,
      title: 'Peralatan Medis Modern',
      description: 'Teknologi medis terkini untuk diagnosis dan perawatan yang lebih akurat.',
    },
    {
      icon: Heart,
      title: 'Prioritas Kenyamanan Pasien',
      description: 'Lingkungan klinik yang bersih, nyaman, dan ramah untuk pemulihan optimal.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-gray-600 mb-2" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '20px' }}>
            Kenapa Kami Berbeda?
          </p>
          <h2 className="text-4xl font-bold text-emerald-600">
            KEUNGGULAN KLINIKU
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Left - Features */}
          <div className="md:col-span-3 grid sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B2447] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Image */}
          <div className="md:col-span-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1753487050407-8e92c66d9af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMGRvY3RvciUyMG51cnNlJTIwcHJvZmVzc2lvbmFsJTIwbWVkaWNhbCUyMHN0YWZmfGVufDF8fHx8MTc3MTc2NjczOHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Friendly medical staff"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
