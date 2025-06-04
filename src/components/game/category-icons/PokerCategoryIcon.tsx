
import React from 'react';

const PokerCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="poker cards hand"
    {...props}
  >
    {/* Card 1 (back) - slightly angled */}
    <rect 
      x="20" y="30" width="30" height="45" rx="4" 
      fill="hsl(var(--muted))" stroke="currentColor" strokeWidth="2.5" 
      transform="rotate(-15 35 52.5)" 
    />
    <circle cx="35" cy="52.5" r="8" fill="currentColor" opacity="0.3" transform="rotate(-15 35 52.5)"/>


    {/* Card 2 (front - Ace of Spades) - more prominent */}
    <rect 
      x="40" y="25" width="34" height="50" rx="4" 
      fill="hsl(var(--card-foreground))" stroke="currentColor" strokeWidth="2.5" 
      transform="rotate(5 57 50)"
    />
    <text 
      x="47" y="40" fontSize="14" fontWeight="bold" fill="currentColor" 
      textAnchor="middle" transform="rotate(5 57 50)"
    >A</text>
    {/* Spade Symbol */}
    <path 
      d="M57 50 
         C 57 45, 50 45, 50 50 
         C 50 55, 54 57, 57 65 
         C 60 57, 64 55, 64 50 
         C 64 45, 57 45, 57 50 Z
         M54 63 L60 63 L57 68 Z"
      fill="currentColor"
      transform="rotate(5 57 50) scale(0.6) translate(0, -5)" 
    />
    <text 
      x="67" y="70" fontSize="14" fontWeight="bold" fill="currentColor" 
      textAnchor="middle" transform="rotate(5 57 50) rotate(180 57 50) translate(0, -10)"
    >A</text>
  </svg>
);

export default PokerCategoryIcon;
