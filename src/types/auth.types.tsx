import { JwtPayload } from "jwt-decode";
import { User } from "./user.type";

export type TokenPayload = {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: string;
  };
  
 export  type SavingOtpTokenProps = {
    accessToken: string;
  };

  export type AuthContextProps = {
    saveToken: SavingOtpTokenProps | undefined;
    handleLogin: (tokenData: TokenPayload) => void;
    handleLogout: () => void;
    savingOtpToken: (tokenData: SavingOtpTokenProps) => void;
  };


 export interface MyToken extends JwtPayload {
    tokenType: string;
    userInfo: User;
  }

export type AuthHeaderType = { Authorization: string; 'Content-Type': string; 'X-RequestId': string; }