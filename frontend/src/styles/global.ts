import {createGlobalStyle} from "styled-components"
import theme from './theme'

 export default createGlobalStyle`
    :focus {
    outline: transparent;
    box-shadow: 0 0 0 2px ${theme.COLORS.DC_400};
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
      height: 100%;
    }

    body {
      background: ${theme.COLORS.DC_800};
      color: ${theme.COLORS.DC_50};

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

    button {
      cursor: pointer;
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