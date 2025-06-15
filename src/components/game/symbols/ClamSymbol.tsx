
import React from 'react';

const ClamSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    data-ai-hint="clam shell"
    {...props}
  >
    <path d="M20 70 Q50 50 80 70 A40 20 0 0 0 20 70 Z" fill="sandybrown" stroke="sienna" strokeWidth="3"/>
    <path d="M20 68 Q50 88 80 68 A40 20 0 0 1 20 68 Z" fill="lightgoldenrodyellow" stroke="sienna" strokeWidth="3"/>
  </svg>
);

export default ClamSymbol;
