'use client';
import { useState } from 'react';
import { projectsData, ProjectCategory } from '@/data/projects';

const CATEGORIES: ('All' | ProjectCategory)[] = ['All', 'Web', 'Full Stack', 'AI', 'UI/UX', 'E-Commerce', 'Experiments'];

export default function ProjectDex({ onClose }: { onClose?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);

  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 z-50 flex items-end justify-center overflow-hidden bg-black/40 pointer-events-auto">
      
      {/* Pokedex Outer Casing - Docked to bottom, full width/height */}
      <div className="bg-[#dc0a2d] w-full max-w-[1800px] h-full flex flex-col md:flex-row relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] border-t-4 border-black/10">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-error hover:bg-error/80 px-3 py-1 rounded-sm border-2 border-panel-border shadow-sm z-50 pixel-text text-sm transition-colors">X</button>
          
          {/* Left Half (Screen + List) */}
          <div className="flex-1 min-w-0 flex flex-col p-6 md:p-10 pb-6">
            
            {/* Screen Bezel */}
            <div className="bg-[#dedede] p-6 rounded-3xl mb-8 flex-1 flex flex-col relative shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
              {/* Inner Screen (LCD style) */}
              <div className="flex-1 bg-[#8bac8b] border-4 border-[#333] rounded-lg overflow-hidden flex flex-col relative shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
                
                {/* Scanlines effect overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>

                {/* Filters */}
                <div className="flex flex-wrap gap-1 p-2 border-b-2 border-[#306230]/20 relative z-10 shrink-0">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-2 py-1 text-[10px] uppercase font-bold font-mono rounded-sm transition-all border ${
                        activeCategory === category
                          ? 'bg-[#306230] text-[#98cb98] border-[#306230]'
                          : 'bg-transparent text-[#306230] border-[#306230] hover:bg-[#306230]/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Project List */}
                <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1 relative z-10">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map(project => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`flex items-center text-left p-2 rounded transition-all ${
                          selectedProject?.id === project.id
                            ? 'bg-[#306230] text-[#98cb98]'
                            : 'text-[#306230] hover:bg-[#306230]/10'
                        }`}
                      >
                        <span className="font-mono font-bold text-xs w-8 shrink-0">
                          #{project.projectNumber}
                        </span>
                        <div className="flex-1 ml-2">
                          <h4 className="font-bold pixel-text text-sm truncate">{project.name}</h4>
                        </div>
                        {selectedProject?.id === project.id && <span className="pixel-text text-xs ml-2">◀</span>}
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-10 font-mono text-[#306230]/50">NO DATA FOUND.</div>
                  )}
                </div>
              </div>
              
              {/* Bottom Bezel Decoration */}
              <div className="flex justify-between items-end mt-5 px-2 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#ff0000] border-2 border-[#8b0000] shadow-sm"></div>
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-1 bg-[#555] rounded-full"></div>
                  <div className="w-12 h-1 bg-[#555] rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* D-Pad and Buttons */}
            <div className="flex justify-between items-center px-8 shrink-0 h-24">
              <div className="w-12 h-12 rounded-full bg-[#111] shadow-lg border-2 border-[#555]"></div>
              <div className="flex gap-6">
                <div className="w-14 h-4 rounded-full bg-[#222] shadow-sm transform -rotate-12 border border-black/50"></div>
                <div className="w-14 h-4 rounded-full bg-[#222] shadow-sm transform -rotate-12 border border-black/50"></div>
              </div>
              {/* Simple CSS D-Pad */}
              <div className="relative w-24 h-24">
                 <div className="absolute top-1/2 left-0 w-full h-8 bg-[#111] -translate-y-1/2 rounded-sm shadow-lg"></div>
                 <div className="absolute top-0 left-1/2 w-8 h-full bg-[#111] -translate-x-1/2 rounded-sm shadow-lg"></div>
                 <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#222] rounded-full -translate-x-1/2 -translate-y-1/2 z-10 shadow-inner"></div>
              </div>
            </div>

          </div>

          {/* Hinge Line */}
          <div className="hidden md:flex flex-col justify-center w-12 bg-[#b30000] border-x-4 border-black/30 shrink-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] z-10">
          </div>

          {/* Right Half (Details Screen) */}
          <div className="flex-1 min-w-0 flex flex-col p-6 md:p-10 pb-6">

            {/* Info Screen */}
            <div className="bg-[#222] p-6 rounded-2xl flex-1 min-w-0 flex flex-col relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-2 border-black/50">

              {selectedProject ? (
                <div className="flex flex-col h-full min-w-0 text-white">

                  {/* Header Title */}
                  <div className="border-b-2 border-white/20 pb-4 mb-5 shrink-0">
                    <div className="flex justify-between items-end mb-2 gap-2">
                      <h3 className="min-w-0 text-xl md:text-2xl font-bold pixel-text text-white tracking-wide truncate">{selectedProject.name}</h3>
                      <span className="font-mono text-xs md:text-sm opacity-80 shrink-0">No. {selectedProject.projectNumber}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs uppercase font-bold font-mono px-2 py-0.5 bg-white/20 rounded">{selectedProject.category}</span>
                      <span className={`text-xs uppercase font-bold font-mono px-2 py-0.5 rounded ${
                        selectedProject.status === 'Live' ? 'bg-[#32cb65]/30 text-[#4ade80]' : 'bg-[#ffcc00]/30 text-[#facc15]'
                      }`}>
                        {selectedProject.status}
                      </span>
                    </div>
                  </div>

                  {/* Image/Preview box */}
                  <div className="w-full h-32 md:h-40 bg-[#111] border-2 border-black rounded-lg mb-5 flex items-center justify-center shrink-0 overflow-hidden relative shadow-inner">
                     <span className="font-mono text-white/30 text-sm font-bold">VISUAL DATA</span>
                     {selectedProject.isFeatured && (
                       <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#ff0000] animate-pulse shadow-[0_0_8px_#ff0000]"></div>
                     )}
                  </div>

                  {/* Details Scroll Area */}
                  <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar font-sans text-xs md:text-sm text-gray-300 leading-relaxed break-words">
                    <p className="mb-4">{selectedProject.overview}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-[10px] md:text-xs">
                       <div><span className="text-gray-500">ROLE:</span><br/>{selectedProject.role}</div>
                       <div><span className="text-gray-500">YEAR:</span><br/>{selectedProject.year}</div>
                    </div>

                    <div className="mb-4">
                      <span className="text-gray-500 font-mono text-[10px] md:text-xs block mb-1">TECH LOG:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedProject.technologies.map(tech => (
                          <span key={tech} className="px-1.5 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Case Study Log */}
                    <div className="space-y-3 border-t border-white/10 pt-3">
                      {[
                        { label: 'PROBLEM', text: selectedProject.problem },
                        { label: 'GOAL', text: selectedProject.goal },
                        { label: 'APPROACH', text: selectedProject.uxApproach },
                        { label: 'ARCHITECTURE', text: selectedProject.architecture },
                        { label: 'CHALLENGES', text: selectedProject.challenges },
                        { label: 'SOLUTIONS', text: selectedProject.solutions },
                        { label: 'RESULTS', text: selectedProject.results },
                        { label: 'LEARNINGS', text: selectedProject.learnings },
                      ].map(field => (
                        <div key={field.label}>
                          <span className="text-gray-500 font-mono text-[10px] md:text-xs block mb-1">{field.label}:</span>
                          <p>{field.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-white/50 font-mono text-sm">
                  <div className="w-12 h-12 border-4 border-white/20 rounded-full mb-4 animate-[spin_3s_linear_infinite] border-t-white/80"></div>
                  AWAITING INPUT...
                </div>
              )}
            </div>

            {/* Bottom Action Grid */}
            <div className="grid grid-cols-5 gap-3 mt-8 shrink-0 px-2">
               {/* 10 small pink decorative blocks */}
               {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-6 md:h-8 bg-[#ffb6c1] rounded-sm shadow-md border-b-4 border-[#ff8a9a]"></div>
               ))}
            </div>

            {/* Interactive Links */}
            <div className="flex gap-4 mt-6 shrink-0 px-2 pb-2">
               {selectedProject?.liveUrl && (
                 <a href={selectedProject.liveUrl} className="flex-1 text-center py-4 px-4 bg-[#00aaff] text-white font-bold pixel-text text-lg rounded-md border-b-4 border-[#0077cc] active:translate-y-1 active:border-b-0 hover:brightness-110 transition-all shadow-lg">
                   LAUNCH
                 </a>
               )}
               {selectedProject?.githubUrl && (
                 <a href={selectedProject.githubUrl} className="flex-1 text-center py-4 px-4 bg-[#333] text-white font-bold pixel-text text-lg rounded-md border-b-4 border-[#111] active:translate-y-1 active:border-b-0 hover:brightness-110 transition-all shadow-lg">
                   SOURCE
                 </a>
               )}
            </div>

          </div>

        </div>

      </div>
  );
}
