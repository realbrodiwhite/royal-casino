
"use client";

import React, { useState, useEffect } from 'react';

interface WinAnimationProps {
  trigger: boolean;
  winAmount: number;
  onAnimationComplete: () => void;
}

const WinAnimation: React.FC<WinAnimationProps> = ({ trigger, winAmount, onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      // Simulate animation duration
      const timer = setTimeout(() => {
        setIsVisible(false);
        onAnimationComplete();
      }, 3000); // 3 seconds animation
      return () => clearTimeout(timer);
    }
  }, [trigger, onAnimationComplete]);

  if (!isVisible) {
    return null;
  }

  // Basic animation, can be enhanced with CSS or animation libraries
  // Different animations based on winAmount can be implemented here
  let animationStyle = "text-2xl text-gold";
  if (winAmount > 1000) {
    animationStyle = "text-4xl text-gold font-bold animate-pulse";
  } else if (winAmount > 100) {
    animationStyle = "text-3xl text-gold animate-bounce";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 pointer-events-none">
      <div className={`p-8 bg-deep-purple rounded-lg shadow-2xl text-center ${animationStyle}`}>
        <p>YOU WON!</p>
        <p className="text-4xl font-bold">{winAmount.toLocaleString()} CREDITS!</p>
      </div>
    </div>
  );
};

export default WinAnimation;
