
import React from 'react';

const LotteryCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="lottery balls drawing"
    {...props}
  >
    {/* Ball 1 */}
    <circle cx="30" cy="40" r="12" fill="skyblue" stroke="currentColor" strokeWidth="1.5" />
    <text x="30" y="44" fontSize="10" fill="black" textAnchor="middle">7</text>
    {/* Ball 2 */}
    <circle cx="50" cy="60" r="12" fill="lightcoral" stroke="currentColor" strokeWidth="1.5" />
    <text x="50" y="64" fontSize="10" fill="black" textAnchor="middle">23</text>
    {/* Ball 3 */}
    <circle cx="70" cy="40" r="12" fill="lightgreen" stroke="currentColor" strokeWidth="1.5" />
    <text x="70" y="44" fontSize="10" fill="black" textAnchor="middle">42</text>
    {/* Stars/Sparkles */}
    <path d="M15 30 L 20 20 L 25 30 L 35 25 L 25 35 L 20 45 L 15 35 L 5 25 Z" fill="gold" />
    <path d="M75 70 L 80 60 L 85 70 L 95 65 L 85 75 L 80 85 L 75 75 L 65 65 Z" fill="gold" />
  </svg>
);

export default LotteryCategoryIcon;
