
import React from 'react';

const BingoCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="bingo card game"
    {...props}
  >
    <rect x="20" y="20" width="60" height="60" rx="4" stroke="currentColor" strokeWidth="3" fill="none" />
    {/* Simplified grid lines */}
    <line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" strokeWidth="2" />
    <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" />
    <line x1="20" y1="65" x2="80" y2="65" stroke="currentColor" strokeWidth="2" />

    <line x1="35" y1="20" x2="35" y2="80" stroke="currentColor" strokeWidth="2" />
    <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
    <line x1="65" y1="20" x2="65" y2="80" stroke="currentColor" strokeWidth="2" />
    
    {/* Daubed circles */}
    <circle cx="27.5" cy="27.5" r="5" fill="currentColor" opacity="0.8" />
    <circle cx="72.5" cy="27.5" r="5" fill="currentColor" opacity="0.5" />
    <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.9" /> {/* Center (Free Space) */}
    <circle cx="27.5" cy="72.5" r="5" fill="currentColor" opacity="0.5" />
    <circle cx="72.5" cy="72.5" r="5" fill="currentColor" opacity="0.8" />

    {/* BINGO letters - simplified */}
    <text x="50" y="15" fontSize="10" fontWeight="bold" fill="currentColor" textAnchor="middle">BINGO</text>
  </svg>
);

export default BingoCategoryIcon;
