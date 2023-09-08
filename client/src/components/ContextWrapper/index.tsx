'use client';

import React, { createContext, useState } from 'react';

export interface ContextState {
  isUser: boolean;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<ContextState>({} as ContextState);

interface ContextWrapper {
  children: React.ReactNode | React.ReactNode[];
}

const ContextWrapper = ({ children }: ContextWrapper) => {
  const [isUser, setIsUser] = useState(false);

  return (
    <Context.Provider value={{ isUser, setIsUser }}>
      {children}
    </Context.Provider>
  );
};

export default ContextWrapper;
