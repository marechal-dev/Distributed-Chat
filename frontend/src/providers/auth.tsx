import axios, { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { env } from "../configs/env";

interface UserData {
  nickname: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  handleLogin: (data: LoginData) => Promise<void>;
  handleLogout: () => void;
  nickname: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nickname, setNickname] = useState<string>("");

  const handleLogin = async ({ email, password }: LoginData): Promise<void> => {
    try {
      const { data }: AxiosResponse<UserData> = await axios.post(
        `${env.VITE_AUTH_SERVER_URL}/users/authenticate`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("nickname", data.nickname);

      setNickname(data.nickname);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível entrar");
        }
      } else {
        alert("Não foi possível entrar");
      }
    }
  };

  const handleLogout = (): void => {
    setNickname("");
    localStorage.removeItem("nickname");
  };

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, [nickname]);

  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout, nickname }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "useAuthContext deve ser usado dentro de um AuthContextProvider"
    );
  }

  return authContext;
};
