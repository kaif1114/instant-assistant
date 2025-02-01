import { PricingPlans } from "@prisma/client";
import { createContext } from "react";

export const pricingPlanContext = createContext<PricingPlans | null>(null);
