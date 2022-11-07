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
    color: #ede3cf;
    font-size: xx-large;
    font-weight: bolder;
    border-bottom: 1px solid #32281e;
    padding-bottom: 10px;
    margin-bottom: 50px;
  }
  h2{
    color: #cdbe91; 
    font-size: large;
    font-weight: bold;
  }
  h3{
    color: #f7f8fc;
    font-weight: medium;
    margin: 15px;
  }
`;

export default GlobalStyle;
