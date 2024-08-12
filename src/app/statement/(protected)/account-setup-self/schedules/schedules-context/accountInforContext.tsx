import React, { createContext, useState, ReactNode, useEffect } from "react";

export type AccountInfoType = {
  accountName: string;
  accountNumber: string;
  currency: string;
};

type AccountInfoContextType = {
  accountInfo: AccountInfoType;
  setAccountInfo: React.Dispatch<React.SetStateAction<AccountInfoType>>;
};

export const AccountInfoContext = createContext<AccountInfoContextType | undefined>(undefined);

export const AccountInfoProvider = ({ children }: { children: ReactNode }) => {
  const [accountInfo, setAccountInfo] = useState<AccountInfoType>({
    accountName: "",
    accountNumber: "",
    currency: "",
  });
  useEffect(() => {
    console.log("Updated account info:", accountInfo);
  }, [accountInfo]);

  return (
    <AccountInfoContext.Provider value={{ accountInfo, setAccountInfo }}>
      {children}
    </AccountInfoContext.Provider>
  );
};
