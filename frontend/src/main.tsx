import React from "react";
import ReactDOM from "react-dom/client";

<<<<<<< HEAD
import { Routes } from "./routes"
import { ThemeProvider } from "styled-components";
import {theme} from "./styles/theme.ts";
import Global from "./styles/global.ts";
import { AuthContextProvider } from "./providers/auth.tsx";
=======
import { App } from "./App.tsx";
>>>>>>> b56b1041c4e7a57d38fd213981af57996bfd559c

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
