import React, { createContext, useContext, useState, ReactNode } from 'react';

type Permissions = {
  viewAccountDetails: boolean;
  viewTransactions: boolean;
  manageAccounts: boolean;
  generateAccountReports: boolean;
  query?:boolean;
};

type PermissionsContextType = {
  permissions: Permissions;
  handleChange: (name: keyof Permissions, checked: boolean) => void;
};

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

type AccountPermissionsProps = {
  children: ReactNode;
};

const AccountPermissions: React.FC<AccountPermissionsProps> = ({ children }) => {
  const [permissions, setPermissions] = useState<Permissions>({
    viewAccountDetails: true,
    viewTransactions: true,
    manageAccounts: false,
    generateAccountReports: true,
  });

  const handleChange = (name: keyof Permissions, checked: boolean) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  return (
    <PermissionsContext.Provider value={{ permissions, handleChange }}>
      <div>
        <h2>Account Permissions</h2>
        <form>{children}</form>
      </div>
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};

export default AccountPermissions;
