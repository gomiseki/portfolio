import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import background from '../images/screenshot.webp';

const GlobalStyle = createGlobalStyle`
  ${reset};
  body{
    background-image: url(${background});
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
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
      background-color: #745726;
      border-radius: 4px;
  }
`;

export default GlobalStyle;
