'use client';

import { useEffect } from 'react';
import { journeyData } from '@/data/journey';
import { achievementsData } from '@/data/achievements';
import { developerData } from '@/data/developer';
import { playAchievementSound } from '@/utils/audio';

export default function JourneyBadges({ onClose }: { onClose?: () => void }) {
  useEffect(() => {
    playAchievementSound();
  }, []);

  // A fake "Trainer ID" generated from the start date or just hardcoded for flavor
  const trainerId = "NO. 20248";
  const money = "¥ 99,999";

  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-black/80 flex items-start justify-center p-4 md:p-8 z-50 overflow-y-auto pointer-events-auto">
      <div className="w-full max-w-4xl flex flex-col relative animate-in fade-in zoom-in-95 duration-200 my-4">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-white bg-error hover:bg-error/80 px-3 py-1 rounded-full border-4 border-white shadow-lg z-50 pixel-text text-sm transition-transform hover:scale-110">
          X
        </button>

        {/* The Trainer Card (Outer Casing) */}
        <div className="w-full bg-gradient-to-br from-[#85C1E9] to-[#3498DB] rounded-3xl border-8 border-white p-2 shadow-2xl relative">
           
           {/* Inner Card background */}
           <div className="bg-[#f0f4f8] w-full rounded-2xl border-4 border-[#1d3557] overflow-hidden flex flex-col">
              
              {/* Header */}
              <div className="bg-[#1d3557] text-white p-4 flex justify-between items-center shadow-md">
                 <h2 className="pixel-text text-xl md:text-2xl tracking-widest text-[#f1c40f] drop-shadow-md">TRAINER CARD</h2>
                 <div className="pixel-text text-sm md:text-base opacity-80">ID: {trainerId}</div>
              </div>

              {/* Top Half: Trainer Info */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 relative border-b-4 border-[#3498db]/30 bg-white">
                 
                 {/* Left: Info Text */}
                 <div className="flex-1 flex flex-col gap-4 font-mono">
                    <div className="flex justify-between items-end border-b-2 border-gray-200 pb-1">
                       <span className="text-gray-500 font-bold tracking-widest">NAME</span>
                       <span className="pixel-text text-lg text-[#1d3557]">{developerData.name}</span>
                    </div>
                    <div className="flex justify-between items-end border-b-2 border-gray-200 pb-1">
                       <span className="text-gray-500 font-bold tracking-widest">CLASS</span>
                       <span className="pixel-text text-sm text-[#e74c3c]">{developerData.class.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-end border-b-2 border-gray-200 pb-1">
                       <span className="text-gray-500 font-bold tracking-widest">MONEY</span>
                       <span className="pixel-text text-sm text-[#1d3557]">{money}</span>
                    </div>
                    <div className="flex justify-between items-end border-b-2 border-gray-200 pb-1">
                       <span className="text-gray-500 font-bold tracking-widest">PLAY TIME</span>
                       <span className="pixel-text text-sm text-[#1d3557]">999:59</span>
                    </div>
                 </div>

                 {/* Right: Character Portrait Box */}
                 <div className="w-full md:w-1/3 flex items-center justify-center shrink-0">
                    <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-t from-[#78c850] to-[#c5e1a5] rounded-xl border-4 border-[#1d3557] shadow-inner relative overflow-hidden flex items-center justify-center">
                       {/* Character Sprite - Scaled up */}
                       <img 
                          src="/assets/character_sprite.png" 
                          alt="Trainer Sprite" 
                          className="w-32 h-32 object-contain filter drop-shadow-xl"
                          style={{ imageRendering: 'pixelated' }}
                       />
                    </div>
                 </div>
              </div>

              {/* Bottom Half: Badges (Journey Milestones) */}
              <div className="bg-[#ecf0f1] p-6 md:p-8 flex flex-col">
                 <h3 className="pixel-text text-[#1d3557] mb-6 text-center text-sm md:text-base opacity-80">GYM BADGES</h3>
                 
                 <div className="grid grid-cols-4 md:grid-cols-4 gap-4 md:gap-8 justify-items-center">
                    {journeyData.map((journey, index) => (
                       <div key={journey.id} className="flex flex-col items-center group relative cursor-pointer">
                          
                          {/* The Badge */}
                          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-[#1d3557] shadow-[0_4px_0_#1d3557] flex items-center justify-center transform transition-transform group-hover:-translate-y-2 group-active:translate-y-1 relative bg-gradient-to-br ${
                            index % 4 === 0 ? 'from-[#f1c40f] to-[#f39c12]' :
                            index % 4 === 1 ? 'from-[#3498db] to-[#2980b9]' :
                            index % 4 === 2 ? 'from-[#e74c3c] to-[#c0392b]' :
                            'from-[#2ecc71] to-[#27ae60]'
                          }`}>
                             {/* Badge inner reflection */}
                             <div className="absolute top-1 right-1 w-4 h-4 bg-white/40 rounded-full blur-[1px]"></div>
                             
                             <span className="font-bold text-white text-xl pixel-text drop-shadow-md">
                                {index + 1}
                             </span>
                          </div>

                          {/* Hover Tooltip (The Journey Info) */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-[#1d3557] text-white p-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 flex flex-col items-center">
                             <div className="font-bold pixel-text text-[10px] text-[#f1c40f] mb-1">{journey.year}</div>
                             <div className="font-mono text-xs font-bold text-center mb-1">{journey.title}</div>
                             <div className="font-mono text-[10px] text-center opacity-80">{journey.summary}</div>
                             {/* Arrow pointing down */}
                             <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1d3557]"></div>
                          </div>

                       </div>
                    ))}
                 </div>
              </div>

              {/* Trophy Case (Achievements) */}
              {achievementsData.length > 0 && (
                <div className="bg-white p-6 md:p-8 flex flex-col border-t-4 border-[#3498db]/30">
                   <h3 className="pixel-text text-[#1d3557] mb-6 text-center text-sm md:text-base opacity-80">TROPHY CASE</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievementsData.map((achievement) => (
                         <div key={achievement.id} className="flex gap-3 items-start bg-[#f8f0e3] border-2 border-[#1d3557]/20 rounded-lg p-3 shadow-sm">
                            <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-[#f1c40f] to-[#f39c12] border-2 border-[#1d3557] shadow-[0_2px_0_#1d3557] flex items-center justify-center">
                               <span className="text-white text-lg">🏆</span>
                            </div>
                            <div className="flex-1 min-w-0">
                               <div className="flex items-center justify-between gap-2">
                                  <span className="font-mono font-bold text-sm text-[#1d3557] truncate">{achievement.title}</span>
                                  <span className="pixel-text text-[9px] text-[#e74c3c] shrink-0">{achievement.year}</span>
                               </div>
                               <div className="font-mono text-xs text-gray-500">{achievement.issuer} · {achievement.category}</div>
                               <p className="font-mono text-xs text-[#1d3557]/80 mt-1">{achievement.description}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
              )}

           </div>
        </div>
      </div>
    </div>
  );
}
