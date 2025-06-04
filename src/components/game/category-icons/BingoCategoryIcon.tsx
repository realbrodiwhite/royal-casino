
import React from 'react';

const BingoCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="bingo card"
    {...props}
  >
    <rect x="15" y="15" width="70" height="70" rx="5" stroke="currentColor" strokeWidth="3" fill="none" />
    {/* BINGO letters */}
    <text x="25" y="30" fontSize="10" fill="currentColor" textAnchor="middle">B</text>
    <text x="39" y="30" fontSize="10" fill="currentColor" textAnchor="middle">I</text>
    <text x="53" y="30" fontSize="10" fill="currentColor" textAnchor="middle">N</text>
    <text x="67" y="30" fontSize="10" fill="currentColor" textAnchor="middle">G</text>
    <text x="81" y="30" fontSize="10" fill="currentColor" textAnchor="middle">O</text>
    {/* Grid lines */}
    <line x1="15" y1="35" x2="85" y2="35" stroke="currentColor" strokeWidth="1" />
    <line x1="32" y1="15" x2="32" y2="85" stroke="currentColor" strokeWidth="1" />
    <line x1="46" y1="15" x2="46" y2="85" stroke="currentColor" strokeWidth="1" />
    <line x1="60" y1="15" x2="60" y2="85" stroke="currentColor" strokeWidth="1" />
    <line x1="74" y1="15" x2="74" y2="85" stroke="currentColor" strokeWidth="1" />
    {/* Daubed circle */}
    <circle cx="53" cy="56" r="5" fill="currentColor" opacity="0.7" />
    <text x="25" y="50" fontSize="8" fill="currentColor" textAnchor="middle">10</text>
    <text x="39" y="65" fontSize="8" fill="currentColor" textAnchor="middle">22</text>
    <text x="53" y="58" fontSize="8" fill="white" textAnchor="middle">F</text>
    <text x="67" y="45" fontSize="8" fill="currentColor" textAnchor="middle">50</text>
    <text x="81" y="72" fontSize="8" fill="currentColor" textAnchor="middle">71</text>
  </svg>
);

export default BingoCategoryIcon;
