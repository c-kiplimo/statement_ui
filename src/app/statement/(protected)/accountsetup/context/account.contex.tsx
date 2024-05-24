import { createContext, useContext, useState } from 'react';

type accountType = {
    accountId: number;
    updateAccount: (accountId: number) => void;
};

const placeholderAccount: accountType = {
    accountId: 0,
    updateAccount: () => {}
};

const AccountProfileContext = createContext<accountType>(placeholderAccount);

export const AccountProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [accountId, setAccountId] = useState<number>(placeholderAccount.accountId);

    const updateAccount = (newAccountId: number = 0) => {
        setAccountId(newAccountId);
        console.log(updateAccount);
        
    };

    return (
        <AccountProfileContext.Provider value={{ accountId, updateAccount }}>
            {children}
        </AccountProfileContext.Provider>
    );
};



export const useAccountProfileContext = (): accountType => {
    const context = useContext(AccountProfileContext);
    if (context === undefined) {
        throw new Error('useAccountProfileContext must be used within an AccountProfileProvider');
    }
    return context;
};
