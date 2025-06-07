
import React from 'react';

const SlotsCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="slot machine 777"
    {...props}
  >
    <defs>
      <linearGradient id="slotMachineBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "hsl(var(--card))", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "hsl(var(--muted))", stopOpacity: 1 }} />
      </linearGradient>
      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
        <feOffset dx="1" dy="1.5" result="offsetblur"/>
        <feFlood floodColor="hsl(var(--background))" floodOpacity="0.3"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Main slot machine body */}
    <rect 
      x="12" y="18" width="76" height="64" rx="7" 
      stroke="hsl(var(--border))" strokeWidth="2.5" 
      fill="url(#slotMachineBodyGradient)" 
      filter="url(#dropShadow)"
    />
    
    {/* Top highlight on machine body */}
    <path d="M19 20 H81 C84.3137 20 87 22.6863 87 26 V 28 H13 V 26 C13 22.6863 15.6863 20 19 20 Z" fill="hsl(var(--card))" opacity="0.5"/>

    {/* Display area for reels */}
    <rect 
      x="22" y="28" width="56" height="30" rx="3" 
      fill="hsl(var(--input))" 
      stroke="hsl(var(--border))" strokeWidth="1.5"
    />
    {/* Inner shadow for display area */}
    <rect x="23" y="29" width="54" height="28" rx="2" fill="none" stroke="hsl(var(--background))" strokeWidth="1.5" opacity="0.2"/>
    
    {/* Reel dividers */}
    <line x1="39.33" y1="28" x2="39.33" y2="58" stroke="hsl(var(--border))" strokeWidth="1.5" />
    <line x1="60.66" y1="28" x2="60.66" y2="58" stroke="hsl(var(--border))" strokeWidth="1.5" />
    
    {/* "7" Symbols - with stroke for definition */}
    <text x="30.5" y="50" fontSize="24" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="middle" stroke="hsl(var(--primary-foreground))" strokeWidth="0.3" strokeLinejoin="round">7</text>
    <text x="50" y="50" fontSize="24" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="middle" stroke="hsl(var(--primary-foreground))" strokeWidth="0.3" strokeLinejoin="round">7</text>
    <text x="69.5" y="50" fontSize="24" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="middle" stroke="hsl(var(--primary-foreground))" strokeWidth="0.3" strokeLinejoin="round">7</text>

    {/* Slot machine lever/handle */}
    <line x1="88" y1="38" x2="88" y2="56" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="88" cy="34" r="5.5" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="1"/>
    <circle cx="88" cy="34" r="2.5" fill="hsl(var(--primary-foreground))" opacity="0.7"/>
    
    {/* Payout tray outline with a slight fill */}
    <path d="M25 70 Q50 78 75 70 L73 73 Q50 81 27 73 Z" stroke="hsl(var(--border))" strokeWidth="2" fill="hsl(var(--muted))" opacity="0.8" />
    <path d="M25 70 Q50 78 75 70" stroke="hsl(var(--border))" strokeWidth="1.5" fill="none" />

    {/* Subtle button/detail on the front */}
    <circle cx="50" y="65" r="3.5" fill="hsl(var(--destructive))" stroke="hsl(var(--destructive-foreground))" strokeWidth="0.5" />
    <circle cx="50" y="65" r="1.5" fill="hsl(var(--destructive-foreground))" opacity="0.7"/>

  </svg>
);

export default SlotsCategoryIcon;
