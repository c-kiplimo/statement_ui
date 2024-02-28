"use client";

import React, { createContext, useContext } from "react";

import SystemVariable from "@/src/constants/colors";
import { CoreProps } from "@/src/types/context.types";

type MotusThemeType = typeof SystemVariable;

const SystemContext = createContext<MotusThemeType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SystemContext.Provider value={SystemVariable}>
      {children}
    </SystemContext.Provider>
  );
};

export function useColors() {
  const colors = useContext(SystemContext);
  if (!colors) {
    throw new Error("useColors must be used within a ColorProvider");
  }

  return colors.colorVariables;
}

export function useTokens() {
  const colors = useContext(SystemContext);
  if (!colors) {
    throw new Error("useColors must be used within a ColorProvider");
  }

  return colors.tokens;
}

export function useFont() {
  const font = useContext(SystemContext);
  if (!font) {
    throw new Error("useColors must be used within a ColorProvider");
  }

  return font.font;
}

export function useSize() {
  const systemvariable = useContext(SystemContext);
  if (!systemvariable) {
    throw new Error("useColors must be used within a ColorProvider");
  }

  return systemvariable.size;
}

export function useCoreProps(): CoreProps {
  const systemvariable = useContext(SystemContext);
  if (!systemvariable) {
    throw new Error("useCoreProps must be used within a ColorProvider");
  }

  return {
    colorToken: systemvariable.tokens,
    font: systemvariable.font,
    size: systemvariable.size,
    colorVariables: systemvariable.colorVariables,
  };
}
