
import React from 'react';

const ScratchersCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="scratcher ticket win"
    {...props}
  >
    {/* Ticket Body */}
    <rect x="15" y="25" width="70" height="50" rx="5" fill="hsl(var(--muted))" stroke="currentColor" strokeWidth="3" />

    {/* "Scratched" area showing a win symbol (e.g., a star) */}
    <circle cx="50" cy="50" r="20" fill="hsl(var(--background))" /> {/* Area that's "scratched off" */}
    {/* Star Symbol */}
    <path 
      d="M50 38 L53.5 45.5 L61.5 45.5 L55.5 50.5 L57.5 58 L50 53 L42.5 58 L44.5 50.5 L38.5 45.5 L46.5 45.5 Z" 
      fill="hsl(var(--primary))" 
      stroke="hsl(var(--primary-foreground))" 
      strokeWidth="1"
    />

    {/* Representation of scratching tool or coin edge */}
    <rect x="60" y="15" width="15" height="8" rx="2" fill="hsl(var(--foreground))" opacity="0.7" transform="rotate(20 67.5 19)" />
    
     {/* Subtle texture on the ticket */}
    <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.2" strokeDasharray="3 3"/>
    <line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.2" strokeDasharray="3 3"/>
  </svg>
);

export default ScratchersCategoryIcon;
