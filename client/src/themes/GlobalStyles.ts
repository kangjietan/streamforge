import { createGlobalStyle } from "styled-components";
import Sanitize from './sanitize';

const GlobalStyles = createGlobalStyle`
  ${Sanitize}

  :root {
    --container-bg-color: hsla(0,0%, 100%, .05);
    --container-border-radius: 12px;
    --primary-text-color: #fff;
  }

  body {
    padding-bottom: 96px;
    background-color: #12141d;
    font-family: Inter, sans-serif;
    color: hsla(0,0%, 100%, .5);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
`;

export default GlobalStyles;
