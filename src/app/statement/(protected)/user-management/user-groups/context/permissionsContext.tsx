import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type GroupContextType = {
  groupName: string;
  description: string;
  permissions: string[];
  setGroupName: (name: string) => void;
  setDescription: (description: string) => void;
  setPermissions: (permissions: string[]) => void;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {}, [groupName, description, permissions]);

  return (
    <GroupContext.Provider
      value={{
        groupName,
        description,
        permissions,
        setGroupName,
        setDescription,
        setPermissions,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};

export { GroupProvider, useGroup };
