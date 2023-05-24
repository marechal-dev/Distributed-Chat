import { RouteObject } from "react-router-dom";

import { MainScreen } from "./MainScreen/MainScreen";
import { LoginScreen } from "./LoginScreen/LoginScreen";
import { RegisterScreen } from "./RegisterScreen/RegisterScreen";

export const LoginScreenRoute: RouteObject = {
  path: "/",
  element: <LoginScreen />,
};

export const RegisterScreenRoute: RouteObject = {
  path: "/",
  element: <RegisterScreen />,
};

export const MainScreenRoute: RouteObject = {
  path: "/chat",
  element: <MainScreen />,
};
