import { User } from "@/src/types/user.type";
import { ReactNode, createContext, useContext, useState } from "react";

//declare type 
type UserContextType = {
   user: User,
   updateUser:(user:User)=> void,
}


//implement type
let placeHolderUser:UserContextType={
    user:{
        id: '',
        firstName: '',
        lastName: "",
        userName: "",
        email: "",
        mobileNumber: "",
        mfaEnabled: false,
        mfaRegistered: false,
        securityQuestionEnabled: false,
        consent: false
    },
    updateUser:(user)=> {
        
    }
}

//create context passing in the type implementation
export const UserContext = createContext<UserContextType>(placeHolderUser);









export const UserProvider =({ children }: { children: React.ReactNode })=>{

    const [user,setUser] = useState<User>({})

    
    function updateUser(user:User){
        setUser(user)

    }

    return (
        
        <UserContext.Provider value={{user,updateUser}}>
          {children}
          <p>u{user.firstName}</p>
        </UserContext.Provider>
    )
}


export const useUserContext= ()=>{
    return useContext(UserContext);

}














export const useUserContexts= ()=>{

    const {user,updateUser} = 

    return (
        <>
        <UserProvider>
            <p></p>



        </UserProvider>
      
        </>
        
    );
}