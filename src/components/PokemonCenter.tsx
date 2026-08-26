'use client';
import { developerData } from '@/data/developer';

export default function PokemonCenter({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-black/80 flex items-center justify-center p-4 md:p-8 z-50 overflow-hidden pointer-events-auto">
      <div className="w-full max-w-4xl h-full max-h-[600px] flex flex-col gap-4 relative">
        
        {/* Top: Pokemon Center Interior */}
        <div className="flex-1 panel bg-[#FFDAB9] relative overflow-hidden flex flex-col items-center justify-center pixel-border">
          <img src="/assets/pc_interior.jpg" alt="Pokemon Center Interior" className="absolute inset-0 w-full h-full object-cover z-0" style={{ imageRendering: 'pixelated' }} />
        </div>

        {/* Bottom: Dialogue and Actions */}
        <div className="panel bg-background pixel-border flex flex-col p-6 min-h-[160px] relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white bg-error hover:bg-error/80 px-3 py-1 rounded-sm border-2 border-panel-border shadow-sm z-50 pixel-text text-sm transition-colors">X</button>
          
          <h2 className="pixel-text text-primary mb-2">JOURNEY COMPLETE!</h2>
          <p className="font-sans text-text md:text-lg mb-6 leading-relaxed">
            Thank you for exploring my portfolio. I'm currently <strong>{developerData.status.toLowerCase()}</strong>. Let's build something amazing together!
          </p>
          
          <div className="flex flex-wrap gap-4 mt-auto">
            <a href={`mailto:${developerData.contact.email}`} className="panel-interactive flex-1 text-center py-3 bg-primary text-white font-bold pixel-text border-b-4 border-[#8b0000] active:border-b-0 active:translate-y-1">
              EMAIL ME
            </a>
            <a href={`tel:${developerData.contact.phone}`} className="panel-interactive flex-1 text-center py-3 bg-accent text-black font-bold pixel-text border-b-4 border-[#a67c00] active:border-b-0 active:translate-y-1">
              CALL ME
            </a>
            <a href={developerData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="panel-interactive flex-1 text-center py-3 bg-secondary text-white font-bold pixel-text border-b-4 border-[#1a365d] active:border-b-0 active:translate-y-1">
              LINKEDIN
            </a>
            <a href={developerData.contact.github} target="_blank" rel="noopener noreferrer" className="panel-interactive flex-1 text-center py-3 bg-[#333] text-white font-bold pixel-text border-b-4 border-[#111] active:border-b-0 active:translate-y-1">
              GITHUB
            </a>
            <a href={developerData.resumeUrl} target="_blank" rel="noopener noreferrer" className="panel-interactive flex-1 text-center py-3 bg-success text-white font-bold pixel-text border-b-4 border-[#306230] active:border-b-0 active:translate-y-1">
              RESUME
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
