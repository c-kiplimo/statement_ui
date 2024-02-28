"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { AuthServiceProvider } from "../../services/auth/authserviceProvider";
import { User } from "../../types/user.type";




type AuthContextProp={
  user?: User
  isLoggedIn: () => boolean
  logout:() => void
}

const contextVariables:AuthContextProp = {
  isLoggedIn:()=>{
    return false
  },
  logout:()=>{}

}


const AuthContext = createContext<AuthContextProp>(contextVariables);


type AuthContextProviderProps = {
  children: ReactNode;
}

const AuthenticationProvider: React.FC<AuthContextProviderProps> = ({
  children,
}:{children:ReactNode}) => {


  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] =useState<User| undefined>()


  const {getLoggedInUser,loggedIn,logout } = AuthServiceProvider();

  function isUserLoggedIn(){
    return loggedIn();
  }  

  function logOutUser(){
    setLoggedInUser(undefined)
    setIsLoggedIn(false)
     return logOutUser()
  }  

  const context: AuthContextProp={
    user:loggedInUser,
    isLoggedIn: ()=>isLoggedIn,
    logout: logOutUser
  }


  useEffect(()=>{
    setIsLoggedIn(loggedIn())
    if(isLoggedIn){
      setLoggedInUser(getLoggedInUser())
    }
  },[isLoggedIn])


  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};



// CREATE A HOOK TO EXPOSE THE AUTH CONTEXT
 const useAuth= () => {
    const context = useContext(AuthContext);
     if(context == undefined){
       throw new Error("Auth Context Is Mandatory")
     }
  return  context;
};

 const useAuthSession = () => {
  const context = useAuth();
   if(context == undefined){
     throw new Error("Auth Context Is Mandatory")
   }
  return  context.user;
};



 const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthenticationProvider,useAuth,useAuthContext,useAuthSession }