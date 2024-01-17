import React, { ReactNode, createContext, useContext, useState } from "react";
import { UserInfo } from "@/types";

interface ContextValuesType {
  setPurchasedTemplates: React.Dispatch<
    React.SetStateAction<PurchasedTemplatesType[]>
  >;
  purchasedKits: PurchasedTemplatesType[];
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DataContext = createContext<ContextValuesType>(
  {} as ContextValuesType
);

type PurchasedTemplatesType = {
  id: string;
  name: string;
  ref: string;
};

function DataContextProvider({ children }: { children: ReactNode }) {
  const [purchasedKits, setPurchasedTemplates] = useState<
    PurchasedTemplatesType[]
  >([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const contextValues: ContextValuesType = {
    userInfo,
    setUserInfo,
    globalLoading,
    setGlobalLoading,
    purchasedKits,
    setPurchasedTemplates,
    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
