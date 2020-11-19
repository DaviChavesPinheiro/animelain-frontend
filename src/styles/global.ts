import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #000;
    color: #fff

  }

  button {
    cursor: pointer;
  }

  body, input, button {
    font-family: 'Roboto', serif;
  }
`;
