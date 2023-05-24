
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";


export function App() {
  return (<ThemeProvider theme={theme}></ThemeProvider>)
}
