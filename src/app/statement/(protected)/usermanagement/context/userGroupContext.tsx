import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

type FormContextType = {
  formData: UserGroup;
  setFormData: Dispatch<SetStateAction<UserGroup>>;
};

const defaultFormData: UserGroup = {
  groupName: '',
  description: '',
  permission: [],
};

const FormContext = createContext<FormContextType>({
  formData: defaultFormData,
  setFormData: () => {}
});

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<UserGroup>(defaultFormData);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
