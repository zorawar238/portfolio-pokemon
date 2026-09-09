'use client';

import { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

export default function RotatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const checkOrientation = () => {
      // Check if device is a mobile device and in portrait mode
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const isPortrait = window.innerHeight > window.innerWidth;
      
      if (isMobile && isPortrait && !dismissed) {
        setShowPrompt(true);
      } else {
        setShowPrompt(false);
      }
    };

    // Initial check
    checkOrientation();

    // Listen for resize/orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [dismissed]);

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 pointer-events-auto transition-opacity duration-300">
      <div className="bg-surface border-4 border-panel-border p-8 rounded-lg max-w-sm w-full flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
        
        {/* Animated Icon */}
        <div className="relative mb-6">
          <div className="animate-[spin_3s_ease-in-out_infinite]">
            <Smartphone className="w-16 h-16 text-primary" />
          </div>
        </div>

        <h2 className="pixel-text text-xl text-primary mb-4 text-center">
          ROTATE DEVICE
        </h2>
        
        <p className="font-mono text-sm text-text text-center mb-8 leading-relaxed">
          For the best gaming experience, please rotate your phone horizontally (landscape mode).
        </p>

        <button 
          onClick={() => setDismissed(true)}
          className="bg-primary text-white pixel-text px-6 py-3 rounded-sm shadow-[0_4px_0_#0f1c2e] active:shadow-[0_0px_0_#0f1c2e] active:translate-y-1 transition-all text-xs"
        >
          CONTINUE ANYWAY
        </button>
      </div>
    </div>
  );
}
