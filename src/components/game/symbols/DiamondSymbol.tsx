
import React from 'react';

const DiamondSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    {...props}
    data-ai-hint="diamond gem"
  >
    <polygon points="50,10 10,40 50,90 90,40" fill="#B9F2FF" stroke="#00AEEF" strokeWidth="3"/>
    <line x1="10" y1="40" x2="90" y2="40" stroke="#00AEEF" strokeWidth="2"/>
    <line x1="50" y1="10" x2="30" y2="40" stroke="#00AEEF" strokeWidth="1.5"/>
    <line x1="50" y1="10" x2="70" y2="40" stroke="#00AEEF" strokeWidth="1.5"/>
    <line x1="50" y1="90" x2="30" y2="40" stroke="#00AEEF" strokeWidth="1.5"/>
    <line x1="50" y1="90" x2="70" y2="40" stroke="#00AEEF" strokeWidth="1.5"/>
  </svg>
);

export default DiamondSymbol;
