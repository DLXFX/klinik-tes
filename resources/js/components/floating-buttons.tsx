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
        null
      )}
    </>
  );
}
