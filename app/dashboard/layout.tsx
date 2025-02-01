import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";
import PricingPlanContextProvider from "../providers/PricingPlanContextProvider";
import Aside from "./Aside";
import { PricingPlans } from "@prisma/client";

const layout = async ({ children }: PropsWithChildren) => {
  const { userId } = await auth();

  let pricingPlan: null | PricingPlans = null;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { userId },
      select: { PricingPlans: true },
    });
    pricingPlan = user?.PricingPlans || null;
  }

  return (
    <Aside>
      <PricingPlanContextProvider plan={pricingPlan}>
        {children}
      </PricingPlanContextProvider>
    </Aside>
  );
};

export default layout;
