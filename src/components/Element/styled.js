import styled from 'styled-components';
import {
  color,
  space,
  typography,
  layout,
  border,
  flexbox,
  grid,
  position,
  shadow,
  variant,
  system
} from 'styled-system';

const StyledElement = styled.div`
  ${(props) =>
    variant({
      prop: 'kind',
      variants: props.kinds
    })}
  ${(props) =>
    variant({
      prop: 'size',
      variants: props.sizes
    })}
  ${(props) =>
    variant({
      prop: 'color',
      variants: props.colors
    })}
  ${color}
  ${space}
  ${typography}
  ${layout}
  ${border}
  ${flexbox}
  ${grid}
  ${position}
  ${shadow}
  ${system({
    cursor: true
  })}
  ${system({
    transform: true
  })}
  ${system({
    transformOrigin: true
  })}
  ${system({
    pointerEvents: true
  })}
  ${system({
    transition: true
  })}
  ${system({
    content: true
  })}
`;

export { StyledElement };
