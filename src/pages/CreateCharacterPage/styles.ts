import styled from 'styled-components';
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

export const GoToAnimeCreatedLink = styled(Link)`
  display: flex;
  align-items: center;

  margin-top: 30px;

  align-self: center;
  text-decoration: none;
  color: #03a9f5;

  font-size: 1em;

  svg {
    margin-left: 20px;
  }
`;
