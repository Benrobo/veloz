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

export function parseEnvString(envString: string) {
  const keyValuePairs = envString.replace(/^[^#\n]*=.*$/g, "").split("\n");
  const envObject = {} as {
    [key: string]: string;
  };

  keyValuePairs.forEach((line) => {
    const [key, value] = line.trim().split("=");
    const cleanedValue =
      value ??
      ""
        .replace(/[\?{}]/g, "")
        .trim()
        .replace(/(^['"]|['"]$)/g, "");
    const cleanedKey = key.trim().replace(/^[#] +/, "");
    if (cleanedKey.length > 0) {
      envObject[cleanedKey] = cleanedValue;
    }
  });
  return envObject;
}

export function getPlanTitle(plan: TechStackPricingPlan) {
  switch (plan) {
    case "BASIC_PKG":
      return "Basic";
    case "STANDARD_PKG":
      return "Standard";
    case "PRO_PKG":
      return "Pro";
  }
}

export const planColor = (plan: TechStackPricingPlan) => {
  let txtColor = "",
    bgColor = "";
  if (plan === "BASIC_PKG") {
    txtColor = "text-blue-100";
    bgColor = "bg-blue-100";
  }
  if (plan === "STANDARD_PKG") {
    txtColor = "text-orange-100";
    bgColor = "bg-orange-100";
  }
  if (plan === "PRO_PKG") {
    txtColor = "text-pink-100";
    bgColor = "bg-pink-100";
  }
  return { txtColor, bgColor };
};
