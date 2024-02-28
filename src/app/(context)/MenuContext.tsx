"use client";

import { ReactNode, createContext, useState } from "react";

export const MenuContext = createContext({});

interface MenuContextProviderProps {
  children: ReactNode;
}

const MenuContextProvider = ({ children }: MenuContextProviderProps) => {
  const [expanded, setExpanded] = useState(false);

  const Toggle = () => {
    console.log("toggled on Click");
    setExpanded((prev) => !prev);
  };

  return (
    <MenuContext.Provider value={{ expanded, Toggle }}>
      <ul className="flex-1 px-0">{children}</ul>
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
