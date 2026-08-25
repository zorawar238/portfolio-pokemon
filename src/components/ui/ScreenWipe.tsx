import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ScreenWipeProps {
  onHalfway: () => void;
  onComplete: () => void;
}

export default function ScreenWipe({ onHalfway, onComplete }: ScreenWipeProps) {
  const wipeRef1 = useRef<HTMLDivElement>(null);
  const wipeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    // Classic retro horizontal closing blinds wipe
    tl.to([wipeRef1.current, wipeRef2.current], {
      scaleY: 1,
      duration: 0.3,
      ease: 'power2.inOut',
      stagger: 0.1,
      onComplete: onHalfway
    })
    .to([wipeRef1.current, wipeRef2.current], {
      scaleY: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      stagger: 0.1,
      delay: 0.1
    });

    return () => { tl.kill(); };
  }, [onHalfway, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col">
      <div ref={wipeRef1} className="flex-1 bg-black origin-top scale-y-0" />
      <div ref={wipeRef2} className="flex-1 bg-black origin-bottom scale-y-0" />
    </div>
  );
}
