
import React from 'react';

const ScratchersCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="scratcher ticket coin"
    {...props}
  >
    {/* Ticket */}
    <rect x="15" y="30" width="70" height="40" rx="5" stroke="currentColor" strokeWidth="3" fill="lightgray" />
    <text x="50" y="55" fontSize="12" fill="black" textAnchor="middle">SCRATCH</text>
    {/* Partially scratched area */}
    <path d="M20 40 Q30 30 40 40 Q50 50 60 40" stroke="darkgray" strokeWidth="4" fill="none" strokeDasharray="5,5" />
    <text x="30" y="45" fontSize="10" fill="green" textAnchor="middle">WIN</text>
    {/* Coin */}
    <circle cx="70" cy="25" r="10" fill="gold" stroke="darkgoldenrod" strokeWidth="2" />
    <text x="70" y="28" fontSize="10" fill="black" textAnchor="middle">$</text>
  </svg>
);

export default ScratchersCategoryIcon;
