import styled from 'styled-components';
import { lighten, shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 800px;
  margin: 24px auto;
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
  width: 180px;
  height: 180px;

  position: relative;

  border-radius: 50%;

  margin: 0 auto;
  margin-bottom: 50px;

  background-color: #343434;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  label {
    position: absolute;

    width: 48px;
    height: 48px;
    background-color: #03a9f5;
    border: none;
    border-radius: 50%;
    right: 0;
    bottom: 0;
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
