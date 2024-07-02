
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type profileType = {
    accountId: number;
    updateAccount: (accountId: number) => void;
};

const placeholderAccount: profileType = {
    accountId: 0,
    updateAccount: () => {}
};

const ProfileContext = createContext<profileType>(placeholderAccount);

export const AccountProfileProvider = ({ children }: { children: ReactNode }) => {
    const [accountId, setAccountId] = useState<number>(placeholderAccount.accountId);

    const updateAccount = (newAccountId: number) => {
        console.log(`updateAccount called with: ${newAccountId}`); 
        setAccountId(newAccountId);
        console.log(`accountId state updated to: ${newAccountId}`); 
    };

    return (
        <ProfileContext.Provider value={{ accountId, updateAccount }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfileContext = (): profileType => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfileContext must be used within an AccountProfileProvider');
    }
    return context;
};
