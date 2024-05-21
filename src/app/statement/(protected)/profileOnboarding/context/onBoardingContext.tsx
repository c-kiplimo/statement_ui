"use client"

import { createContext, useContext, useState } from "react";

type ProfileType ={
    profile:OnBoarding,
    updateProfile:(profile:OnBoarding)=>void,
}

let placeholderProfileType:ProfileType={
    profile:{
        email: "",
        mobileNumber: "",
        customerId: 0,
        country: "",
        customerName: "", 
    },
    updateProfile: (newProfile) => {},
}

const OnBoardingContext =createContext<ProfileType>(placeholderProfileType);

export const OnboardingProvider=({ children }: { children: React.ReactNode })=>{

    const [userProfile, setUserProfile] = useState<ProfileType>(placeholderProfileType);

    const updateProfile = (profile: OnBoarding) => {
        setUserProfile({ ...userProfile, profile });
    };
    
    return(
        <OnBoardingContext.Provider value={{profile: userProfile.profile, updateProfile}}>
            {children}
        </OnBoardingContext.Provider>
    )
}

export const useOnboardingContext=()=>{
    return useContext(OnBoardingContext);
}


