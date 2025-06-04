
import React from 'react';

const PokerCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="poker cards hand"
    {...props}
  >
    {/* Card 1 (back) - slightly angled */}
    <rect 
      x="22" y="32" width="28" height="42" rx="3" 
      fill="hsl(var(--muted))" stroke="currentColor" strokeWidth="2" 
      transform="rotate(-12 36 53)" 
    />
    <circle cx="36" cy="53" r="7" fill="currentColor" opacity="0.25" transform="rotate(-12 36 53)"/>


    {/* Card 2 (front - Ace of Spades) - more prominent */}
    <rect 
      x="42" y="28" width="32" height="46" rx="3" 
      fill="hsl(var(--card-foreground))" stroke="currentColor" strokeWidth="2" 
      transform="rotate(6 58 51)"
    />
    <text 
      x="49" y="41" fontSize="12" fontWeight="bold" fill="currentColor" 
      textAnchor="middle" transform="rotate(6 58 51)"
    >A</text>
    {/* Spade Symbol */}
    <path 
      d="M58 51 
         C 58 47, 52 47, 52 51 
         C 52 55, 55.5 57, 58 64 
         C 60.5 57, 64 55, 64 51 
         C 64 47, 58 47, 58 51 Z
         M55.5 62.5 L60.5 62.5 L58 66.5 Z"
      fill="currentColor"
      transform="rotate(6 58 51) scale(0.55) translate(0, -4)" 
    />
    <text 
      x="67" y="67" fontSize="12" fontWeight="bold" fill="currentColor" 
      textAnchor="middle" transform="rotate(6 58 51) rotate(180 58 51) translate(0, -9)"
    >A</text>
  </svg>
);

export default PokerCategoryIcon;
