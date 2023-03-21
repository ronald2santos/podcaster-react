import { createContext, useContext, useState, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const contextDefaultValue = {
  loading: false,
  setLoading: (loading: boolean) => {},
  error: false,
  setError: (error: boolean) => {},
};

type ContextValue = {
  loading: boolean;
  setLoading: Function;
  error: boolean
  setError: Function
};

const DataContext = createContext<ContextValue>(
  contextDefaultValue
);

export function DataContextProvider({ children }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const value = { loading, setLoading, error, setError };
  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
