'use client';

import { useState, useEffect } from 'react';

interface DialogueBoxProps {
  text: string;
  isVisible: boolean;
  onComplete?: () => void;
}

export default function DialogueBox({ text, isVisible, onComplete }: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length - 1) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setDisplayedText(text);
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30); // Typing speed

    return () => clearInterval(interval);
  }, [text, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-4xl pointer-events-auto">
      <div className="panel bg-background p-6 min-h-[120px] relative cursor-pointer" onClick={() => {
        if (isTyping) {
          // Skip typing
          setDisplayedText(text);
          setIsTyping(false);
        } else if (onComplete) {
          onComplete();
        }
      }}>
        <p className="pixel-text-lg text-text leading-loose">
          {displayedText}
        </p>
        
        {/* Blinking indicator when done typing */}
        {!isTyping && (
          <div className="absolute bottom-4 right-6 animate-pulse">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[12px] border-t-primary border-r-[8px] border-r-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
}
