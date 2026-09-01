'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [skip, setSkip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const centerButtonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (skip || prefersReducedMotion) {
      const splitTl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
          onComplete();
        }
      });
      
      splitTl.to(centerButtonRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)' })
             .to(contentRef.current, { opacity: 0, duration: 0.2 }, '<')
             .to(skipBtnRef.current, { opacity: 0, duration: 0.2 }, '<')
             .to(topHalfRef.current, { yPercent: -100, duration: 0.8, ease: 'power2.inOut' }, '+=0.1')
             .to(bottomHalfRef.current, { yPercent: 100, duration: 0.8, ease: 'power2.inOut' }, '<')
             .to(containerRef.current, { backgroundColor: 'transparent', duration: 0 }, '<');
      return;
    }
    
    // Animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // After the intro animation finishes, split the pokeball
        const splitTl = gsap.timeline({
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
            onComplete();
          }
        });
        
        splitTl.to(centerButtonRef.current, { scale: 0, opacity: 0, duration: 0.4, ease: 'back.in(1.7)' })
               .to(contentRef.current, { opacity: 0, duration: 0.3 }, '<')
               .to(skipBtnRef.current, { opacity: 0, duration: 0.2 }, '<')
               .to(topHalfRef.current, { yPercent: -100, duration: 0.8, ease: 'power2.inOut' }, '+=0.1')
               .to(bottomHalfRef.current, { yPercent: 100, duration: 0.8, ease: 'power2.inOut' }, '<')
               .to(containerRef.current, { backgroundColor: 'transparent', duration: 0 }, '<');
      }
    });

    // Intro animation
    tl.to(contentRef.current, { opacity: 1, duration: 1, y: 0, ease: 'power2.out' })
      .to(centerButtonRef.current, { rotation: 360, duration: 1, ease: 'power1.inOut' }, '<')
      .to(contentRef.current, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut' }, '+=0.5');

    return () => {
      tl.kill();
    };
  }, [skip, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-auto bg-background overflow-hidden">
      
      {/* Top Half of Pokeball */}
      <div 
        ref={topHalfRef} 
        className="absolute top-0 left-0 w-full h-1/2 bg-primary border-b-[4px] md:border-b-[8px] border-panel-border z-10"
      />
      
      {/* Bottom Half of Pokeball */}
      <div 
        ref={bottomHalfRef} 
        className="absolute bottom-0 left-0 w-full h-1/2 bg-white border-t-[4px] md:border-t-[8px] border-panel-border z-10"
      />
      
      {/* Center Button */}
      <div 
        ref={centerButtonRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-white border-[6px] md:border-[8px] border-panel-border rounded-full flex items-center justify-center z-20 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      >
        <div className="w-10 h-10 md:w-14 md:h-14 border-[4px] border-panel-border rounded-full flex items-center justify-center">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-white border-[2px] border-panel-border rounded-full animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="preloader-content opacity-0 translate-y-4 flex flex-col items-center z-30 mb-48 md:mb-64">
        <h1 className="text-4xl md:text-5xl font-bold pixel-text text-white drop-shadow-[4px_4px_0px_rgba(29,53,87,1)]">NISHANTDEX</h1>
        <p className="mt-6 text-white pixel-text text-sm animate-pulse bg-panel-border px-4 py-2 rounded-full shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">Press start...</p>
      </div>

      <button 
        ref={skipBtnRef}
        onClick={() => setSkip(true)}
        className="absolute bottom-8 md:bottom-12 panel-interactive px-6 py-2 text-sm pixel-text bg-surface z-30"
      >
        SKIP INTRO
      </button>
    </div>
  );
}
