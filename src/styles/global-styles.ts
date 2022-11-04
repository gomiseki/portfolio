import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
  html, body{
  }
  a{
    text-decoration: none;
  }
  h1{
    color: #cdbe91;
    font-size: xx-large;
    font-weight: bolder;
    border-bottom: 1px solid #32281e;
    padding-bottom: 10px;
  }
  h2{
    color: #ede3cf;
    font-size: large;
    font-weight: bold;
  }
`;

export default GlobalStyle;
