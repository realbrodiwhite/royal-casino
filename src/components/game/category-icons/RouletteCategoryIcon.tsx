
import React from 'react';

const RouletteCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="roulette wheel casino"
    {...props}
  >
    {/* Outer rim of the wheel */}
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="hsl(var(--muted))" />
    
    {/* Inner section with number pockets */}
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" />

    {/* Pockets - alternating colors (simplified) */}
    {[...Array(12)].map((_, i) => {
      const angleStart = i * 30; // 360 / 12 = 30 degrees per segment
      const angleEnd = (i + 1) * 30;
      const x1 = 50 + 30 * Math.cos(angleStart * Math.PI / 180);
      const y1 = 50 + 30 * Math.sin(angleStart * Math.PI / 180);
      const x2 = 50 + 40 * Math.cos(angleStart * Math.PI / 180); // Outer edge of pocket
      const y2 = 50 + 40 * Math.sin(angleStart * Math.PI / 180);
      const x3 = 50 + 40 * Math.cos(angleEnd * Math.PI / 180);
      const y3 = 50 + 40 * Math.sin(angleEnd * Math.PI / 180);
      const x4 = 50 + 30 * Math.cos(angleEnd * Math.PI / 180);
      const y4 = 50 + 30 * Math.sin(angleEnd * Math.PI / 180);
      
      return (
        <path 
          key={i}
          d={`M ${x1} ${y1} L ${x2} ${y2} A 40 40 0 0 1 ${x3} ${y3} L ${x4} ${y4} A 30 30 0 0 0 ${x1} ${y1} Z`}
          fill={i % 2 === 0 ? "hsl(var(--destructive))" : "hsl(var(--card-foreground))"} 
          stroke="currentColor"
          strokeWidth="0.5"
        />
      );
    })}
     {/* Green pocket example */}
    <path
        d={`M ${50 + 30 * Math.cos(0 * Math.PI / 180)} ${50 + 30 * Math.sin(0 * Math.PI / 180)} 
            L ${50 + 40 * Math.cos(0 * Math.PI / 180)} ${50 + 40 * Math.sin(0 * Math.PI / 180)} 
            A 40 40 0 0 1 ${50 + 40 * Math.cos(15 * Math.PI / 180)} ${50 + 40 * Math.sin(15 * Math.PI / 180)} 
            L ${50 + 30 * Math.cos(15 * Math.PI / 180)} ${50 + 30 * Math.sin(15 * Math.PI / 180)} 
            A 30 30 0 0 0 ${50 + 30 * Math.cos(0 * Math.PI / 180)} ${50 + 30 * Math.sin(0 * Math.PI / 180)} Z`}
        fill="hsl(120, 60%, 35%)" /* Green color */
        stroke="currentColor"
        strokeWidth="0.5"
    />


    {/* Center hub */}
    <circle cx="50" cy="50" r="10" fill="currentColor" stroke="hsl(var(--background))" strokeWidth="2" />
    
    {/* Roulette ball */}
    <circle 
        cx={50 + 25 * Math.cos(45 * Math.PI / 180)} 
        cy={50 + 25 * Math.sin(45 * Math.PI / 180)} 
        r="5" 
        fill="hsl(var(--card-foreground))" 
        stroke="hsl(var(--background))" 
        strokeWidth="1.5"
    />
  </svg>
);

export default RouletteCategoryIcon;
