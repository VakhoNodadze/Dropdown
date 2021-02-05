import React from 'react';

export const Company = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || '13.414'} height={size || '7.207'} viewBox="0 0 13.414 7.207">
    <path
      id="prefix__chevron-down"
      d="M6 9l6 6 6-6"
      transform="translate(-5.293 -8.293)"
      style={{
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }}
      stroke="rgba(0,0,0,.54)"
    />
  </svg>
);

export default Company;
