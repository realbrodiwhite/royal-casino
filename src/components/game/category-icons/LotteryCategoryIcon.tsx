
import React from 'react';

const LotteryCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="lottery balls numbers"
    {...props}
  >
    {/* Ball 1 */}
    <circle cx="30" cy="55" r="15" fill="hsl(var(--primary))" stroke="currentColor" strokeWidth="2" />
    <text x="30" y="60" fontSize="14" fontWeight="bold" fill="hsl(var(--primary-foreground))" textAnchor="middle">7</text>
    
    {/* Ball 2 - slightly overlapping */}
    <circle cx="50" cy="40" r="15" fill="hsl(var(--secondary))" stroke="currentColor" strokeWidth="2"/>
    <text x="50" y="45" fontSize="14" fontWeight="bold" fill="hsl(var(--secondary-foreground))" textAnchor="middle">23</text>

    {/* Ball 3 - slightly overlapping */}
    <circle cx="70" cy="55" r="15" fill="hsl(var(--accent))" stroke="currentColor" strokeWidth="2"/>
    <text x="70" y="60" fontSize="14" fontWeight="bold" fill="hsl(var(--accent-foreground))" textAnchor="middle">42</text>

    {/* Subtle sparkle/shine elements */}
    <path d="M20 35 L 23 30 L 26 35 L 23 40 Z" fill="hsl(var(--foreground))" opacity="0.7"/>
    <path d="M75 30 L 78 25 L 81 30 L 78 35 Z" fill="hsl(var(--foreground))" opacity="0.7"/>
  </svg>
);

export default LotteryCategoryIcon;
