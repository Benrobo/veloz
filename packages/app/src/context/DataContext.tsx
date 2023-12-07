import React, { ReactNode, createContext, useContext, useState } from "react";
import { ProjectType, TechStackPricingPlan } from "@veloz/shared/types";
import FreemiumModal from "@/components/FreemiumModal";
import { UserInfo } from "@/types";

interface ContextValuesType {
  setPurchasedTemplates: React.Dispatch<
    React.SetStateAction<PurchasedTemplatesType[]>
  >;
  purchasedTemplates: PurchasedTemplatesType[];
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [purchasedTemplates, setPurchasedTemplates] = useState<
    PurchasedTemplatesType[]
  >([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [globalLoading, setGlobalLoading] = useState(false);

  const contextValues: ContextValuesType = {
    userInfo,
    setUserInfo,
    globalLoading,
    setGlobalLoading,
    purchasedTemplates,
    setPurchasedTemplates,
  };

  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
