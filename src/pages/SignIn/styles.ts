import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  position: absolute;
  left: 2%;
  top: 15px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;

  height: 600px;
  margin-top: 50px;
  padding: 40px 60px;

  background-color: #1e1e1e;
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  form {
    width: 100%;

    h1 {
      font-weight: 500;
      margin-bottom: 30px;
    }

    a {
      width: 100%;
      text-align: center;
      color: #fff;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#fff')};
      }
    }
  }

  > a {
    width: 100%;
    color: #666360;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: 20px;
    svg {
      margin-right: 8px;
    }
    &:hover {
      color: ${lighten(0.5, '#666360')};
    }
  }
`;
