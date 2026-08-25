'use client';

import { useEffect, useRef, useState } from 'react';
import Character from './Character';
import TrainerCard from '../ui/TrainerCard';
import GameMenu from '../ui/GameMenu';
import DialogueBox from '../ui/DialogueBox';

interface WorldMapProps {
  onLocationClick?: (location: string | null) => void;
  children?: React.ReactNode;
}

export default function WorldMap({ onLocationClick, children }: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [isWalking, setIsWalking] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [dialogue, setDialogue] = useState({ text: "Hey! I'm Nishant. Welcome to my portfolio. Explore around!", isVisible: true });

  const keys = useRef<{ [key: string]: boolean }>({});
  const posRef = useRef({ x: 50, y: 50 });
  const requestRef = useRef<number>(0);
  const isOverlayOpenRef = useRef(false);

  // Constants
  const SPEED = 0.5; // percent per frame
  const ASPECT_RATIO = 1024 / 582;

  // Collision Boxes (x, y, w, h in percentages)
  // Height is adjusted because 10% width = 10% * ASPECT_RATIO height
  const colliders = [
    { id: 'about', x: 10, y: 18, w: 10, h: 10 * ASPECT_RATIO, triggerY: 18 + (10 * ASPECT_RATIO) },
    { id: 'skills', x: 78, y: 15, w: 12, h: 12 * ASPECT_RATIO, triggerY: 15 + (12 * ASPECT_RATIO) },
    { id: 'projects', x: 12, y: 60, w: 14, h: 14 * ASPECT_RATIO, triggerY: 60 + (14 * ASPECT_RATIO) },
    { id: 'journey', x: 74, y: 60, w: 14, h: 14 * ASPECT_RATIO, triggerY: 60 + (14 * ASPECT_RATIO) },
    { id: 'contact', x: 42, y: 75, w: 16, h: 16 * ASPECT_RATIO, triggerY: 75 + (16 * ASPECT_RATIO) }
  ];

  useEffect(() => {
    // Keep a ref of whether an overlay is open to pause movement
    const hash = window.location.hash.substring(1);
    isOverlayOpenRef.current = ['about', 'skills', 'projects', 'journey', 'contact'].includes(hash);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      isOverlayOpenRef.current = ['about', 'skills', 'projects', 'journey', 'contact'].includes(hash);
      
      // If we just closed an overlay, bounce the character down slightly to avoid re-triggering
      if (!isOverlayOpenRef.current) {
        setPos(p => {
           posRef.current = { x: p.x, y: p.y + 3 };
           return posRef.current;
        });
        setDirection('down');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let lastTime = performance.now();
    
    const gameLoop = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isOverlayOpenRef.current) {
        let dx = 0;
        let dy = 0;
        let newDir = direction;

        if (keys.current['w'] || keys.current['arrowup']) { dy -= SPEED; newDir = 'up'; }
        if (keys.current['s'] || keys.current['arrowdown']) { dy += SPEED; newDir = 'down'; }
        if (keys.current['a'] || keys.current['arrowleft']) { dx -= SPEED; newDir = 'left'; }
        if (keys.current['d'] || keys.current['arrowright']) { dx += SPEED; newDir = 'right'; }

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
              
              // If hitting the bottom edge of a building, consider it a door trigger
              if (newY < box.triggerY && posRef.current.y >= box.triggerY - 1) {
                window.location.hash = box.id;
                keys.current = {}; // clear keys
                break;
              }
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
          
          {/* Buildings - scaled down so they don't overlap UI */}
          <div 
            className="absolute top-[18%] left-[10%] w-[10%] aspect-square cursor-pointer group hover:brightness-110 transition-all drop-shadow-xl z-20"
            onClick={() => onLocationClick?.('about')}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white pixel-text text-lg animate-bounce opacity-0 group-hover:opacity-100 transition-opacity">
              ▼
            </div>
            <img src="/assets/nishants_house.png" alt="About Me House" className="w-full h-full object-contain drop-shadow-lg" style={{ imageRendering: 'pixelated' }} />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-surface border-2 border-panel-border px-2 py-0.5 rounded pixel-text text-[0.5rem] md:text-[10px] text-primary whitespace-nowrap">
              ABOUT ME
            </div>
          </div>
          <div 
            className="absolute top-[15%] right-[10%] w-[12%] aspect-square cursor-pointer group hover:brightness-110 transition-all drop-shadow-xl z-20"
            onClick={() => onLocationClick?.('skills')}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white pixel-text text-lg animate-bounce opacity-0 group-hover:opacity-100 transition-opacity">
              ▼
            </div>
            <img src="/assets/developer_lab.png" alt="Skills Lab" className="w-full h-full object-contain drop-shadow-lg" style={{ imageRendering: 'pixelated' }} />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-surface border-2 border-panel-border px-2 py-0.5 rounded pixel-text text-[0.5rem] md:text-[10px] text-secondary whitespace-nowrap">
              SKILLS LAB
            </div>
          </div>
          <div 
            className="absolute top-[60%] left-[12%] w-[14%] aspect-square cursor-pointer group hover:brightness-110 transition-all drop-shadow-xl z-20"
            onClick={() => onLocationClick?.('projects')}
          >
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white pixel-text text-lg animate-bounce opacity-0 group-hover:opacity-100 transition-opacity">
              ▼
            </div>
             <img src="/assets/project_city.png" alt="Project City" className="w-full h-full object-contain drop-shadow-lg" style={{ imageRendering: 'pixelated' }} />
             <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-surface border-2 border-panel-border px-2 py-0.5 rounded pixel-text text-[0.5rem] md:text-[10px] text-accent whitespace-nowrap">
              PROJECT CITY
            </div>
          </div>
          <div 
            className="absolute top-[60%] right-[12%] w-[14%] aspect-square cursor-pointer group hover:brightness-110 transition-all drop-shadow-xl z-20"
            onClick={() => onLocationClick?.('journey')}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white pixel-text text-lg animate-bounce opacity-0 group-hover:opacity-100 transition-opacity">
              ▼
            </div>
            <img src="/assets/hall_of_fame.png" alt="Hall of Fame" className="w-full h-full object-contain drop-shadow-lg" style={{ imageRendering: 'pixelated' }} />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-surface border-2 border-panel-border px-2 py-0.5 rounded pixel-text text-[0.5rem] md:text-[10px] text-success whitespace-nowrap">
              HALL OF FAME
            </div>
          </div>
          <div 
            className="absolute top-[75%] left-[50%] -translate-x-1/2 w-[16%] aspect-square cursor-pointer group hover:brightness-110 transition-all drop-shadow-xl z-20"
            onClick={() => onLocationClick?.('contact')}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white pixel-text text-lg animate-bounce opacity-0 group-hover:opacity-100 transition-opacity">
              ▼
            </div>
            <img src="/assets/pokemon_center.png" alt="Pokemon Center" className="w-full h-full object-contain drop-shadow-lg" style={{ imageRendering: 'pixelated' }} />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-surface border-2 border-panel-border px-2 py-0.5 rounded pixel-text text-[0.5rem] md:text-[10px] text-[#dc0a2d] whitespace-nowrap">
              POKÉMON CENTER
            </div>
          </div>
          
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
        </div>
    </div>
  );
}
