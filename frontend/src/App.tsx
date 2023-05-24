import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  LoginScreenRoute,
  RegisterScreenRoute,
  MainScreenRoute,
} from "./pages/Routes";

const BrowserRouter = createBrowserRouter(
  [LoginScreenRoute, RegisterScreenRoute, MainScreenRoute],
  {
    basename: "/",
  }
);

export function App() {
  return <RouterProvider router={BrowserRouter} />;
}
