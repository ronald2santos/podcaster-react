import { createContext, useContext, useState, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const LoadingContext = createContext<any>({});

export function LoadingProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  return context;
}
