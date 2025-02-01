"use client";
import React, { ReactNode } from "react";
import { pricingPlanContext } from "./pricingPlanContext";
import { PricingPlans } from "@prisma/client";

const PricingPlanContextProvider = ({
  plan,
  children,
}: {
  plan: PricingPlans | null;
  children: ReactNode;
}) => {
  return (
    <pricingPlanContext.Provider value={plan}>
      {children}
    </pricingPlanContext.Provider>
  );
};

export default PricingPlanContextProvider;
