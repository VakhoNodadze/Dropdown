import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyledContainer } from './styled'
import * as icons from './index'

const IconItem = ({
  name, onClick, activeColor, defaultColor, ...rest
}) => {
  const Icon = name ? icons[name] : () => null
  const [isHovered, setIsHovered] = useState(false)


  return (
    <StyledContainer
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      <Icon color={isHovered ? activeColor : defaultColor} />
    </StyledContainer>
  )
}

IconItem.propTypes = {
  defaultColor: PropTypes.string,
  activeColor: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func
}

IconItem.defaultProps = {
  defaultColor: '#000',
  activeColor: '#000',
  onClick: () => {},
  name: ''
}

export default IconItem;
