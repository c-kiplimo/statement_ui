"use client";
import React,{ createContext, useContext, useState } from "react";

type RoleType = {
  role: UserGroup;
  updateRole: (newRole: UserGroup) => void;
  updatePermissions: (newPermissions: string[]) => void;
};

let placeholderRoleType: RoleType = {
  role: {
    groupId: 0,
    customerId: 0,
    description: "",
    groupName: "",
    permission: [],
  },
  updateRole: (newRole) => {},
  updatePermissions: (newPermissions) => {},
};

const RoleContext = createContext<RoleType>(placeholderRoleType);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<UserGroup>(placeholderRoleType.role);

  const updateRole = (role: UserGroup) => {
    setUserRole({ ...userRole, ...role });
  };

  const updatePermissions = (permissions: string[]) => {
    setUserRole({ ...userRole, permission: permissions });
  };

  return (
    <RoleContext.Provider
      value={{ role: userRole, updateRole, updatePermissions }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRoleContext = () => {
  return useContext(RoleContext);
};
