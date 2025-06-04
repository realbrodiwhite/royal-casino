
import React from 'react';

const CrapsCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="dice craps game"
    {...props}
  >
    {/* Dice 1 */}
    <rect x="15" y="35" width="30" height="30" rx="3" fill="white" stroke="currentColor" strokeWidth="2" />
    <circle cx="22.5" cy="42.5" r="3" fill="currentColor" />
    <circle cx="30" cy="50" r="3" fill="currentColor" />
    <circle cx="37.5" cy="57.5" r="3" fill="currentColor" />

    {/* Dice 2 */}
    <rect x="55" y="35" width="30" height="30" rx="3" fill="white" stroke="currentColor" strokeWidth="2" />
    <circle cx="62.5" cy="42.5" r="3" fill="currentColor" />
    <circle cx="62.5" cy="57.5" r="3" fill="currentColor" />
    <circle cx="77.5" cy="42.5" r="3" fill="currentColor" />
    <circle cx="77.5" cy="57.5" r="3" fill="currentColor" />
  </svg>
);

export default CrapsCategoryIcon;
