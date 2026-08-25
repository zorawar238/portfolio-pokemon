'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [skip, setSkip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (skip || prefersReducedMotion) {
      if (containerRef.current) {
        gsap.to(containerRef.current, { opacity: 0, duration: 0.3, onComplete });
      } else {
        onComplete();
      }
      return;
    }
    
    // Simple GSAP animation
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, { opacity: 0, duration: 0.5, onComplete });
      }
    });

    tl.to('.preloader-logo', { opacity: 1, duration: 1, y: 0, ease: 'power2.out' })
      .to('.pokeball', { rotation: 360, duration: 1, ease: 'power1.inOut' }, '<')
      .to('.preloader-logo', { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut' }, '+=0.5');

    return () => {
      tl.kill();
    };
  }, [skip, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center pointer-events-auto">
      <div className="preloader-logo opacity-0 translate-y-4 flex flex-col items-center">
        <div className="pokeball w-20 h-20 rounded-full border-4 border-panel-border bg-white mb-8 relative overflow-hidden flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
            <div className="absolute top-0 w-full h-1/2 bg-primary"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-white"></div>
            <div className="absolute w-full h-[4px] bg-panel-border z-10"></div>
            <div className="absolute w-6 h-6 rounded-full bg-white border-4 border-panel-border z-20"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold pixel-text text-primary drop-shadow-[2px_2px_0px_rgba(29,53,87,1)]">NISHANTDEX</h1>
        <p className="mt-4 text-muted pixel-text text-sm animate-pulse">Press start...</p>
      </div>
      <button 
        onClick={() => setSkip(true)}
        className="absolute bottom-8 md:bottom-12 panel-interactive px-6 py-2 text-sm pixel-text bg-surface"
      >
        SKIP INTRO
      </button>
    </div>
  );
}
