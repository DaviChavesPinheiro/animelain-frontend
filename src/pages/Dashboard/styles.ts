import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;

  div + div {
    margin-top: 20px;
  }
`;

export const Anime = styled.div`
  flex: 1;

  display: flex;

  padding: 32px 32px;
  margin: 0px 20px;

  background: #1e1e1e;

  border-radius: 8px;

  > div {
    padding-left: 20px;

    display: flex;
    flex-direction: column;

    h2 {
      font-size: 2em;
    }

    p {
      flex: 1;
      padding: 5px 0px;

      color: #6e6e6e;
      line-height: 22px;
    }

    span {
      color: #6e6e6e;
      margin-right: 5px;
      font-size: 0.8em;

      display: flex;
      align-items: center;

      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const ImageContainer = styled.aside`
  width: 120px;
  height: 170px;

  border-radius: 3px;

  margin: auto 0px;

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
