import React, { ReactNode, createContext, useContext, useState } from "react";
import { TechStackPricingPlan } from "../../types";

interface ContextValuesType {
  userPlan: TechStackPricingPlan;
}

export const DataContext = createContext<ContextValuesType>(
  {} as ContextValuesType
);

function DataContextProvider({ children }: { children: ReactNode }) {
  const [userPlan, setUserPlan] = useState<TechStackPricingPlan>("BASIC_PKG");
  const contextValues: ContextValuesType = {
    userPlan,
  };
  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
