
import React from 'react';

const KenoCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="keno numbers grid"
    {...props}
  >
    <rect x="10" y="20" width="80" height="60" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Sample numbers and selected cells */}
    <text x="20" y="35" fontSize="10" fill="currentColor">07</text>
    <circle cx="20" cy="31" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <text x="35" y="35" fontSize="10" fill="currentColor">15</text>
    <text x="50" y="35" fontSize="10" fill="currentColor">23</text>
    <text x="65" y="35" fontSize="10" fill="currentColor">38</text>
    <text x="80" y="35" fontSize="10" fill="currentColor">42</text>

    <text x="20" y="50" fontSize="10" fill="currentColor">51</text>
    <text x="35" y="50" fontSize="10" fill="currentColor">59</text>
    <circle cx="35" cy="46" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <text x="50" y="50" fontSize="10" fill="currentColor">66</text>
    <text x="65" y="50" fontSize="10" fill="currentColor">72</text>
    <text x="80" y="50" fontSize="10" fill="currentColor">80</text>

    <text x="20" y="65" fontSize="10" fill="currentColor">03</text>    
    <text x="35" y="65" fontSize="10" fill="currentColor">11</text>
    <text x="50" y="65" fontSize="10" fill="currentColor">29</text>
    <circle cx="50" cy="61" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <text x="65" y="65" fontSize="10" fill="currentColor">34</text>
    <text x="80" y="65" fontSize="10" fill="currentColor">49</text>
  </svg>
);

export default KenoCategoryIcon;
