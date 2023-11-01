import React, { ReactNode, createContext, useContext, useState } from "react";
import { TechStackPricingPlan } from "../../types";
import FreemiumModal from "@/components/FreemiumModal";

interface ContextValuesType {
  userPlan: TechStackPricingPlan;
  pkgPlan: TechStackPricingPlan;
  setPkgPlan: (plan: TechStackPricingPlan) => void;
  togglePremiumModalVisibility: () => void;
}

export const DataContext = createContext<ContextValuesType>(
  {} as ContextValuesType
);

function DataContextProvider({ children }: { children: ReactNode }) {
  const [userPlan, setUserPlan] = useState<TechStackPricingPlan>("BASIC_PKG");
  const [premiumModal, setPremiumModal] = useState(false);
  const [pkgPlan, setPkgPlan] = useState<TechStackPricingPlan>("BASIC_PKG");
  const togglePremiumModalVisibility = () => setPremiumModal(!premiumModal);

  const contextValues: ContextValuesType = {
    userPlan,
    pkgPlan,
    setPkgPlan,
    togglePremiumModalVisibility,
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
