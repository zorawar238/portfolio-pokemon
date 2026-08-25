'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Intro/Preloader';
import { developerData } from '@/data/developer';
import AboutSection from '@/components/AboutSection';
import SkillDex from '@/components/SkillDex';
import ProjectDex from '@/components/ProjectDex';
import JourneyBadges from '@/components/JourneyBadges';
import PokemonCenter from '@/components/PokemonCenter';
import WorldMap from '@/components/world/WorldMap';
import ScreenWipe from '@/components/ui/ScreenWipe';

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [pendingOverlay, setPendingOverlay] = useState<string | null>(null);
  const [isWiping, setIsWiping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLocationClick = (location: string | null) => {
    if (location) {
      window.location.hash = location;
    } else {
      window.history.pushState(null, '', window.location.pathname);
      // Manually trigger hashchange logic since pushing state doesn't fire the event
      if (activeOverlay !== null) {
        setPendingOverlay(null);
        setIsWiping(true);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  useEffect(() => {
    if (!introFinished) return;

    const ctx = gsap.context(() => {
      // Reveal sections as you scroll down
      const sections = gsap.utils.toArray('section');
      
      sections.forEach((section: any) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [introFinished]);

  // Listen to hash changes for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (['about', 'skills', 'projects', 'journey', 'contact'].includes(hash)) {
        if (activeOverlay !== hash) {
           setPendingOverlay(hash);
           setIsWiping(true);
        }
      } else if (hash === 'intro' || hash === '') {
        if (activeOverlay !== null) {
           setPendingOverlay(null);
           setIsWiping(true);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Handle initial hash on load if intro is finished
    if (introFinished) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeOverlay, introFinished]);

  return (
    <div ref={containerRef}>
      {!introFinished && <Preloader onComplete={() => setIntroFinished(true)} />}
      
      {/* Main Content - Only visible after intro finishes or skips */}
      <div className={`transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        
        {isWiping && (
          <ScreenWipe 
            onHalfway={() => setActiveOverlay(pendingOverlay)}
            onComplete={() => setIsWiping(false)}
          />
        )}

        <WorldMap onLocationClick={handleLocationClick}>
          {/* Overlays */}
          {activeOverlay === 'about' && <AboutSection onClose={() => handleLocationClick(null)} />}
          {activeOverlay === 'skills' && <SkillDex onClose={() => handleLocationClick(null)} />}
          {activeOverlay === 'projects' && <ProjectDex onClose={() => handleLocationClick(null)} />}
          {activeOverlay === 'journey' && <JourneyBadges onClose={() => handleLocationClick(null)} />}
          {activeOverlay === 'contact' && <PokemonCenter onClose={() => handleLocationClick(null)} />}
        </WorldMap>

      </div>
    </div>
  );
}
