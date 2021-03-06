import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        margin:0;
        padding:0;
    },
    html,
    body {
    width: 100%;
    height: 100%;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 14px;
        background-color:#FFFFFF;
    }
    ol, ul, li {
        list-style: none;
    }
    a{
        color: inherit;
        http://3.36.109.95/
    }
`;

export default GlobalStyles;