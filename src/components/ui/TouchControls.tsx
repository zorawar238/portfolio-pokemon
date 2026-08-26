'use client';

type Direction = 'up' | 'down' | 'left' | 'right';

interface TouchControlsProps {
  onDirectionDown: (dir: Direction) => void;
  onDirectionUp: (dir: Direction) => void;
  onInteract: () => void;
}

export default function TouchControls({ onDirectionDown, onDirectionUp, onInteract }: TouchControlsProps) {
  const dirButtonProps = (dir: Direction) => ({
    onPointerDown: (e: React.PointerEvent) => { e.preventDefault(); onDirectionDown(dir); },
    onPointerUp: () => onDirectionUp(dir),
    onPointerLeave: () => onDirectionUp(dir),
    onPointerCancel: () => onDirectionUp(dir),
  });

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-40 flex justify-between items-end px-6 pointer-events-none">
      {/* D-Pad */}
      <div className="relative w-28 h-28 pointer-events-auto select-none touch-none">
        <div className="absolute top-1/2 left-1/2 w-9 h-9 -translate-x-1/2 -translate-y-1/2 bg-[#1d3557]/80 rounded-sm pointer-events-none"></div>
        <button
          {...dirButtonProps('up')}
          aria-label="Move up"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-9 bg-[#1d3557] rounded-sm shadow-md active:bg-[#13233d] flex items-center justify-center text-white text-sm"
        >
          ▲
        </button>
        <button
          {...dirButtonProps('down')}
          aria-label="Move down"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-9 h-9 bg-[#1d3557] rounded-sm shadow-md active:bg-[#13233d] flex items-center justify-center text-white text-sm"
        >
          ▼
        </button>
        <button
          {...dirButtonProps('left')}
          aria-label="Move left"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#1d3557] rounded-sm shadow-md active:bg-[#13233d] flex items-center justify-center text-white text-sm"
        >
          ◀
        </button>
        <button
          {...dirButtonProps('right')}
          aria-label="Move right"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#1d3557] rounded-sm shadow-md active:bg-[#13233d] flex items-center justify-center text-white text-sm"
        >
          ▶
        </button>
      </div>

      {/* Interact Button */}
      <button
        onPointerDown={(e) => { e.preventDefault(); onInteract(); }}
        aria-label="Interact"
        className="pointer-events-auto select-none w-16 h-16 rounded-full bg-[#1d3557] shadow-[0_4px_0_#0f1c2e] active:shadow-[0_0px_0_#0f1c2e] active:translate-y-1 transition-all flex items-center justify-center"
      >
        <span className="font-mono font-bold text-white text-xl">A</span>
      </button>
    </div>
  );
}
