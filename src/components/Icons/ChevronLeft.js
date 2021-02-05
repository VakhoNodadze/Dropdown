import React from 'react';

export const ChevronLeft = ({ color, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 7.206} height={size || 13.346} viewBox="0 0 7.206 13.346">
    <path
      id="prefix__chevron-down"
      d="M0 0l5.966 6 5.966-6"
      transform="rotate(90 2.896 3.603)"
      style={{
        fill: 'none',
        stroke: color || '#757575',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }}
    />
  </svg>
);

export default ChevronLeft;
