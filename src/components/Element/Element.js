import React from 'react';

import { StyledElement } from './styled';

const Element = React.forwardRef(({ children, onClick, ...rest }, ref) => {
  return (
    <StyledElement {...rest} ref={ref} onClick={onClick}>
      {children}
    </StyledElement>
  );
});

Element.defaultProps = {
  as: 'div'
};

export default Element;
