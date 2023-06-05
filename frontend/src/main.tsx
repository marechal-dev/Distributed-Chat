import React from "react";
import ReactDOM from "react-dom/client";

import { Routes } from "./routes"
import { ThemeProvider } from "styled-components";
import {theme} from "./styles/theme.ts";
import Global from "./styles/global.ts";
import { AuthContextProvider } from "./providers/auth.tsx";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
     <ThemeProvider theme={theme}>
      <Global/>
      <AuthContextProvider>
        <Routes/>
      </AuthContextProvider>
    </ThemeProvider> 
   </React.StrictMode>
);
