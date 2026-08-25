import { journeyData } from '@/data/journey';
import { achievementsData } from '@/data/achievements';

export default function JourneyBadges({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-black/80 flex items-center justify-center p-4 md:p-8 z-50 overflow-hidden">
      <div className="w-full max-w-6xl h-full max-h-[800px] bg-background border-8 border-panel-border rounded-xl shadow-2xl p-6 relative flex flex-col">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-error hover:bg-error/80 px-3 py-1 rounded-sm border-2 border-panel-border shadow-sm z-50 pixel-text text-sm transition-colors">
          X
        </button>
        
        <div className="text-center mb-8 shrink-0">
           <h2 className="text-3xl font-bold text-primary pixel-text drop-shadow-[2px_2px_0px_rgba(29,53,87,1)]">HALL OF FAME</h2>
           <p className="pixel-text text-muted mt-2">Evolution Path & Trainer Badges</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col lg:flex-row gap-8 px-2">
        
        {/* EVOLUTION (Journey) */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-secondary pixel-text mb-6 border-b-2 border-panel-border/20 pb-2">
            EVOLUTION PATH
          </h3>
          <div className="relative flex-1">
            {/* Vertical Line */}
            <div className="absolute left-10 md:left-12 top-10 bottom-10 w-1 bg-panel-border/10"></div>
            
            <div className="flex flex-col gap-8">
              {journeyData.map((milestone, index) => (
                <div key={milestone.id} className="relative pl-16 z-10">
                  {/* Node */}
                  <div className="absolute left-3 md:left-5 top-1 w-6 h-6 rounded-full bg-background border-4 border-primary z-20 shadow-[2px_2px_0px_rgba(29,53,87,0.5)]"></div>
                  
                  <div className="panel-inset bg-background hover:border-primary/50 transition-colors">
                    <span className="text-xs font-mono font-bold text-secondary">{milestone.year}</span>
                    <h3 className="text-xl font-bold pixel-text text-panel-border my-1">{milestone.title}</h3>
                    <p className="font-sans text-sm text-text mb-3">{milestone.summary}</p>
                    
                    <ul className="list-none space-y-1 font-mono text-xs text-muted mb-3">
                      {milestone.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent">▹</span> {detail}
                        </li>
                      ))}
                    </ul>

                    {milestone.nextStep && (
                      <div className="mt-3 pt-3 border-t border-panel-border/10 font-mono text-xs">
                        <span className="font-bold text-panel-border">NEXT:</span> {milestone.nextStep}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BADGES (Achievements) */}
        <div id="badges" className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-accent pixel-text mb-6 border-b-2 border-panel-border/20 pb-2">
            ACHIEVEMENT BADGES
          </h3>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievementsData.map(achievement => (
                <div key={achievement.id} className="panel-interactive bg-background p-4 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full border-2 border-accent flex items-center justify-center mb-4">
                    {/* Badge Icon Placeholder */}
                    <span className="text-2xl text-accent font-bold pixel-text text-shadow-sm">★</span>
                  </div>
                  <span className="text-xs font-mono text-secondary mb-1">{achievement.year}</span>
                  <h3 className="text-sm font-bold pixel-text text-panel-border mb-2">{achievement.title}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 bg-panel-border/5 rounded text-muted mb-2">
                    {achievement.category}
                  </span>
                  <p className="font-sans text-xs text-muted leading-tight">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
