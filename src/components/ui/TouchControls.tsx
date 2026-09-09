'use client';

import { useRef, useState } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface TouchControlsProps {
  onDirectionDown: (dir: Direction) => void;
  onDirectionUp: (dir: Direction) => void;
  onInteract: () => void;
}

export default function TouchControls({ onDirectionDown, onDirectionUp, onInteract }: TouchControlsProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const [stickPos, setStickPos] = useState({ x: 0, y: 0 });
  const [activeDir, setActiveDir] = useState<Direction | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    e.preventDefault();
    if (!baseRef.current) return;
    
    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let dx = e.clientX - centerX;
    let dy = e.clientY - centerY;
    
    const maxRadius = rect.width / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > maxRadius) {
      dx = (dx / distance) * maxRadius;
      dy = (dy / distance) * maxRadius;
    }
    
    setStickPos({ x: dx, y: dy });
    
    // Determine direction
    const threshold = maxRadius * 0.25; // Deadzone
    if (distance > threshold) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      let newDir: Direction;
      if (angle > -45 && angle <= 45) newDir = 'right';
      else if (angle > 45 && angle <= 135) newDir = 'down';
      else if (angle > 135 || angle <= -135) newDir = 'left';
      else newDir = 'up';

      if (newDir !== activeDir) {
        if (activeDir) onDirectionUp(activeDir);
        setActiveDir(newDir);
        onDirectionDown(newDir);
      }
    } else {
      if (activeDir) {
        onDirectionUp(activeDir);
        setActiveDir(null);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    setStickPos({ x: 0, y: 0 });
    if (activeDir) {
      onDirectionUp(activeDir);
      setActiveDir(null);
    }
  };

  return (
    <div className="md:hidden fixed bottom-8 left-0 right-0 z-40 flex justify-between items-end px-8 pointer-events-none">
      
      {/* Transparent Joystick */}
      <div 
        ref={baseRef}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          handlePointerDown(e);
        }}
        onPointerMove={(e) => {
          if ((e.target as HTMLElement).hasPointerCapture(e.pointerId)) {
            handlePointerMove(e);
          }
        }}
        onPointerUp={(e) => {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          handlePointerUp(e);
        }}
        onPointerCancel={(e) => {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          handlePointerUp(e);
        }}
        className="relative w-32 h-32 rounded-full border-2 border-white/20 bg-black/20 backdrop-blur-sm pointer-events-auto select-none touch-none flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)]"
      >
        {/* Joystick Base Inner Ring */}
        <div className="absolute inset-2 rounded-full border border-white/10"></div>
        
        {/* Joystick Knob */}
        <div 
          className="w-14 h-14 rounded-full bg-white/40 border border-white/50 shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md transition-transform duration-75 ease-out pointer-events-none"
          style={{ transform: `translate(${stickPos.x}px, ${stickPos.y}px)` }}
        />
      </div>

      {/* Interact Button (A Button) */}
      <div className="pointer-events-auto select-none flex flex-col items-center touch-none mb-2">
        <button
          onPointerDown={(e) => { e.preventDefault(); onInteract(); }}
          aria-label="Interact"
          className="w-20 h-20 rounded-full bg-black/20 border-2 border-white/20 backdrop-blur-sm shadow-[0_4px_15px_rgba(0,0,0,0.3)] active:bg-white/30 transition-all flex items-center justify-center"
        >
          <span className="font-mono font-bold text-white/90 text-2xl drop-shadow-md">A</span>
        </button>
      </div>
    </div>
  );
}
