"use client";

import utils from '@/packages/helpers/src/utils';
import { createContext, useContext, ReactNode } from 'react';
import { StoreType, initializeStore } from '@/packages/store/src';

// Create the Zustand context
export const ZustandContext = createContext<StoreType | null>(null);

// StoreProvider component
export default function StoreProvider({ children }: { children: ReactNode }) {
  const store = initializeStore();

  return (
    <ZustandContext.Provider value={store}>
      {children}
    </ZustandContext.Provider>
  );
}

// Custom hook to use the Zustand context
export function useZustandContext() {
  const ctx = useContext(ZustandContext);

  if (ctx === null) {
    throw utils.customError("useZustandContext must be used within a ZustandProvider");
  }

  return ctx;
}