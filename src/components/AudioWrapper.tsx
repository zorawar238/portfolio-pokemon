'use client';

import { useEffect, useState, useRef } from 'react';
import { playHoverSound, playClickSound, initAudio, playBackgroundMusic, toggleBackgroundMusic } from '@/utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioWrapper({ children }: { children: React.ReactNode }) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const startedMusic = useRef(false);

  useEffect(() => {
    // A quick hack to allow audio after first interaction
    const handleFirstInteraction = () => {
      initAudio();
      
      if (!startedMusic.current) {
        startedMusic.current = true;
        playBackgroundMusic();
        setIsMusicPlaying(true);
      }

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

  const handleToggleMusic = () => {
    toggleBackgroundMusic();
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <>
      {children}
      
      {/* Background Music Toggle Button */}
      <button
        onClick={handleToggleMusic}
        className="fixed bottom-6 right-6 z-[9999] p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-black/60 transition-all group flex items-center justify-center cursor-pointer"
        aria-label="Toggle Background Music"
      >
        {isMusicPlaying ? (
          <Volume2 className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
        ) : (
          <VolumeX className="w-6 h-6 text-white/70" />
        )}
      </button>
    </>
  );
}
