import axios from "axios";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import instance from "../apis/apiConfig";
import { AuthType } from "../types/authContextTypes";

const initAuth = {
  loggedIn: false,
  email: "",
  nickname: "",
};

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .post("/api/user/refresh")
      .then((res) => {
        if (res.data) {
          const {
            data: { accessToken, userEmail, userNickname },
          } = res;
          onSignin(accessToken, userEmail, userNickname);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const onSignin = (
    accessToken: string,
    userEmail: string,
    userNickname: string
  ) => {
    if (accessToken) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      setAuth({ loggedIn: true, email: userEmail, nickname: userNickname });
    }
    return;
  };

  const onSignout = () => {
    instance.defaults.headers.common["Authorization"] = "";
    setAuth(initAuth);
  };

  const value = React.useMemo(
    () => ({ auth, onSignin, onSignout, loading }),
    [auth, onSignin, setAuth, onSignout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
