
import React from 'react';

const SlotsCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="slot machine reels"
    {...props}
  >
    <rect x="10" y="20" width="80" height="60" rx="5" stroke="currentColor" strokeWidth="3" fill="none" />
    <line x1="35" y1="20" x2="35" y2="80" stroke="currentColor" strokeWidth="2" />
    <line x1="65" y1="20" x2="65" y2="80" stroke="currentColor" strokeWidth="2" />
    {/* Three 7s */}
    <text x="22.5" y="58" fontSize="30" fill="currentColor" textAnchor="middle">7</text>
    <text x="50" y="58" fontSize="30" fill="currentColor" textAnchor="middle">7</text>
    <text x="77.5" y="58" fontSize="30" fill="currentColor" textAnchor="middle">7</text>
    {/* Handle */}
    <circle cx="90" cy="15" r="5" fill="currentColor" />
    <line x1="90" y1="15" x2="90" y2="35" stroke="currentColor" strokeWidth="3" />
  </svg>
);

export default SlotsCategoryIcon;
