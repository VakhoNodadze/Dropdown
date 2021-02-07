import React from 'react';

export const ChevronLeft = ({ color, size }) => (
  <svg width="8" height="14" viewBox="0 0 8 14" fill={ color || '#000' } xmlns="http://www.w3.org/2000/svg">
    <path d="M7 13L1 7L7 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

);

export default ChevronLeft;
