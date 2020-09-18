import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html{
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after{
    box-sizing: inherit;
  }

  body{
    margin: 0;
    font-family: "Montserrat";
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
`;

export default GlobalStyles;
