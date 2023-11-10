import React, { ReactNode, createContext, useContext, useState } from "react";
import { ProjectType, TechStackPricingPlan } from "@veloz/shared/types";
import FreemiumModal from "@/components/FreemiumModal";
import { UserInfo } from "@/types";

interface ContextValuesType {
  userPlan: TechStackPricingPlan;
  setUserPlan: React.Dispatch<React.SetStateAction<TechStackPricingPlan>>;
  pkgPlan: TechStackPricingPlan;
  setPkgPlan: React.Dispatch<React.SetStateAction<TechStackPricingPlan>>;
  togglePremiumModalVisibility: () => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DataContext = createContext<ContextValuesType>(
  {} as ContextValuesType
);

function DataContextProvider({ children }: { children: ReactNode }) {
  const [userPlan, setUserPlan] = useState<TechStackPricingPlan>("FREE_PKG");
  const [premiumModal, setPremiumModal] = useState(false);
  const [pkgPlan, setPkgPlan] =
    useState<TechStackPricingPlan>("ENTERPRISE_PKG");
  const togglePremiumModalVisibility = () => setPremiumModal(!premiumModal);
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [globalLoading, setGlobalLoading] = useState(false);

  const contextValues: ContextValuesType = {
    userPlan,
    setUserPlan,
    pkgPlan,
    setPkgPlan,
    togglePremiumModalVisibility,
    userInfo,
    setUserInfo,
    globalLoading,
    setGlobalLoading,
  };

  return (
    <DataContext.Provider value={contextValues}>
      {children}
      <FreemiumModal
        onClose={togglePremiumModalVisibility}
        isOpen={premiumModal}
        price_plan={pkgPlan}
      />
    </DataContext.Provider>
  );
}

export default DataContextProvider;
