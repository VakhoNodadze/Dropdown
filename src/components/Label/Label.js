import React from 'react';
import PropTypes from 'prop-types';
import { StyledLabel, StyledRemove } from './styled';

import { Remove } from 'components/Icons';

import { variants, colors, sizes } from '../../styled/oneOf';

const Label = ({ children, color, variant, numOfLines, onClick, onRemove, size, ...rest }) => {
  const handleClick = () => {
    if (onClick) {onClick();}
  };

  return (
    <StyledLabel
      variant={variant}
      numOfLines={numOfLines}
      onClick={handleClick}
      clickable={typeof onClick === 'function'}
      color={color}
      size={size}
      {...rest}
    >
      {onRemove && (
        <StyledRemove className="remove" onClick={onRemove}>
          <Remove />
        </StyledRemove>
      )}
    </StyledLabel>
  );
};

Label.propTypes = {
  variant: PropTypes.oneOf(variants),
  numOfLines: PropTypes.number,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  color: PropTypes.oneOf(colors),
  size: PropTypes.oneOf(sizes)
};

Label.defaultProps = {
  variant: 'default',
  numOfLines: null,
  onClick: null,
  onRemove: null,
  color: 'elementBgSecondary',
  size: 'default'
};

export default Label;
