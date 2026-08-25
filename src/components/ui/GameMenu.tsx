'use client';

export default function GameMenu({ onLocationClick }: { onLocationClick?: (id: string) => void }) {
  const menuItems = [
    { label: 'OVERWORLD', hash: '#intro' },
    { label: 'ABOUT ME', hash: '#about' },
    { label: 'SKILLS', hash: '#skills' },
    { label: 'PROJECTS', hash: '#projects' },
    { label: 'JOURNEY', hash: '#journey' },
    { label: 'BADGES', hash: '#badges' },
    { label: 'CONTACT', hash: '#contact' },
    { label: 'RESUME', hash: '#resume' },
  ];

  return (
    <div className="absolute top-4 right-4 z-40 pointer-events-auto hidden md:block">
      <div className="panel bg-surface p-4 w-48">
        <h3 className="pixel-text text-secondary mb-3 border-b-2 border-panel-border/20 pb-2">MENU</h3>
        <ul className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button 
                className="pixel-text text-[10px] text-text hover:text-primary w-full text-left flex items-center gap-2 group"
                onClick={() => {
                   if (item.hash.startsWith('#') && onLocationClick) {
                     const id = item.hash.substring(1);
                     if (id !== 'intro' && id !== 'resume') {
                        onLocationClick(id);
                     }
                   }
                }}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
