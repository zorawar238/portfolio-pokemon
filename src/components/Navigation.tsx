'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { developerData } from '@/data/developer';

const NAV_ITEMS = ['ABOUT', 'SKILLS', 'PROJECTS', 'JOURNEY', 'CONTACT'];

export default function Navigation() {
  const [activeHash, setActiveHash] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
      setMobileMenuOpen(false);
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
          {NAV_ITEMS.map((item) => {
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

        {/* Mobile Nav Toggle */}
        <div className="md:hidden relative pointer-events-auto">
          <button
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="panel-inset bg-surface/90 backdrop-blur-sm border-panel-border border-2 p-2 rounded-lg text-primary pixel-text font-bold"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>

          {mobileMenuOpen && (
            <nav className="absolute right-0 top-full mt-2 flex flex-col gap-1 panel-inset bg-surface/95 backdrop-blur-sm border-panel-border border-2 px-4 py-3 rounded-lg min-w-[160px]">
              {NAV_ITEMS.map((item) => {
                const itemHash = `#${item.toLowerCase()}`;
                const isActive = activeHash === itemHash;
                return (
                  <a
                    key={item}
                    href={itemHash}
                    className={`px-2 py-1.5 text-sm font-bold transition-colors pixel-text ${
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
                className="px-2 py-1.5 text-sm font-bold text-success hover:text-primary transition-colors pixel-text mt-1 border-t-2 border-panel-border/30 pt-2"
              >
                RESUME
              </a>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
