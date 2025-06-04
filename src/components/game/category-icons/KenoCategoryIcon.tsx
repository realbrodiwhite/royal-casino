
import React from 'react';

const KenoCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="keno numbers grid"
    {...props}
  >
    {/* Main Keno board outline */}
    <rect x="15" y="20" width="70" height="60" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />

    {/* Simplified grid of circles (representing number slots) */}
    <circle cx="30" cy="35" r="7" fill="hsl(var(--muted))" opacity="0.6" />
    <text x="30" y="38.5" fontSize="8" fill="currentColor" textAnchor="middle">8</text>
    
    <circle cx="50" cy="35" r="7" fill="hsl(var(--primary))" opacity="0.9" /> {/* Selected */}
    <text x="50" y="38.5" fontSize="8" fill="hsl(var(--primary-foreground))" textAnchor="middle">19</text>
    
    <circle cx="70" cy="35" r="7" fill="hsl(var(--muted))" opacity="0.6" />
    <text x="70" y="38.5" fontSize="8" fill="currentColor" textAnchor="middle">32</text>

    <circle cx="30" cy="52" r="7" fill="hsl(var(--muted))" opacity="0.6" />
    <text x="30" y="55.5" fontSize="8" fill="currentColor" textAnchor="middle">45</text>

    <circle cx="50" cy="52" r="7" fill="hsl(var(--primary))" opacity="0.9" /> {/* Selected */}
    <text x="50" y="55.5" fontSize="8" fill="hsl(var(--primary-foreground))" textAnchor="middle">57</text>

    <circle cx="70" cy="52" r="7" fill="hsl(var(--muted))" opacity="0.6" />
    <text x="70" y="55.5" fontSize="8" fill="currentColor" textAnchor="middle">68</text>
    
    <circle cx="50" cy="70" r="2.5" fill="currentColor" opacity="0.4" />
    <circle cx="42" cy="70" r="2.5" fill="currentColor" opacity="0.4" />
    <circle cx="58" cy="70" r="2.5" fill="currentColor" opacity="0.4" />
  </svg>
);

export default KenoCategoryIcon;
