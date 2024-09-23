import { jwtDecode } from "jwt-decode";
import { User } from "../../types/user.type";
import { MyToken, TokenPayload } from "../../types/auth.types";

const tokenKey: string ="tokenDetails"
const AuthServiceProvider = () => {

  const storeToken = (tokenDetails: TokenPayload,rememberMe:boolean=false) => {
    if (tokenDetails && tokenDetails.accessToken) {
      localStorage.setItem(tokenKey, JSON.stringify(tokenDetails));
    }
  };

  const removeToken = () => {
    localStorage.removeItem(tokenKey);
  };

  const fetchTokenFromStorage =()=>{
    let token  = localStorage.getItem(tokenKey);
    if (token) {
      let tokenDetails:TokenPayload = JSON.parse(token);
      return tokenDetails;
    }
  }

  const getToken = () => {
    return fetchTokenFromStorage();
  };

  const refreshToken = () => {
    return fetchTokenFromStorage()?.refreshToken;
  };


  const isTokenValid = () => {
    let tokenDetails = getToken()
    if (tokenDetails) {
      let accessToken = tokenDetails.accessToken;
      const decoded = jwtDecode(accessToken);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return true;
      }
    }
    return false;
  };

  const loggedIn:()=> boolean = ()=>{
    return isTokenValid();
  }

  const getLoggedInUser:()=> User = ()=>{

    const token = getToken()
    
    if(token){
      let decodedjwt = jwtDecode<MyToken>(token.accessToken);
      let userInfo =decodedjwt.userInfo;
      if(userInfo){
        let myUser:User={
          id: userInfo.userName,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          userName: userInfo.userName,
          email: userInfo.email,
          mobileNumber: userInfo.mobileNumber,
          mfaEnabled: userInfo.mfaEnabled,
          mfaRegistered: userInfo.mfaRegistered,
          securityQuestionEnabled: userInfo.securityQuestionEnabled,
          consent: userInfo.consent,
          profileComplete:userInfo.profileComplete,
        }
        return myUser;
      }
      console.log("Decoded user'sInfo>>",decodedjwt?.userInfo)
    }
    throw new Error("Invalid User , please login ")
    
  }

  const logout = () => {
    removeToken()
  };

  return {
    storeToken,
    removeToken,
    getToken,
    refreshToken,
    isTokenValid,
    loggedIn,
    getLoggedInUser,
    logout
  };
};

export { AuthServiceProvider};