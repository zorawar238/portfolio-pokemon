'use client';

import { useEffect } from 'react';
import { playHoverSound, playClickSound, initAudio } from '@/utils/audio';

export default function AudioWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // A quick hack to allow audio after first interaction
    const handleFirstInteraction = () => {
      initAudio();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Play hover sound for buttons, links, or any interactive panel
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        playHoverSound();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        playClickSound();
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return <>{children}</>;
}
