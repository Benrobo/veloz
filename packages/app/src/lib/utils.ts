import TECH_STACKS from "@/data/stacks";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TechStackPricingPlan } from "../../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// check if user is eligible or not for a specific plan
export function isUserEligibleForStack(
  stackKey: string,
  userPricingPlan: TechStackPricingPlan
) {
  const techStack = TECH_STACKS.find((stack) => stack.key === stackKey);
  if (techStack) {
    const { pricing_plan } = techStack;
    if (userPricingPlan === "BASIC_PKG" && pricing_plan !== "BASIC_PKG") {
      // User on BASIC_PKG plan can't access other plans
      return false;
    } else if (
      userPricingPlan === "STANDARD_PKG" &&
      pricing_plan === "PRO_PKG"
    ) {
      // User on STANDARD_PKG plan can't access PRO_PKG
      return false;
    } else {
      // User is eligible for this stack
      return true;
    }
  }

  // Stack not found
  console.log("Stack not found");
  return false;
}
