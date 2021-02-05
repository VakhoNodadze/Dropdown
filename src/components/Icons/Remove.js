import React from 'react';

export const RemoveSmall = ({ color, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 9} height={size || 9} viewBox="0 0 8.743 8.743">
    <g id="x_1_" data-name="x (1)" transform="translate(.707 .707)">
      <path
        id="Line_345"
        d="M7.329 0L0 7.329"
        style={{
          fill: 'none',
          stroke: color || 'rgba(0,0,0,0.54)',
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }}
        data-name="Line 345"
      />
      <path
        id="Line_346"
        d="M0 0l7.329 7.329"
        style={{
          fill: 'none',
          stroke: color || 'rgba(0,0,0,0.54)',
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }}
        data-name="Line 346"
      />
    </g>
  </svg>
);

export default RemoveSmall;
