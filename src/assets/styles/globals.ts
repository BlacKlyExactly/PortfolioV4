import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html{
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after{
    box-sizing: inherit;
    font-family: "Montserrat";
  }

  body{
    margin: 0;
  }

  h1{
    margin: 0;
  }

  a,
  a:active,
  a:hover{
    color: inherit;
    text-decoration: inherit;
  }

  button {
    font-family: "Montserrat";
  }
`;

export default GlobalStyles;
