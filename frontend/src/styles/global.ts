import { createGlobalStyle} from "styled-components"
import {theme} from "../styles/theme.ts"


 export default createGlobalStyle<{theme: typeof theme}>`
    :focus {
    outline: transparent;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.COLORS.DC_400};
  }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    * {
      margin: 0;
    }

    html,
    body {
      min-height: 100vh
    }

    body {
      background: ${({ theme }) => theme.COLORS.DC_800};
      color: ${({ theme }) => theme.COLORS.WHITE};

      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 1rem;

      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    img,
    picture,
    video,
    canvas,
    svg {
      display: block;
      max-width: 100%;
    }

    input,
    button,
    textarea,
    select {
      font: inherit;
    }
    a {
    text-decoration: none;
    } 

    button {
      cursor: pointer;
      border: none;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      overflow-wrap: break-word;
    }

    #root,
    #__next {
      isolation: isolate;
    }

    #root {
      height: 100%;
    }
 `