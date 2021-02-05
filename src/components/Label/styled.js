import styled, { css } from 'styled-components';

const StyledLabel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;

  .avatar {
    margin-right: 10px;
  }

  ${(props) => {
    switch (props.size) {
    case 'small':
      return css`
          font-size: 11px;
          height: 18px;
          min-width: 18px;
          padding: 0 ${({ theme, size }) => theme.spacing[size]}px;
        `;
    default:
      return css`
          font-size: 13px;
          height: 24px;
          padding: 0 ${({ theme, size }) => theme.spacing[size] * 2.4}px;
        `;
    }
  }};

  ${(props) => {
    switch (props.color) {
    case 'primary':
      return css`
          background-color: ${props.theme.color[props.color]};
          color: #fff;
        `;
    case 'danger':
      return css`
          background-color: ${props.theme.color[props.color]};
          color: #fff;
        `;
    default:
      return css`
          background-color: ${props.theme.color[props.color]};
          color: rgba(0, 0, 0, 0.54);
        `;
    }
  }};

  ${(props) => {
    switch (props.variant) {
    case 'compact':
      return css`
          padding: 4px;
        `;
    case 'outlined':
      return css`
          color: ${props.theme.palette[props.color][1000]};
          border: 1px solid ${props.theme.palette[props.color][500]};
          background-color: transparent;
        `;
    case 'inverted':
      return css`
          color: ${props.theme.palette.inverted[1000]};
          border: 1px solid ${props.theme.palette.inverted[1000]};
          border-color: ${props.theme.palette.inverted[1000]};
        `;
    default:
      return null;
    }
  }};

  ${(props) =>
    props.numOfLines &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 174px;

      span,
      .tooltipTrigger {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 174px;
      }
    `};

  ${(props) =>
    props.clickable &&
    css`
      cursor: pointer;
    `};

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.64;
    `};

  &:hover {
    & > .remove {
      display: flex;
    }
  }
`;

const StyledRemove = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: none;
  align-items: center;
  justify-content: center;
  width: 24px;
  cursor: pointer;
`;

export { StyledLabel, StyledRemove };
