import styled from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  backgroundColor?: string;
  color?: string;
}

export const Container = styled.button<ButtonProps>`
  width: 100%;
  height: 48px;

  border-radius: 5px;
  border: 0;

  margin-top: 28px;
  padding: 0 16px;

  font-weight: 500;
  color: ${props => props.color || 'white'};
  background: ${props => props.backgroundColor || '#03a9f5'};

  transition: background-color 0.2s;
  &:hover {
    background: ${props => shade(0.2, props.backgroundColor || '#03a9f5')};
  }
`;
