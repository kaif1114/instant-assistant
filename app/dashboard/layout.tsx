import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";
import PricingPlanContextProvider from "../providers/PricingPlanContextProvider";
import Aside from "./Aside";

const DEFAULT_CHARACTER_LIMIT = 100000; // Define a default limit

const layout = async ({ children }: PropsWithChildren) => {
  let characterLimit = DEFAULT_CHARACTER_LIMIT;

  const { userId } = await auth();
  if (userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { userId },
        select: { PricingPlans: true },
      });

      // Use the plan's character limit if it exists, otherwise use default
      characterLimit = user?.PricingPlans?.charactersLimit ?? DEFAULT_CHARACTER_LIMIT;

    } catch (error) {
      console.log(error);
      // On error, fall back to default limit
    }
  }

  return (
    <Aside>
      <PricingPlanContextProvider plan={characterLimit}>
        {children}
      </PricingPlanContextProvider>
    </Aside>
  );
};

export default layout;
