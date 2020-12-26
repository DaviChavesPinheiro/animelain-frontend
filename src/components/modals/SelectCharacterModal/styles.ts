import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface CharactersContainerProps {
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

export const CharactersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  margin-top: 50px;
`;

export const CharacterContainer = styled.button<CharactersContainerProps>`
  width: 186px;
  height: 260px;

  position: relative;

  border-radius: 3px;
  border: 1px solid transparent;

  margin-bottom: 50px;

  background-color: #343434;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  ${props =>
    props.selected &&
    css`
      border: 1px solid #03a9f5;
    `}

  & + a {
    margin-left: 20px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 3px;
  }
`;

export const CharacterNameContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: #00000099;
  padding: 3px 5px;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: #9e9e9e;
    font-size: 1em;
  }
`;
