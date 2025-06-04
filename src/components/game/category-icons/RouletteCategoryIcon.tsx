
import React from 'react';

const RouletteCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="roulette wheel casino"
    {...props}
  >
    {/* Outer rim of the wheel */}
    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="3.5" fill="hsl(var(--muted))" />
    
    {/* Inner section with number pockets */}
    <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" />

    {/* Pockets - simplified representation */}
    {[...Array(16)].map((_, i) => {
      const angle = i * (360 / 16);
      return (
        <line 
          key={i}
          x1="50" 
          y1="50" 
          x2={50 + 28 * Math.cos(angle * Math.PI / 180)}
          y2={50 + 28 * Math.sin(angle * Math.PI / 180)}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      );
    })}
    {/* Pocket color indicators (less literal, more suggestive) */}
     <circle cx="50" cy="50" r="22" stroke="hsl(var(--destructive))" strokeWidth="4" fill="none" strokeDasharray="4 10" opacity="0.7"/>
     <circle cx="50" cy="50" r="18" stroke="hsl(var(--card-foreground))" strokeWidth="4" fill="none" strokeDasharray="4 10" opacity="0.7" transform="rotate(11.25 50 50)"/>


    {/* Center hub */}
    <circle cx="50" cy="50" r="9" fill="currentColor" stroke="hsl(var(--background))" strokeWidth="1.5" />
    
    {/* Roulette ball */}
    <circle 
        cx={50 + 23 * Math.cos(60 * Math.PI / 180)} 
        cy={50 + 23 * Math.sin(60 * Math.PI / 180)} 
        r="4.5" 
        fill="hsl(var(--card-foreground))" 
        stroke="hsl(var(--background))" 
        strokeWidth="1"
    />
  </svg>
);

export default RouletteCategoryIcon;
