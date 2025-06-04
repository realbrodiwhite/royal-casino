
import React from 'react';

const SlotsCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="slot machine 777"
    {...props}
  >
    {/* Main slot machine body */}
    <rect x="10" y="15" width="80" height="70" rx="8" stroke="currentColor" strokeWidth="3.5" fill="hsl(var(--muted))" />
    
    {/* Display area for reels */}
    <rect x="20" y="25" width="60" height="35" rx="4" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="2"/>
    
    {/* Reel dividers */}
    <line x1="40" y1="25" x2="40" y2="60" stroke="currentColor" strokeWidth="2" />
    <line x1="60" y1="25" x2="60" y2="60" stroke="currentColor" strokeWidth="2" />
    
    {/* "7" Symbols */}
    <text x="30" y="52" fontSize="28" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="middle">7</text>
    <text x="50" y="52" fontSize="28" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="middle">7</text>
    <text x="70" y="52" fontSize="28" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="middle">7</text>

    {/* Slot machine lever/handle - simplified */}
    <line x1="90" y1="35" x2="90" y2="55" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="90" cy="30" r="6" fill="currentColor" />
    
    {/* Payout tray outline */}
    <path d="M25 70 Q50 80 75 70" stroke="currentColor" strokeWidth="2.5" fill="none" />
  </svg>
);

export default SlotsCategoryIcon;
