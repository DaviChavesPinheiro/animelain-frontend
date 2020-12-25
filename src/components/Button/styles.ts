import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  height: 48px;

  border-radius: 5px;
  border: 0;

  margin-top: 28px;
  padding: 0 16px;

  font-weight: 500;
  color: white;
  background: #03a9f5;

  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#03A9F5')};
  }
`;
