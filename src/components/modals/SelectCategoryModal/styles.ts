import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface CategoryElementProps {
  selected: boolean;
}

export const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Content = styled.main`
  background-color: #1e1e1e;
  border-radius: 5px;

  margin: 3% auto;
  padding: 20px;

  width: 100%;
  max-width: 1150px;
`;

export const Header = styled.header`
  display: flex;

  align-items: center;

  padding: 10px 0px;

  margin-bottom: 50px;

  h2 {
    flex: 1;
    font-size: 2;
    color: #565656;
  }

  a {
    text-decoration: none;

    border-radius: 5px;

    padding: 8px 18px;

    font-weight: 500;
    color: white;
    background: #03a9f5;

    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, '#03A9F5')};
    }
  }

  button {
    border-radius: 5px;
    border: none;

    padding: 8px 18px;
    margin-right: 20px;

    font-weight: 500;
    color: white;
    background: #03a9f5;

    font-size: 1em;

    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, '#03A9F5')};
    }

    &:disabled {
      background: ${shade(0.7, '#03A9F5')};
      color: ${shade(0.7, '#ffffff')};
      cursor: default;
    }
  }
`;

export const Body = styled.div``;

export const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-top: 50px;
`;

export const CategoryElement = styled.button<CategoryElementProps>`
  display: flex;
  align-items: center;

  padding: 5px 10px;

  margin: 0px 10px;
  margin-bottom: 20px;

  border: 1px solid #565656;
  border-radius: 5px;

  color: #565656;

  background: transparent;

  ${props =>
    props.selected &&
    css`
      border: 1px solid #03a9f5;
      color: #03a9f5;
    `}
`;
