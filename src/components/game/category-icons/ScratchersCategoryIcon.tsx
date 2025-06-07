
import React from 'react';

const ScratchersCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="scratcher ticket win"
    {...props}
  >
    {/* Ticket Body */}
    <rect x="18" y="28" width="64" height="44" rx="5" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />

    {/* Unscratched portion covering */}
    <path 
      d="M20 30 H 70 C 75 30, 80 35, 80 50 C 80 65, 75 70, 70 70 H 20 V 30 Z"
      fill="url(#scratchGradient)"
      stroke="hsl(var(--border))"
      strokeWidth="0.5"
    />
    <defs>
        <linearGradient id="scratchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: "hsl(var(--muted-foreground))", stopOpacity:0.5}} />
            <stop offset="100%" style={{stopColor: "hsl(var(--muted-foreground))", stopOpacity:0.3}} />
        </linearGradient>
    </defs>

    {/* "Scratched" area revealing a win symbol (e.g., a star) */}
    {/* This part simulates a tear or scratch */}
    <path 
      d="M45 40 C 35 42, 30 50, 32 60 L 50 65 L 68 60 C 70 50, 65 42, 55 40 Z"
      fill="hsl(var(--background))"
    />
    {/* Star Symbol */}
    <path 
      d="M50 46 L52.35 50.85 L57.5 51.5 L53.75 55.1 L54.7 60.3 L50 57.8 L45.3 60.3 L46.25 55.1 L42.5 51.5 L47.65 50.85 Z" 
      fill="hsl(var(--primary))" 
      stroke="hsl(var(--primary-foreground))" 
      strokeWidth="0.7"
      strokeLinejoin="round"
    />
    
    {/* Representation of coin scratching */}
    <circle cx="72" cy="25" r="8" fill="hsl(var(--foreground))" opacity="0.7"/>
    <circle cx="72" cy="25" r="5" fill="hsl(var(--background))" opacity="0.4"/>
    <text x="72" y="28.5" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold" opacity="0.7">$</text>

  </svg>
);

export default ScratchersCategoryIcon;
