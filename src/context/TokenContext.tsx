import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useCookie from "react-use-cookie";
import jwt_decode from "jwt-decode";

interface TokenContextProps {
  children: ReactNode;
}

export const tokenContext = createContext<
  | {
      token: string | null;
      setToken: (token: string) => void;
      user: { name: string; id: number } | null;
    }
  | { token: null; setToken: null; user: null }
>({ token: null, setToken: null, user: null });

const TokenContext: React.FC<TokenContextProps> = ({ children }) => {
  const [cookieToken, setCookieToken] = useCookie("token", "");

  const [contextToken, setContextToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof cookieToken === "string" && cookieToken !== null) {
      setContextToken(cookieToken);
    }
  }, [cookieToken]);

  const token = useMemo(() => contextToken, [contextToken]);

  const setToken = (token: string) => {
    setCookieToken(token);
    setContextToken(token);
  };

  const user = useMemo(() => {
    if (contextToken) {
      return jwt_decode<{ name: string; id: number }>(contextToken);
    }
    return null;
  }, [contextToken]);

  return (
    <tokenContext.Provider value={{ token, setToken, user }}>
      {children}
    </tokenContext.Provider>
  );
};

export default TokenContext;
