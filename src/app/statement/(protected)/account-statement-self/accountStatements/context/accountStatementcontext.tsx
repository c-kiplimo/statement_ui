import React, { createContext, useContext, useState } from 'react';

// Create a context for statementRequestId
const StatementRequestIdContext = createContext({});

// Custom hook to access and update statementRequestId.......
export const useStatementRequestId = () => {
  return useContext(StatementRequestIdContext);
};



// Provider component to wrap your app and manage statementRequestId
export const StatementRequestIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [statementRequestId, setStatementRequestId] = useState(null);

  // Function to set statementRequestId
  const setRequestId = (requestId:any) => {
    setStatementRequestId(requestId);
  };

  return (
    <StatementRequestIdContext.Provider value={{ statementRequestId, setRequestId }}>
      {children}
    </StatementRequestIdContext.Provider>
  );
};



//to use in other files
import { useStatementRequestId } from './StatementRequestIdContext'; // Import statementRequestId context
const { setRequestId } = useStatementRequestId(); // Get setRequestId function from context

