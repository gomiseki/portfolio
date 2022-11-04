import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
  html, body{
    max-width: 100%;
    max-height: 100%;
  }
  a{
    text-decoration: none;
  }

`;

export default GlobalStyle;
