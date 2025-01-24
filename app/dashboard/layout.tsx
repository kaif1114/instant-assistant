import React, { PropsWithChildren } from "react";
import Aside from "./Aside";
import PricingPlanContextProvider from "../providers/PricingPlanContextProvider";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { PricingPlans } from "@prisma/client";


const layout = async ({ children }: PropsWithChildren) => {
  let plan: PricingPlans | null = null;

  const { userId } = await auth();
  try {
    const user = await prisma.user.findUnique({
      where: { userId: userId! },
      select: { PricingPlans: true },
    });
    plan = user?.PricingPlans || null;
    console.log(plan);
  } catch (error) {
    console.log(error);
  }

  return (

    <Aside> <PricingPlanContextProvider plan={plan?.charactersLimit!}>{children}</PricingPlanContextProvider></Aside>

  );
};

export default layout;
