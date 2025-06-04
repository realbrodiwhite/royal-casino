
import React from 'react';

const LuxuryExperienceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="luxury chandelier elegance"
    {...props}
  >
    {/* Central Column of a chandelier */}
    <line x1="50" y1="15" x2="50" y2="35" stroke="currentColor" strokeWidth="4" />
    {/* Top Bowl/Structure */}
    <ellipse cx="50" cy="38" rx="15" ry="5" stroke="currentColor" strokeWidth="2.5" fill="none" />
    {/* Arms spreading out */}
    <path d="M50 40 Q35 45 30 60" stroke="currentColor" strokeWidth="3" fill="none" />
    <path d="M50 40 Q65 45 70 60" stroke="currentColor" strokeWidth="3" fill="none" />
    <path d="M50 40 Q40 50 42 65" stroke="currentColor" strokeWidth="3" fill="none" />
    <path d="M50 40 Q60 50 58 65" stroke="currentColor" strokeWidth="3" fill="none" />
    {/* Small circles representing lights/crystals at the end of arms */}
    <circle cx="30" cy="60" r="4" fill="currentColor" opacity="0.9" />
    <circle cx="70" cy="60" r="4" fill="currentColor" opacity="0.9" />
    <circle cx="42" cy="65" r="4" fill="currentColor" opacity="0.9" />
    <circle cx="58" cy="65" r="4" fill="currentColor" opacity="0.9" />
    {/* Bottom Droplet/Feature */}
    <path d="M50 70 Q47 80 50 85 Q53 80 50 70" fill="currentColor" opacity="0.7" />
  </svg>
);

export default LuxuryExperienceIcon;
