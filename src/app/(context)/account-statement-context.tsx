"use client";
import { createContext, useContext, useState } from "react";

type AccountStatementContextProp = {
  accountId: string;
  startDate: string;
  endDate: string;
  setAccountId: (accountId: string) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  onSubmit: () => void;
};

const AccountStatementContext = createContext<
  AccountStatementContextProp | undefined
>(undefined);

//create a hook to use the context
export const useAccountStatementContext = (): AccountStatementContextProp => {
  const context = useContext(AccountStatementContext);
  if (!context) {
    throw new Error(
      "useAccountStatementContext must be used within a AccountStatementContextProvider"
    );
  }
  return context;
};

//create a provider to wrap the app with
export const AccountStatementContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accountId, setAccountId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  //functions to handle the change of state
  const handleAccountIdChange = (accountId: string) => {
    setAccountId(accountId);
  };
  const handleStartDateChange = (startDate: string) => {
    setStartDate(startDate);
  };
  const handleEndDateChange = (endDate: string) => {
    setEndDate(endDate);
  };
  const onSubmit = () => {
    console.log("submitting...");
    console.log("accountId", accountId);
    console.log(
      `ON CONTEXT startDate ${startDate} and end date ${endDate} account statement ${setAccountId}`
    );
  };

  const contextValue: AccountStatementContextProp = {
    accountId,
    startDate,
    endDate,
    setAccountId: handleAccountIdChange,
    setStartDate: handleStartDateChange,
    setEndDate: handleEndDateChange,
    onSubmit,
  };

  return (
    <AccountStatementContext.Provider value={contextValue}>
      {children}
    </AccountStatementContext.Provider>
  );
};
