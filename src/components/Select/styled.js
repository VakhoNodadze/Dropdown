import styled, { css } from 'styled-components';

const StyledSelect = styled.div`
  position: relative;
  width: 100%;

  & > .content {
    ${(props) =>
    props.disabled &&
      css`
        background-color: ${props.theme.color.disabled};
        cursor: not-allowed;
      `};
    ${(props) =>
    props.isOpen &&
      css`
        border-color: #2675fe !important;
      `};
    ${(props) => {
    switch (props.attached) {
    case 'right':
      return css`
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          `;
    default:
      return null;
    }
  }};

    & > .placeholder {
      font-size: ${(props) => props.theme.fontSize[props.size]};
      padding: 0 ${(props) => props.theme.spacing[props.size] * 2}px;
      padding-left: ${(props) =>
    (props.hasIcon ? `${props.theme.spacing.extraHuge}px` : `${props.theme.spacing[props.size] * 2}px`)};
    }

    & > .chevron {
      font-size: ${(props) => props.theme.fontSize[props.size]};
      padding: 0 ${(props) => props.theme.spacing[props.size] * 2}px;
    }
  }

`;

const StyledSelectContent = styled.div`
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  min-height: ${(props) => props.theme.elementSize[props.size]};
  /* padding: ${(props) => props.theme.spacing.small}px; */
  padding-right: ${(props) => props.theme.spacing.big}px;
  cursor: ${(props) => (props.search ? 'inherit' : 'pointer')};
  transition: all ${(props) => props.theme.duration.default}ms ${(props) => props.theme.animation.easeInOut};

  &:hover {
    border-color: ${(props) => props.theme.color.borderHover};
  }

  ${({ variant, theme, error }) => {
    switch (variant) {
    case 'basic':
      return css`
          border: 0;
          border-radius: 0;
          background-color: transparent;
        `;
    default:
      return css`
          border: solid 1px ${theme.color.border};
          border-radius: ${theme.borderRadius.default};
          border-color: ${error ? theme.color.danger : theme.color.border};
          background-color: ${theme.color.elementBg};
        `;
    }
  }};
`;

const StyledInput = styled.input`
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%; */
  height: 100%;
  /* width: 100%; */
  padding-left: ${(props) =>
    (props.hasIcon ? `${props.theme.spacing.extraHuge}px` : `${props.theme.spacing[props.size] * 2}px`)};
  padding-right: ${(props) =>
    (props.hasRightAbsolute ? `${props.theme.spacing.large}px` : `${props.theme.spacing[props.size] * 2}px`)};
  ${(props) =>
    props.hasTags &&
    css`
      padding-left: 12px;
    `};
  border: none;
  background: transparent;
  font-size: ${(props) => props.theme.fontSize.default};
  color: ${(props) => props.theme.color.secondary};

  &:focus {
    outline: 0;
  }
  &::placeholder {
    color: ${(props) => props.theme.color.placeholder};
  }
`;

const StyledSearchBox = styled.input`
  font-size: ${(props) => props.theme.fontSize.default};
  color: ${(props) => props.theme.color.secondary};
  width: 100%;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.color.border};
  padding: 6px;

  &::placeholder {
    color: ${(props) => props.theme.color.placeholder};
  }
`;


const StyledOptions = styled.div`
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  position: absolute;
  left: ${({ person }) => (person ? '-100%' : '0')};
  right: ${({ calendar }) => (calendar ? '-100%' : '0')};
  top: ${(props) => (props.containerDimensions ? props.containerDimensions.height + 2 : 2)}px;
  border: solid 1px ${(props) => props.theme.color.border};
  box-shadow: ${(props) => props.theme.boxShadow.default};
  border-radius: ${(props) => props.theme.borderRadius.default};
  background-color: ${(props) => props.theme.color.elementBg};
  max-height: ${(props) => (props.isOpen ? '200px' : '0px')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  overflow: auto;
  padding: ${(props) => props.theme.spacing.small}px 0;
  z-index: 11;
  transition: all ${(props) => props.theme.duration.shortest}ms ${(props) => props.theme.animation.easeInOut};

  & > .item {
    & > div > .excludeButton {
      display: none;
      position: absolute;
      top: -3px;
      right: 0px;
    }

    &:hover {
      & > div > .excludeButton {
        display: block;
      }
    }
  }
`;

const StyledOptionItem = styled.div`
  padding: ${(props) => props.theme.spacing.default}px ${(props) => props.theme.spacing.big}px;
  cursor: pointer;
  color: ${(props) => props.theme.color.secondary};
  font-size: 12px;
  background-color: ${(props) => (props.isSelected ? 'rgba(0,0,0, .02)' : '#fff')};
  transition: all ${(props) => props.theme.duration.shortest}ms ${(props) => props.theme.animation.easeInOut};

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.4;
    `};

  ${({ isHoverable }) =>
    isHoverable &&
    css`
      &:hover {
        background-color: ${(props) => props.theme.color.elementHover};
      }
    `};
`;

const StyledPlaceholder = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 ${(props) => props.theme.spacing[props.size] * 2}px;
  padding-left: ${(props) =>
    (props.hasIcon ? `${props.theme.spacing.extraHuge}px` : `${props.theme.spacing[props.size] * 2}px`)};
  font-size: ${(props) => props.theme.fontSize.default};
  color: ${(props) => (props.active ? props.theme.color.secondary : props.theme.color.placeholder)};
  margin-left: ${(props) => props.marginLeft}px;
  cursor: pointer;
`;

const StyledIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0 ${(props) => props.theme.spacing.big}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSpinner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${(props) => props.theme.spacing.small}px;
  z-index: 100;
`;

const StyledCheckbox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: solid 1px ${(props) => props.theme.color.border};
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;

  ${({ isChecked, theme }) =>
    isChecked &&
    css`
      background-color: ${theme.color.primary};
    `};

  ${({ excluded, theme }) =>
    excluded &&
    css`
      background-color: ${theme.color.danger};
    `};
`;

const StyledChevronDown = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  height: ${(props) => props.theme.elementSize[props.size]};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${(props) => props.theme.spacing.large};
`;

const StyledClear = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0 ${(props) => props.theme.spacing.big}px;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const StyledTags = styled.div`
  /* position: absolute; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 0 0 ${(props) => props.theme.spacing.default};

  & > div:not(:last-child) {
    margin-right: 4px;
  }

  height: ${(props) => props.theme.elementSize[props.size]};
`;

export {
  StyledSelect,
  StyledSelectContent,
  StyledInput,
  StyledOptions,
  StyledOptionItem,
  StyledPlaceholder,
  StyledIcon,
  StyledSpinner,
  StyledCheckbox,
  StyledChevronDown,
  StyledClear,
  StyledTags,
  StyledSearchBox
};
