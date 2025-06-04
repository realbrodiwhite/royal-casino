
import React from 'react';

const CrapsCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="dice game craps"
    {...props}
  >
    {/* Dice 1 (showing 3) */}
    <rect x="15" y="30" width="35" height="35" rx="5" fill="hsl(var(--card-foreground))" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="24" cy="39" r="3.5" fill="currentColor" />
    <circle cx="32.5" cy="47.5" r="3.5" fill="currentColor" />
    <circle cx="41" cy="56" r="3.5" fill="currentColor" />

    {/* Dice 2 (showing 4) - slightly offset and overlapping */}
    <rect x="50" y="35" width="35" height="35" rx="5" fill="hsl(var(--card-foreground))" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="59" cy="42" r="3.5" fill="currentColor" />
    <circle cx="59" cy="58" r="3.5" fill="currentColor" />
    <circle cx="75" cy="42" r="3.5" fill="currentColor" />
    <circle cx="75" cy="58" r="3.5" fill="currentColor" />
  </svg>
);

export default CrapsCategoryIcon;
