
import React from 'react';

const KenoCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="keno numbers grid"
    {...props}
  >
    {/* Main Keno board outline */}
    <rect x="15" y="20" width="70" height="60" rx="4" stroke="currentColor" strokeWidth="3" fill="none" />

    {/* Simplified grid of circles (representing number slots) */}
    <circle cx="30" cy="35" r="8" fill="hsl(var(--muted))" opacity="0.5" />
    <text x="30" y="39" fontSize="9" fill="currentColor" textAnchor="middle">12</text>
    
    <circle cx="50" cy="35" r="8" fill="hsl(var(--primary))" opacity="0.8" /> {/* Selected */}
    <text x="50" y="39" fontSize="9" fill="hsl(var(--primary-foreground))" textAnchor="middle">27</text>
    
    <circle cx="70" cy="35" r="8" fill="hsl(var(--muted))" opacity="0.5" />
    <text x="70" y="39" fontSize="9" fill="currentColor" textAnchor="middle">45</text>

    <circle cx="30" cy="55" r="8" fill="hsl(var(--muted))" opacity="0.5" />
    <text x="30" y="59" fontSize="9" fill="currentColor" textAnchor="middle">58</text>

    <circle cx="50" cy="55" r="8" fill="hsl(var(--muted))" opacity="0.5" />
    <text x="50" y="59" fontSize="9" fill="currentColor" textAnchor="middle">63</text>

    <circle cx="70" cy="55" r="8" fill="hsl(var(--primary))" opacity="0.8" /> {/* Selected */}
    <text x="70" y="59" fontSize="9" fill="hsl(var(--primary-foreground))" textAnchor="middle">71</text>
    
    <circle cx="50" cy="70" r="3" fill="currentColor" opacity="0.3" />
    <circle cx="40" cy="70" r="3" fill="currentColor" opacity="0.3" />
    <circle cx="60" cy="70" r="3" fill="currentColor" opacity="0.3" />
  </svg>
);

export default KenoCategoryIcon;
