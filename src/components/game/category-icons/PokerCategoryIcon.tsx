
import React from 'react';

const PokerCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="poker cards hand"
    {...props}
  >
    {/* Card 1 (slightly fanned) */}
    <rect x="20" y="30" width="30" height="45" rx="3" fill="white" stroke="currentColor" strokeWidth="2" transform="rotate(-10 35 52.5)" />
    <text x="28" y="45" fontSize="12" fill="currentColor" transform="rotate(-10 35 52.5)">A</text>
    <text x="26" y="65" fontSize="18" fill="red" transform="rotate(-10 35 52.5)">♥</text>
    {/* Card 2 (slightly fanned) */}
    <rect x="35" y="28" width="30" height="45" rx="3" fill="white" stroke="currentColor" strokeWidth="2" transform="rotate(5 50 50.5)" />
    <text x="43" y="43" fontSize="12" fill="currentColor" transform="rotate(5 50 50.5)">K</text>
    <text x="41" y="63" fontSize="18" fill="red" transform="rotate(5 50 50.5)">♦</text>
     {/* Card 3 (more upright) */}
    <rect x="50" y="30" width="30" height="45" rx="3" fill="white" stroke="currentColor" strokeWidth="2" transform="rotate(15 65 52.5)" />
    <text x="58" y="45" fontSize="12" fill="currentColor" transform="rotate(15 65 52.5)">Q</text>
     <text x="57" y="65" fontSize="18" fill="currentColor" transform="rotate(15 65 52.5)">♠</text>
  </svg>
);

export default PokerCategoryIcon;
