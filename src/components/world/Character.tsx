'use client';

import { forwardRef } from 'react';

interface CharacterProps {
  direction: 'up' | 'down' | 'left' | 'right';
  isWalking: boolean;
  x?: number;
  y?: number;
  className?: string;
}

const Character = forwardRef<HTMLDivElement, CharacterProps>(
  ({ direction, isWalking, x = 50, y = 50, className = '' }, ref) => {
    // For now, we'll use CSS to draw a simple placeholder pixel character
    // until the user provides a real sprite sheet.
    
    return (
      <div 
        ref={ref} 
        className={`absolute z-30 ${className}`}
        style={{ 
          width: '48px', 
          height: '48px',
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          // smooth movement interpolation
          transition: 'left 0.1s linear, top 0.1s linear'
        }}
      >
        {/* Generated Character Sprite */}
        <div className={`w-full h-full relative ${isWalking ? 'animate-bounce' : ''}`}>
           <img 
             src="/assets/character_sprite.png" 
             alt="Character" 
             className="w-full h-full object-cover rounded-md drop-shadow-md"
             style={{ imageRendering: 'pixelated' }}
           />
           {/* Shadow */}
           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-black/40 rounded-full blur-[2px] -z-10"></div>
        </div>
      </div>
    );
  }
);

Character.displayName = 'Character';

export default Character;
