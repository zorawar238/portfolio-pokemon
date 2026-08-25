'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { developerData } from '@/data/developer';

export default function Navigation() {
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    
    // Set initial hash
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="pointer-events-auto panel-inset bg-surface/90 backdrop-blur-sm border-panel-border border-2 px-4 py-2 rounded-lg">
          <Link href="/" className="font-bold text-lg pixel-text text-primary">
            NISHANTDEX
          </Link>
        </div>

        {/* Desktop Nav HUD */}
        <nav className="hidden md:flex gap-2 pointer-events-auto panel-inset bg-surface/90 backdrop-blur-sm border-panel-border border-2 px-4 py-2 rounded-lg">
          {['ABOUT', 'SKILLS', 'PROJECTS', 'JOURNEY', 'BADGES'].map((item) => {
            const itemHash = `#${item.toLowerCase()}`;
            const isActive = activeHash === itemHash;
            return (
              <a 
                key={item} 
                href={itemHash}
                className={`px-3 py-1 text-sm font-bold transition-colors pixel-text ${
                  isActive ? 'text-primary' : 'text-muted hover:text-primary'
                }`}
              >
                {item}
              </a>
            );
          })}
          <a 
            href={developerData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-sm font-bold text-success hover:text-primary transition-colors pixel-text ml-2 border-l-2 border-panel-border/30 pl-4"
          >
            RESUME
          </a>
        </nav>

        {/* Mobile Nav Toggle (Placeholder) */}
        <button className="md:hidden pointer-events-auto panel-inset bg-surface/90 backdrop-blur-sm border-panel-border border-2 p-2 rounded-lg text-primary pixel-text font-bold">
          MENU
        </button>
      </div>
    </header>
  );
}
