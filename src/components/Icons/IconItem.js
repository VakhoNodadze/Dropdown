import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyledContainer } from './styled'
import * as icons from './index'

const IconItem = ({
  name, onClick, activeColor, defaultColor
}) => {
  const Icon = name ? icons[name] : () => null
  const [isHovered, setIsHovered] = useState(false)


  return (
    <StyledContainer onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
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
  defaultColor: '#292929',
  activeColor: '#2C62EA',
  onClick: () => {},
  name: ''
}

export default IconItem;
