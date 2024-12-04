-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentPlan" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentPlan_fkey" FOREIGN KEY ("currentPlan") REFERENCES "PricingPlans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
