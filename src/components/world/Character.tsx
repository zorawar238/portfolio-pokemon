'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { playFootstepSound } from '@/utils/audio';

interface CharacterProps {
  direction: 'up' | 'down' | 'left' | 'right';
  isWalking: boolean;
  x?: number;
  y?: number;
  className?: string;
}

// 4-frame walk cycle per direction, sliced from the hand-drawn reference sheet
const spriteFrames: Record<'up' | 'down' | 'left' | 'right', [string, string, string, string]> = {
  down: ['/assets/character_down_f1.png', '/assets/character_down_f2.png', '/assets/character_down_f3.png', '/assets/character_down_f4.png'],
  up: ['/assets/character_up_f1.png', '/assets/character_up_f2.png', '/assets/character_up_f3.png', '/assets/character_up_f4.png'],
  left: ['/assets/character_left_f1.png', '/assets/character_left_f2.png', '/assets/character_left_f3.png', '/assets/character_left_f4.png'],
  right: ['/assets/character_right_f1.png', '/assets/character_right_f2.png', '/assets/character_right_f3.png', '/assets/character_right_f4.png']
};

const WALK_FRAME_INTERVAL = 130; // ms per step frame

const Character = forwardRef<HTMLDivElement, CharacterProps>(
  ({ direction = 'down', isWalking, x = 50, y = 50, className = '' }, ref) => {
    const [frame, setFrame] = useState<0 | 1 | 2 | 3>(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
      if (isWalking) {
        intervalRef.current = setInterval(() => {
          setFrame(f => {
            const next = ((f + 1) % 4) as 0 | 1 | 2 | 3;
            // Two ground-contact frames per cycle (1 and 3) get a footstep sound
            if (next === 1 || next === 3) playFootstepSound();
            return next;
          });
        }, WALK_FRAME_INTERVAL);
      } else {
        setFrame(0);
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [isWalking]);

    const currentSprite = spriteFrames[direction][frame];

    return (
      <div
        ref={ref}
        className={`absolute z-30 ${className}`}
        style={{
          width: '72px',
          height: '72px',
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-full h-full relative">
          <img
            src={currentSprite}
            alt={`Character facing ${direction}`}
            className="w-full h-full object-contain drop-shadow-md"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    );
  }
);

Character.displayName = 'Character';

export default Character;
