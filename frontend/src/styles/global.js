import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Roboto:wght@300;400;500;700&display=swap");
  :root{
    --color-primary: #2e86ab;
    --color-text-clear: #fff;
    --color-text: #565554;
    --color-button: #43c2f7;
  }
  body, #root {
    border: 0px;
    margin: 0px;
    width: 100vw;
    height: 100vh;
    outline: none;
    color: var(--color-text);
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    overflow-x: hidden
  }
`;
