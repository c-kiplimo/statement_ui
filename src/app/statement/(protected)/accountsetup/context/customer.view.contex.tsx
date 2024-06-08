
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserType = {
    userId: number;
    updateUser: (userId: number) => void;
};

const placeholderUser: UserType = {
    userId: 0,
    updateUser: () => {}
};

const UserProfileContext = createContext<UserType>(placeholderUser);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setuserId] = useState<number>(placeholderUser.userId);

    const updateUser = (newuserId: number) => {
        console.log(`updateUser called with: ${newuserId}`); 
        setuserId(newuserId);
        console.log(`userId state updated to: ${newuserId}`); 
    };

    return (
        <UserProfileContext.Provider value={{ userId, updateUser }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useViewUserProfileContext = (): UserType => {
    const context = useContext(UserProfileContext);
    if (context === undefined) {
        throw new Error('useUserProfileContext must be used within an UserProfileProvider');
    }
    return context;
};
