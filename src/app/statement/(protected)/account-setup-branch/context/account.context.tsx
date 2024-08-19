
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type AccountType = {
    accountId: number;
    updateAccount: (accountId: number) => void;
};

const placeholderAccount: AccountType = {
    accountId: 0,
    updateAccount: () => {}
};

const AccountProfileContext = createContext<AccountType>(placeholderAccount);

export const AccountProfileProvider = ({ children }: { children: ReactNode }) => {
    const [accountId, setAccountId] = useState<number>(placeholderAccount.accountId);

    const updateAccount = (newAccountId: number) => {
        console.log(`updateAccount called with: ${newAccountId}`); 
        setAccountId(newAccountId);
        console.log(`accountId state updated to: ${newAccountId}`); 
    };

    return (
        <AccountProfileContext.Provider value={{ accountId, updateAccount }}>
            {children}
        </AccountProfileContext.Provider>
    );
};

export const useAccountProfileContext = (): AccountType => {
    const context = useContext(AccountProfileContext);
    if (context === undefined) {
        throw new Error('useAccountProfileContext must be used within an AccountProfileProvider');
    }
    return context;
};
