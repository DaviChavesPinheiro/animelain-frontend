import styled from 'styled-components';
import { shade } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div``;

export const Content = styled.section`
  max-width: 800px;
  margin: 24px auto;
  margin-bottom: 0px;

  padding: 40px 60px;

  display: flex;
  flex-direction: column;

  background-color: #1e1e1e;
  border-radius: 5px;

  form {
    width: 100%;

    h1 {
      font-weight: 500;
      margin-bottom: 30px;
    }
  }
`;

export const AvatarInput = styled.div`
  width: 186px;
  height: 260px;

  position: relative;

  border-radius: 3px;
  border: 5px solid #1e1e1e;

  margin: 0 auto;
  margin-top: -80px;
  margin-bottom: 50px;

  background-color: #343434;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 3px;
  }

  label {
    position: absolute;

    width: 48px;
    height: 48px;
    background-color: #03a9f5;
    border: none;
    border-radius: 50%;
    right: -10px;
    bottom: -10px;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#03a9f5')};
    }

    input {
      display: none;
    }
  }
`;

export const BannerInput = styled.div`
  width: 100%;
  height: 250px;

  position: relative;

  border-radius: 3px;

  margin: 0 auto;

  background-color: #343434;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 3px;
  }

  label {
    position: absolute;

    width: 48px;
    height: 48px;
    background-color: #03a9f5;
    border: none;
    border-radius: 50%;
    right: -10px;
    bottom: -10px;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#03a9f5')};
    }

    input {
      display: none;
    }
  }
`;

export const GenresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Genre = styled.div`
  display: flex;
  align-items: center;

  padding: 5px 10px;

  margin-bottom: 20px;

  border: 1px solid #565656;
  border-radius: 5px;

  a {
    text-decoration: none;
    color: #565656;
  }

  span {
    margin-left: 20px;
    color: #565656;
    font-size: 0.8em;
  }

  & + div {
    margin-left: 20px;
  }
`;

export const CharactersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const Character = styled(Link)`
  width: 186px;
  height: 260px;

  position: relative;

  border-radius: 3px;

  margin-bottom: 50px;

  background-color: #343434;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

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
