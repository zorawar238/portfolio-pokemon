import { developerData } from '@/data/developer';

export default function TrainerCard() {
  return (
    <div className="absolute top-4 left-4 z-40 pointer-events-auto">
      <div className="panel bg-surface p-3 flex items-center gap-4 w-64">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 bg-[#FFE0B2] border-2 border-panel-border rounded-sm relative overflow-hidden flex-shrink-0">
           <div className="absolute top-0 left-0 w-full h-4 bg-text"></div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-end mb-1">
            <h2 className="pixel-text text-primary">{developerData.name}</h2>
            <span className="pixel-text text-[8px]">Lv. 24</span>
          </div>
          <div className="text-[10px] pixel-text text-muted">
            {developerData.class}
          </div>
          
          {/* EXP Bar placeholder */}
          <div className="mt-2 w-full h-2 bg-background border border-panel-border rounded-full overflow-hidden">
             <div className="h-full bg-success w-[70%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
