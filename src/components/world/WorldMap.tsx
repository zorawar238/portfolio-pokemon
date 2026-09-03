'use client';

import { useEffect, useRef, useState } from 'react';
import Character from './Character';
import TrainerCard from '../ui/TrainerCard';
import GameMenu from '../ui/GameMenu';
import DialogueBox from '../ui/DialogueBox';
import TouchControls from '../ui/TouchControls';
import { buildingsData } from '@/data/buildings';
import { playDoorChimeSound } from '@/utils/audio';

interface WorldMapProps {
  onLocationClick?: (location: string | null) => void;
  isOverlayOpen?: boolean;
  children?: React.ReactNode;
}

export default function WorldMap({ onLocationClick, isOverlayOpen = false, children }: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [isWalking, setIsWalking] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [dialogue, setDialogue] = useState({ text: "", isVisible: false });

  const keys = useRef<{ [key: string]: boolean }>({});
  const posRef = useRef({ x: 50, y: 50 });
  const requestRef = useRef<number>(0);
  const isOverlayOpenRef = useRef(false);

  // Constants
  const SPEED = 30; // percent per second (frame-rate independent)
  const ASPECT_RATIO = 1024 / 582;

  // Collision Boxes (x, y, w, h in percentages) derived from building positions.
  // Height is adjusted because width% on a square image maps to a taller height% on this map's aspect ratio.
  // Shrunk relative to the full sprite (which has transparent padding) and anchored to the
  // bottom so the box sits over the building's footprint/entrance rather than its roof.
  const COLLIDER_SCALE = 0.55;
  const colliders = buildingsData.map(b => {
    const fullW = b.w;
    const fullH = b.w * ASPECT_RATIO;
    const w = fullW * COLLIDER_SCALE;
    const h = fullH * COLLIDER_SCALE;
    return {
      id: b.id,
      x: b.x + (fullW - w) / 2,
      y: b.y + (fullH - h),
      w,
      h
    };
  });

  const DIRECTION_KEYS: Record<'up' | 'down' | 'left' | 'right', string> = {
    up: 'arrowup', down: 'arrowdown', left: 'arrowleft', right: 'arrowright'
  };

  const handleTouchDirectionDown = (dir: 'up' | 'down' | 'left' | 'right') => {
    keys.current[DIRECTION_KEYS[dir]] = true;
  };

  const handleTouchDirectionUp = (dir: 'up' | 'down' | 'left' | 'right') => {
    keys.current[DIRECTION_KEYS[dir]] = false;
  };

  const handleInteract = () => {
    if (dialogue.isVisible) {
      setDialogue(d => ({ ...d, isVisible: false }));
    }
  };

  useEffect(() => {
    const wasOpen = isOverlayOpenRef.current;
    isOverlayOpenRef.current = isOverlayOpen;

    // If we just closed an overlay, recenter the character and let movement resume
    if (wasOpen && !isOverlayOpen) {
      posRef.current = { x: 50, y: 50 };
      setPos(posRef.current);
      setDirection('down');
      keys.current = {};
    }
  }, [isOverlayOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let lastTime = performance.now();

    const gameLoop = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      // Clamp so resuming from a backgrounded tab doesn't teleport the character
      const dt = Math.min(deltaTime, 50) / 1000;
      const step = SPEED * dt;

      if (!isOverlayOpenRef.current) {
        let dx = 0;
        let dy = 0;
        let newDir = direction;

        if (keys.current['w'] || keys.current['arrowup']) { dy -= step; newDir = 'up'; }
        if (keys.current['s'] || keys.current['arrowdown']) { dy += step; newDir = 'down'; }
        if (keys.current['a'] || keys.current['arrowleft']) { dx -= step; newDir = 'left'; }
        if (keys.current['d'] || keys.current['arrowright']) { dx += step; newDir = 'right'; }

        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
          dx *= 0.707;
          dy *= 0.707;
        }

        if (dx !== 0 || dy !== 0) {
          let newX = posRef.current.x + dx;
          let newY = posRef.current.y + dy;

          // Map boundaries
          newX = Math.max(2, Math.min(98, newX));
          newY = Math.max(2, Math.min(98, newY));

          // Building Collisions & Triggers
          let canMove = true;
          for (const box of colliders) {
            // Check intersection (character is ~2% wide/tall)
            const charW = 2;
            const charH = 4;

            if (
              newX + charW > box.x &&
              newX - charW < box.x + box.w &&
              newY + charH > box.y &&
              newY < box.y + box.h
            ) {
              canMove = false;

              // Touching any part of the building triggers entry
              playDoorChimeSound();
              window.location.hash = box.id;
              keys.current = {}; // clear keys
              break;
            }
          }

          if (canMove) {
            posRef.current = { x: newX, y: newY };
            setPos(posRef.current);
          }

          setDirection(newDir);
          setIsWalking(true);
        } else {
          setIsWalking(false);
        }
      } else {
        setIsWalking(false);
      }

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, [direction]);

  return (
    <div className="relative w-full h-screen bg-[#111] overflow-hidden flex items-center justify-center">

      {/* Background Map Container - aspect ratio locked to the image (1024x582) and strictly contained within viewport */}
      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
        <div
          ref={mapRef}
          className="relative shadow-2xl"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: 'calc(100vw * 582 / 1024)',
            maxWidth: 'calc(100vh * 1024 / 582)',
            aspectRatio: '1024 / 582',
            backgroundImage: `url('/assets/world_map_bg.jpg')`,
            backgroundSize: '100% 100%',
            imageRendering: 'pixelated'
          }}
        >
          {/* Ambient Drifting Clouds (Kept for atmosphere) */}
          <div className="absolute top-[10%] left-[-20%] w-[25%] h-[15%] bg-white/30 rounded-full blur-md animate-[drift_20s_linear_infinite_reverse] pointer-events-none z-10"></div>
          <div className="absolute top-[40%] right-[-20%] w-[35%] h-[25%] bg-white/20 rounded-full blur-lg animate-[drift_35s_linear_infinite] pointer-events-none z-10"></div>
          <div className="absolute top-[80%] left-[-30%] w-[30%] h-[20%] bg-white/25 rounded-full blur-md animate-[drift_25s_linear_infinite_reverse] pointer-events-none z-10"></div>

          {/* Buildings */}
          {buildingsData.map(b => (
            <div
              key={b.id}
              className="absolute aspect-square group drop-shadow-xl z-20 cursor-pointer hover:brightness-110 transition-all"
              style={{ top: `${b.y}%`, left: `${b.x}%`, width: `${b.w}%` }}
              onClick={() => { playDoorChimeSound(); onLocationClick?.(b.id); }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white pixel-text text-lg animate-bounce opacity-0 group-hover:opacity-100 transition-opacity">
                ▼
              </div>
              <img src={b.img} alt={b.alt} draggable={false} className="w-full h-full object-contain drop-shadow-lg pointer-events-none" style={{ imageRendering: 'pixelated' }} />
              <div className={`absolute -bottom-5 left-1/2 -translate-x-1/2 bg-surface border-2 border-panel-border px-2 py-0.5 rounded pixel-text text-[0.5rem] md:text-[10px] ${b.labelColor} whitespace-nowrap`}>
                {b.label}
              </div>
            </div>
          ))}

          {/* Character */}
          <Character ref={charRef} direction={direction} isWalking={isWalking} x={pos.x} y={pos.y} />

        </div>
      </div>

        {/* UI Layer (Fixed over map) */}
        <div className="absolute inset-0 pointer-events-none z-40">
          <TrainerCard />
          <GameMenu onLocationClick={onLocationClick} />
          <DialogueBox
            text={dialogue.text}
            isVisible={dialogue.isVisible}
            onComplete={() => setDialogue({ ...dialogue, isVisible: false })}
          />
          {children}

          {!isOverlayOpen && (
            <TouchControls
              onDirectionDown={handleTouchDirectionDown}
              onDirectionUp={handleTouchDirectionUp}
              onInteract={handleInteract}
            />
          )}
        </div>
    </div>
  );
}
