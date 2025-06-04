
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
    <rect x="18" y="28" width="64" height="44" rx="4" fill="hsl(var(--muted))" stroke="currentColor" strokeWidth="2.5" />

    {/* "Scratched" area showing a win symbol (e.g., a star) */}
    <circle cx="50" cy="50" r="18" fill="hsl(var(--background))" /> {/* Area that's "scratched off" */}
    {/* Star Symbol */}
    <path 
      d="M50 40 L53 47 L60 47 L54.5 51 L56.5 58 L50 54 L43.5 58 L45.5 51 L40 47 L47 47 Z" 
      fill="hsl(var(--primary))" 
      stroke="hsl(var(--primary-foreground))" 
      strokeWidth="0.5"
    />

    {/* Representation of scratching tool or coin edge */}
    <rect x="62" y="18" width="14" height="7" rx="1.5" fill="hsl(var(--foreground))" opacity="0.6" transform="rotate(15 69 21.5)" />
    
     {/* Subtle texture on the ticket */}
    <line x1="22" y1="33" x2="78" y2="33" stroke="currentColor" strokeWidth="0.75" opacity="0.15" strokeDasharray="2.5 2.5"/>
    <line x1="22" y1="67" x2="78" y2="67" stroke="currentColor" strokeWidth="0.75" opacity="0.15" strokeDasharray="2.5 2.5"/>
  </svg>
);

export default ScratchersCategoryIcon;
