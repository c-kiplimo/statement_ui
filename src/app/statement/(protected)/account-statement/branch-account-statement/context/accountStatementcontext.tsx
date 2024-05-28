import React, { createContext, useContext, useState } from 'react';

export type accountNumTypes ={
  accountnumber:string;
  updateAccountNumber:(accountnumber:string)=>void
}

let accountPlaceholder:accountNumTypes={
  accountnumber: '',
  updateAccountNumber: (newAccount)=>{}
}

// Create a context for AccountNumber
export const AccountNumberContext = createContext<accountNumTypes>(accountPlaceholder);

// Custom hook to access and update AccountNumber.......
export const useAccountNumberContext = () => {
  return useContext(AccountNumberContext);
};


// Provider component to wrap your app and manage AccountNumber
export const AccountNumberProvider = ({ children }: { children: React.ReactNode }) => {
  const [statementAccountNo, setStatementAccountNo] = useState<accountNumTypes>(accountPlaceholder);

  // Function to set AccountNumber
  const updateAccountNumber = (accountnumber:string) => {
    setStatementAccountNo({...statementAccountNo, accountnumber});
  };

  return (
    <AccountNumberContext.Provider value={{ accountnumber:statementAccountNo.accountnumber, updateAccountNumber }}>
      {children}
    </AccountNumberContext.Provider>
  );
};



//to use in other files
// import { useStatementRequestId } from './AccountNumberContext'; // Import statementRequestId context
// const { setAccountNumber } = useStatementRequestId(); // Get setRequestId function from context

