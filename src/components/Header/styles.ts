import styled from 'styled-components';

export const Container = styled.header`
  padding: 16px 0;
  background: #1e1e1e;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  a {
    img {
      height: 30px;
    }
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #f4ede8;
    }
    a {
      text-decoration: none;
      color: #03a9f5;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const ImageContainer = styled.section`
  width: 56px;
  height: 56px;
  border-radius: 50%;

  overflow: hidden;

  background-color: #343434;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    object-fit: cover;
  }
`;
