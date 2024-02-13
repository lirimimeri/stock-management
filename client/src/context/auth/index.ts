import { createContext } from "react";

export interface User {
  _id: string;
  email: string;
}

export interface AuthContextProps {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const defaultContextValue: AuthContextProps = {
  token: null,
  user: null,
  login: () => {},
  logout: () => {}
};


export const authContext = createContext<AuthContextProps>(defaultContextValue);