import { useState, useEffect } from "react";
import { AuthServiceProvider } from "../services/auth/authserviceProvider";
import { TokenPayload } from "../types/auth.types";
import { User } from "../types/user.type";

const useUserSession = () => {
  const { getToken, storeToken, getLoggedInUser } = AuthServiceProvider();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const tokenData = getToken();
    if (tokenData) {
      setAccessToken(tokenData.accessToken);
      setUser(getLoggedInUser());
    }
  }, []);

  const updateUserSession = () => {
    const tokenData = getToken();
    if (tokenData) {
      setAccessToken(tokenData.accessToken);
      setUser(getLoggedInUser());
    }
  };

  const updateToken = (newTokenPayload: TokenPayload) => {
    setAccessToken(newTokenPayload.accessToken);
    storeToken(newTokenPayload);
  };

  return { accessToken, user, updateUserSession, updateToken };
};
export default useUserSession;
