"use client";
import React, { ReactNode } from "react";
import { pricingPlanContext } from "./pricingPlanContext";

const PricingPlanContextProvider = ({
  plan,
  children,
}: {
  plan: number;
  children: ReactNode;
}) => {
  return (
    <pricingPlanContext.Provider value={plan}>
      {children}
    </pricingPlanContext.Provider>
  );
};

export default PricingPlanContextProvider;
