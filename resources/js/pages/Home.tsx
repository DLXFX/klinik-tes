import { Header } from '../components/header';
import { HeroBanner } from '../components/hero-banner';
import { AboutSection } from '../components/about-section';
import { ServicesSection } from '../components/services-section';
import { WhyChooseSection } from '../components/why-choose-section';
import { CTABanner } from '../components/cta-banner';
import { StatisticsSection } from '../components/statistics-section';
import { FloatingButtons } from '../components/floating-buttons';
import { Footer } from '../components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Header />
      <main>
        <HeroBanner />
        <AboutSection />
        <ServicesSection />
        <WhyChooseSection />
        <CTABanner />
        <StatisticsSection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}