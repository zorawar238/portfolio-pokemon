'use client';
import { useState, useEffect } from 'react';
import { skillsData, SkillCategory } from '@/data/skills';

const CATEGORIES: SkillCategory[] = ['Frontend', 'Backend', 'UI / UX', 'Animation', 'Tools', 'Currently Learning'];

export default function SkillDex({ onClose }: { onClose?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Frontend');
  const [selectedSkill, setSelectedSkill] = useState(skillsData[0]);
  
  // Typewriter state
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Trigger typewriter effect when selected skill changes
  useEffect(() => {
    if (!selectedSkill) return;
    
    setIsTyping(true);
    setDisplayedText('');
    
    const textToType = selectedSkill.description;
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < textToType.length) {
        setDisplayedText(prev => prev + textToType.charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 15); // Fast typing speed (15ms per character)
    
    return () => clearInterval(typingInterval);
  }, [selectedSkill]);

  const filteredSkills = skillsData.filter(skill => skill.category === activeCategory);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-2 sm:p-4 z-[60] overflow-hidden pointer-events-auto">
      <div className="w-full max-w-5xl max-h-[95vh] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button - Moved outside to ensure it's always accessible and doesn't get scrolled away */}
        <button onClick={onClose} className="absolute -top-3 -right-2 md:top-4 md:right-4 text-white bg-error hover:bg-error/80 px-3 py-1 rounded-sm border-2 border-white shadow-sm z-[70] pixel-text text-sm transition-colors">X</button>

        {/* Main Bag UI Container */}
        <div className="flex-1 bg-[#4a90e2] rounded-t-2xl border-4 border-[#1d3557] overflow-y-auto overflow-x-hidden flex flex-col md:flex-row landscape:flex-row relative shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]">
           {/* Background subtle pattern */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
           
           {/* Left Column: Bag Image & Categories */}
           <div className="w-full md:w-5/12 landscape:w-5/12 p-4 md:p-6 flex flex-col items-center justify-start md:justify-center relative z-10 shrink-0">
              
              {/* Category Selector (The "Pockets") */}
              <div className="w-full flex flex-col gap-2 mb-4 md:mb-6 mt-4 md:mt-0">
                <div className="bg-[#1d3557] text-white pixel-text text-center py-2 rounded-t-lg border-b-4 border-black/30 shadow-md">
                  POCKETS
                </div>
                <div className="bg-white/90 p-2 rounded-b-lg border-2 border-[#1d3557] shadow-inner grid grid-cols-2 gap-1">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        const firstInCategory = skillsData.find(s => s.category === category);
                        if (firstInCategory) setSelectedSkill(firstInCategory);
                      }}
                      className={`pixel-text text-[9px] md:text-[10px] p-2 rounded text-left transition-colors flex items-center gap-1 ${
                        activeCategory === category 
                          ? 'bg-[#e74c3c] text-white shadow-md transform -translate-y-0.5' 
                          : 'bg-transparent text-[#1d3557] hover:bg-black/5'
                      }`}
                    >
                      <span className={activeCategory === category ? 'opacity-100' : 'opacity-0'}>▶</span>
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bag Image - Hidden on short screens (<500px height) to save space */}
              <div className="relative w-40 h-40 md:w-64 md:h-64 mt-auto [@media(max-height:500px)]:hidden">
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-8 bg-black/30 rounded-[100%] blur-sm -z-10"></div>
                 <img 
                   src="/assets/item_bag.jpg" 
                   alt="Item Bag" 
                   className="w-full h-full object-contain filter drop-shadow-2xl mix-blend-multiply" 
                   style={{ imageRendering: 'pixelated' }}
                 />
              </div>
           </div>

           {/* Right Column: Skill List */}
           <div className="w-full md:w-7/12 landscape:w-7/12 p-4 md:p-6 md:pl-0 landscape:pl-0 relative z-10 flex flex-col min-h-[200px] shrink-0">
              
              {/* List Container */}
              <div className="flex-1 bg-[#f8f0e3] rounded-xl border-4 border-[#1d3557] shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="flex justify-between items-center bg-[#1d3557] text-white px-4 py-2 border-b-4 border-[#1d3557]">
                   <span className="pixel-text text-sm">ITEM NAME</span>
                   <span className="pixel-text text-sm">LVL</span>
                </div>
                
                {/* Scrollable List */}
                <ul className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                  {filteredSkills.map(skill => (
                    <li key={skill.id}>
                      <button
                        onClick={() => setSelectedSkill(skill)}
                        className={`w-full text-left px-3 md:px-4 py-2 md:py-3 flex items-center justify-between border-b-2 transition-colors ${
                          selectedSkill?.id === skill.id
                            ? 'bg-[#3498db]/20 border-[#3498db]/50 shadow-inner rounded'
                            : 'border-transparent hover:bg-black/5'
                        }`}
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className={`pixel-text text-[10px] md:text-xs ${selectedSkill?.id === skill.id ? 'text-[#e74c3c]' : 'opacity-0'}`}>▶</span>
                          <span className="font-mono font-bold text-xs md:text-sm text-[#1d3557]">{skill.name}</span>
                        </div>
                        <span className="font-mono text-[10px] md:text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">
                          {skill.level}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
           </div>
        </div>

        {/* Bottom Dialogue Box (Description) */}
        <div className="h-32 md:h-40 shrink-0 bg-[#f8f0e3] rounded-b-2xl border-x-4 border-b-4 border-[#1d3557] p-3 md:p-6 shadow-2xl relative z-10 flex gap-3 md:gap-4">
           
           <div className="w-16 h-16 md:w-24 md:h-24 bg-white border-2 border-[#1d3557] rounded-lg shadow-inner flex items-center justify-center shrink-0">
             <span className="text-2xl md:text-4xl text-[#3498db] font-bold">{'</>'}</span>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-xs md:text-sm text-[#1d3557] leading-relaxed">
             {selectedSkill ? (
               <>
                 <p className="font-bold mb-1 md:mb-2 text-sm md:text-base">{selectedSkill.name}</p>
                 <p>{displayedText}</p>
                 {!isTyping && (
                   <div className="mt-2 text-[10px] md:text-xs opacity-70 animate-in fade-in duration-500">
                     <span className="font-bold">Used In:</span> {selectedSkill.usedInProjects.join(', ') || 'N/A'}
                   </div>
                 )}
               </>
             ) : (
               <p className="opacity-50">Select an item to view its details...</p>
             )}
           </div>

           {/* Blinking indicator - only show when not typing */}
           {!isTyping && selectedSkill && (
             <div className="absolute bottom-2 right-3 md:bottom-4 md:right-4 animate-bounce text-[#e74c3c] pixel-text text-sm">▼</div>
           )}
        </div>

      </div>
    </div>
  );
}
