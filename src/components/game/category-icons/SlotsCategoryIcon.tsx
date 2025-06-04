
import React from 'react';

const SlotsCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="slot machine 777"
    {...props}
  >
    {/* Main slot machine body */}
    <rect x="12" y="18" width="76" height="64" rx="7" stroke="currentColor" strokeWidth="3" fill="hsl(var(--muted))" />
    
    {/* Display area for reels */}
    <rect x="22" y="28" width="56" height="30" rx="3" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5"/>
    
    {/* Reel dividers */}
    <line x1="39.33" y1="28" x2="39.33" y2="58" stroke="currentColor" strokeWidth="1.5" />
    <line x1="60.66" y1="28" x2="60.66" y2="58" stroke="currentColor" strokeWidth="1.5" />
    
    {/* "7" Symbols - slightly smaller */}
    <text x="30.5" y="50" fontSize="24" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="middle">7</text>
    <text x="50" y="50" fontSize="24" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="middle">7</text>
    <text x="69.5" y="50" fontSize="24" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="middle">7</text>

    {/* Slot machine lever/handle - simplified */}
    <line x1="88" y1="38" x2="88" y2="52" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="88" cy="34" r="5" fill="currentColor" />
    
    {/* Payout tray outline */}
    <path d="M25 70 Q50 78 75 70" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

export default SlotsCategoryIcon;
