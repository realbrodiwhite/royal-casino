
import React from 'react';

const CrapsCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="dice game craps"
    {...props}
  >
    {/* Dice 1 (showing 3) */}
    <rect x="18" y="30" width="32" height="32" rx="4" fill="hsl(var(--card-foreground))" stroke="currentColor" strokeWidth="2" />
    <circle cx="26" cy="38" r="3" fill="currentColor" />
    <circle cx="34" cy="46" r="3" fill="currentColor" />
    <circle cx="42" cy="54" r="3" fill="currentColor" />

    {/* Dice 2 (showing 4) - slightly offset and overlapping */}
    <rect x="50" y="38" width="32" height="32" rx="4" fill="hsl(var(--card-foreground))" stroke="currentColor" strokeWidth="2" />
    <circle cx="58" cy="46" r="3" fill="currentColor" />
    <circle cx="58" cy="62" r="3" fill="currentColor" />
    <circle cx="74" cy="46" r="3" fill="currentColor" />
    <circle cx="74" cy="62" r="3" fill="currentColor" />
  </svg>
);

export default CrapsCategoryIcon;
