import { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Bottom Left - Contact Buttons */}
      <div className="fixed bottom-8 left-8 flex flex-col gap-3 z-40">
        {/* WhatsApp */}
        

        {/* Phone */}
        
      </div>

      {/* Bottom Right - Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#FF6B35] hover:bg-[#ff5722] flex items-center justify-center shadow-lg transition-all z-40 animate-fade-in"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      )}
    </>
  );
}
