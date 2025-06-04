
import React from 'react';

const BingoCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="bingo card game"
    {...props}
  >
    <rect x="20" y="20" width="60" height="60" rx="4" stroke="currentColor" strokeWidth="3" fill="none" />
    {/* Simplified grid lines */}
    <line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" />
    <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="2" />
    <line x1="40" y1="20" x2="40" y2="80" stroke="currentColor" strokeWidth="2" />
    <line x1="60" y1="20" x2="60" y2="80" stroke="currentColor" strokeWidth="2" />
    
    {/* Daubed circles */}
    <circle cx="30" cy="30" r="7" fill="currentColor" opacity="0.8" />
    <circle cx="70" cy="30" r="7" fill="currentColor" opacity="0.5" />
    <circle cx="50" cy="50" r="7" fill="currentColor" opacity="0.8" />
    <circle cx="30" cy="70" r="7" fill="currentColor" opacity="0.5" />
    <circle cx="70" cy="70" r="7" fill="currentColor" opacity="0.8" />

    {/* BINGO letters - simplified */}
    <text x="50" y="15" fontSize="12" fontWeight="bold" fill="currentColor" textAnchor="middle">BINGO</text>
  </svg>
);

export default BingoCategoryIcon;
