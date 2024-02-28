"use client";

import React, { createContext, useContext, useState } from "react";

const ActiveStepContext = createContext<any>({});

export function useActiveStep() {
  return useContext(ActiveStepContext);
}

export function ActiveStepProvider({ children }: any) {
  const [activeStep, setActiveStep] = useState();

  return (
    <ActiveStepContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </ActiveStepContext.Provider>
  );
}
