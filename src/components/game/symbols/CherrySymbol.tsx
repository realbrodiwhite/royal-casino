
import React from 'react';

const CherrySymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    {...props}
    data-ai-hint="cherry fruit"
  >
    <g transform="translate(0 -2)">
      <path d="M60,45 A15,15 0 0,1 60,75 A15,15 0 0,1 60,45" fill="#FF0000" stroke="#800000" strokeWidth="2"/>
      <path d="M40,50 A15,15 0 0,1 40,80 A15,15 0 0,1 40,50" fill="#FF0000" stroke="#800000" strokeWidth="2"/>
      <path d="M60,45 Q55,20 50,20 M40,50 Q45,25 50,20" stroke="#006400" strokeWidth="3" fill="none"/>
      <ellipse cx="50" cy="18" rx="5" ry="3" fill="#008000"/>
    </g>
  </svg>
);

export default CherrySymbol;
