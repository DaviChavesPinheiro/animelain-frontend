import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 16px 0;
  background: #1e1e1e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 30px;
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
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
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

  > img {
    width: 120px;
    height: 170px;

    border-radius: 3px;

    margin: auto 0px;
  }

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
