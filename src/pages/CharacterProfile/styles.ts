import styled from 'styled-components';
import { shade } from 'polished';

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
