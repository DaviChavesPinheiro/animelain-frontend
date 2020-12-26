import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #333;
  border-radius: 5px;
  border: 2px solid #333;
  padding: 0 16px;
  color: #8c8c8c;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      color: #03a9f5;
      border-color: ${shade(0.2, '#03a9f5')};
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #03a9f5;
    `}

  & + div {
    margin-top: 12px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: #8c8c8c;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled.span`
  display: block;
  color: #e87c03;
  font-size: 13px;
  margin: 5px 0px 8px 0px;
  padding-left: 5px;
`;
