import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { FloatingButtons } from '../components/floating-buttons';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const articles = [
    {
      title: 'Tips Menjaga Kesehatan di Musim Hujan',
      excerpt: 'Musim hujan telah tiba, dan ini adalah waktu yang tepat untuk meningkatkan kewaspadaan terhadap berbagai penyakit. Berikut adalah tips praktis untuk menjaga kesehatan Anda dan keluarga...',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlueSUyMHdlYXRoZXIlMjBoZWFsdGh8ZW58MXx8fHwxNzQwMjcwMDAwfDA&ixlib=rb-4.1.0&q=80&w=800',
      date: '15 Februari 2026',
      author: 'Dr. Andi Wijaya',
      category: 'Tips Kesehatan'
    },
    {
      title: 'Pentingnya Cek Gigi Rutin untuk Kesehatan Mulut',
      excerpt: 'Kesehatan gigi dan mulut sering diabaikan, padahal memiliki dampak besar terhadap kesehatan tubuh secara keseluruhan. Artikel ini membahas mengapa pemeriksaan gigi rutin sangat penting...',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjaGVja3VwfGVufDF8fHx8MTc0MDI3MDAwMHww&ixlib=rb-4.1.0&q=80&w=800',
      date: '10 Februari 2026',
      author: 'Dr. Budi Santoso',
      category: 'Kesehatan Gigi'
    },
    {
      title: 'Vaksinasi Anak: Jadwal dan Manfaatnya',
      excerpt: 'Vaksinasi adalah salah satu cara terbaik melindungi anak dari berbagai penyakit berbahaya. Kenali jadwal vaksinasi lengkap dan manfaat setiap jenis vaksin untuk si kecil...',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHZhY2NpbmF0aW9ufGVufDF8fHx8MTc0MDI3MDAwMHww&ixlib=rb-4.1.0&q=80&w=800',
      date: '5 Februari 2026',
      author: 'Dr. Citra Dewi',
      category: 'Kesehatan Anak'
    },
    {
      title: 'Pola Makan Sehat untuk Jantung yang Kuat',
      excerpt: 'Kesehatan jantung dimulai dari piring makan Anda. Pelajari pola makan yang tepat, makanan yang harus dikonsumsi, dan yang sebaiknya dihindari untuk menjaga kesehatan jantung...',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGhlYXJ0fGVufDF8fHx8MTc0MDI3MDAwMHww&ixlib=rb-4.1.0&q=80&w=800',
      date: '1 Februari 2026',
      author: 'Dr. Eko Prasetyo',
      category: 'Kesehatan Jantung'
    },
    {
      title: 'Olahraga Ringan untuk Meningkatkan Imunitas',
      excerpt: 'Tidak perlu olahraga berat untuk meningkatkan sistem imun tubuh. Temukan berbagai pilihan olahraga ringan yang bisa dilakukan di rumah dan manfaatnya bagi kesehatan Anda...',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzQwMjcwMDAwfDA&ixlib=rb-4.1.0&q=80&w=800',
      date: '28 Januari 2026',
      author: 'Dr. Gani Wijaksana',
      category: 'Gaya Hidup Sehat'
    },
    {
      title: 'Mengenal Gejala Diabetes dan Cara Pencegahannya',
      excerpt: 'Diabetes adalah penyakit yang dapat dicegah dengan gaya hidup sehat. Pelajari gejala awal diabetes dan langkah-langkah pencegahan yang efektif untuk mengurangi risiko...',
      image: 'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFiZXRlcyUyMGJsb29kJTIwc3VnYXJ8ZW58MXx8fHwxNzQwMjcwMDAwfDA&ixlib=rb-4.1.0&q=80&w=800',
      date: '22 Januari 2026',
      author: 'Dr. Andi Wijaya',
      category: 'Penyakit & Pencegahan'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Header />
      
      <main className="flex-grow mt-[72px]">
        {/* Page Title Header */}
        <section className="bg-gradient-to-r from-[#0B2447]/5 to-[#0B2447]/10 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-[#0B2447] mb-4">
              Artikel Kesehatan & Berita
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Dapatkan informasi terkini seputar kesehatan, tips medis, dan berita dari KliniKu untuk membantu Anda menjalani gaya hidup yang lebih sehat.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-r from-[#0B2447] to-[#0B2447]/90 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2">
                <div className="aspect-[4/3] relative">
                  <ImageWithFallback
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 flex flex-col justify-center text-white">
                  <div className="text-emerald-400 font-semibold mb-3">
                    {articles[0].category}
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    {articles[0].title}
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {articles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{articles[0].date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{articles[0].author}</span>
                    </div>
                  </div>
                  <button className="self-start bg-[#FF6B35] hover:bg-[#ff5722] text-white px-8 py-3 rounded-full transition-colors flex items-center gap-2">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B2447] mb-4">
                Artikel Terbaru
              </h2>
              <p className="text-gray-600">
                Jelajahi koleksi artikel kesehatan kami untuk informasi medis terpercaya
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article, index) => (
                <article
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0B2447] mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <button className="text-[#FF6B35] hover:text-[#ff5722] font-semibold flex items-center gap-2 group">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-[#0B2447]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Berlangganan Newsletter Kesehatan
            </h2>
            <p className="text-gray-300 mb-8">
              Dapatkan tips kesehatan, artikel terbaru, dan informasi promo langsung ke email Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-[#FF6B35] hover:bg-[#ff5722] text-white px-8 py-4 rounded-full transition-colors whitespace-nowrap">
                Berlangganan
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}