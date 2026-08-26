'use client';

import { useState } from 'react';
import { developerData } from '@/data/developer';

export default function AboutSection({ onClose }: { onClose?: () => void }) {
  const [activeTab, setActiveTab] = useState<'MY STORY' | 'PHILOSOPHY' | 'CURRENT QUEST'>('MY STORY');

  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center p-4 md:p-8 z-50 overflow-hidden pointer-events-auto">
      <div className="w-full max-w-5xl bg-[#f8f0e3] rounded-lg border-4 border-[#1d3557] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-error hover:bg-error/80 px-3 py-1 rounded-sm border-2 border-panel-border shadow-sm z-50 pixel-text text-sm transition-colors">
          X
        </button>
        
        {/* Left Pane (Background + Character) */}
        <div className="w-full md:w-[45%] relative min-h-[350px] md:min-h-[500px] border-b-4 md:border-b-0 md:border-r-4 border-[#1d3557] bg-[#78c850]">
          {/* Landscape Background */}
          <div className="absolute inset-0" style={{
             backgroundImage: 'url("/assets/about_bg.jpg")',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             imageRendering: 'pixelated'
          }}></div>
          
          {/* Character Sprite */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 drop-shadow-2xl z-10 animate-bounce-slow">
            <img 
              src="/assets/character_sprite.png" 
              alt="Character" 
              className="w-full h-full object-contain filter drop-shadow-[0_10px_8px_rgba(0,0,0,0.3)]" 
              style={{ imageRendering: 'pixelated' }} 
            />
          </div>
        </div>

        {/* Right Pane (Text Box) */}
        <div className="w-full md:w-[55%] flex flex-col bg-[#f8f0e3]">
           
           {/* Header */}
           <div className="bg-[#1d3557] text-[#f8f0e3] px-6 py-4 pixel-text text-xl border-b-4 border-[#1d3557]">
             CHARACTER INFO
           </div>
           
           {/* Main Text Content */}
           <div className="p-6 md:p-8 flex-1 flex flex-col justify-center text-[#1d3557] overflow-y-auto">
             <div className="font-mono font-bold text-sm md:text-base leading-relaxed space-y-5">
                <p>
                  I am <span className="text-primary">{developerData.name}</span>, a passionate {developerData.class.toLowerCase()} focused on building interactive, premium user experiences.
                </p>
                <p>
                  This is you in the game! Use <span className="bg-[#1d3557] text-[#f8f0e3] px-1 rounded">WASD</span> or <span className="bg-[#1d3557] text-[#f8f0e3] px-1 rounded">Taps</span> to move around the world.
                </p>
                <p>
                  Interact with buildings to explore my portfolio. The Project City holds my web apps, and the Skills Lab contains my tech stack.
                </p>
             </div>
           </div>
           
           {/* Controls Legend */}
           <div className="border-t-4 border-[#1d3557] px-6 py-4 flex justify-between items-center bg-[#f0e6d2]">
              
              {/* MOVE */}
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono font-bold text-[10px] md:text-xs text-[#1d3557]">MOVE</span>
                {/* CSS D-Pad */}
                <div className="relative w-10 h-10">
                   <div className="absolute top-1/2 left-0 w-full h-3 bg-[#1d3557] -translate-y-1/2 rounded-sm shadow-md"></div>
                   <div className="absolute top-0 left-1/2 w-3 h-full bg-[#1d3557] -translate-x-1/2 rounded-sm shadow-md"></div>
                   <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>

              {/* INTERACT */}
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono font-bold text-[10px] md:text-xs text-[#1d3557]">INTERACT</span>
                <div className="w-10 h-10 rounded-full bg-[#1d3557] shadow-[0_4px_0_#0f1c2e] active:shadow-[0_0px_0_#0f1c2e] active:translate-y-1 transition-all flex items-center justify-center cursor-pointer">
                  <span className="font-mono font-bold text-white">A</span>
                </div>
              </div>

              {/* MENU */}
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono font-bold text-[10px] md:text-xs text-[#1d3557]">MENU</span>
                <a 
                  href={developerData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-[#1d3557] shadow-[0_4px_0_#0f1c2e] active:shadow-[0_0px_0_#0f1c2e] active:translate-y-1 transition-all cursor-pointer"
                >
                  <span className="font-mono font-bold text-xs text-white">RESUME</span>
                </a>
              </div>

           </div>
        </div>
        
      </div>
    </div>
  );
}
