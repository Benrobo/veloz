import { REFINED_STACKS } from "@veloz/shared/data/stack";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TechStackCategory, TechStackPricingPlan } from "@veloz/shared/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// check if user is eligible or not for a specific plan
export function isUserEligibleForStack(
  stackKey: string,
  category: TechStackCategory,
  userPricingPlan: TechStackPricingPlan
) {
  const stacks = REFINED_STACKS.find(
    (stack) => stack.category === category
  )?.stacks;
  const techStack = stacks?.find((stack) => stack.key === stackKey);
  if (techStack) {
    const { pricing_plan } = techStack;
    if (userPricingPlan === "BASIC_PKG" && pricing_plan !== "BASIC_PKG") {
      // User on BASIC_PKG plan can't access other plans
      return false;
    } else if (
      userPricingPlan === "STANDARD_PKG" &&
      pricing_plan === "ENTERPRISE_PKG"
    ) {
      // User on STANDARD_PKG plan can't access ENTERPRISE
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
    case "FREE_PKG":
      return "Free";
    case "BASIC_PKG":
      return "Basic";
    case "STANDARD_PKG":
      return "Standard";
    case "ENTERPRISE_PKG":
      return "Enterprise";
  }
}

export const planColor = (plan: TechStackPricingPlan) => {
  let txtColor = "",
    bgColor = "";
  if (plan === "FREE_PKG") {
    txtColor = "text-green-100";
    bgColor = "bg-green-100";
  }
  if (plan === "BASIC_PKG") {
    txtColor = "text-blue-100";
    bgColor = "bg-blue-100";
  }
  if (plan === "STANDARD_PKG") {
    txtColor = "text-orange-100";
    bgColor = "bg-orange-100";
  }
  if (plan === "ENTERPRISE_PKG") {
    txtColor = "text-pink-100";
    bgColor = "bg-pink-100";
  }
  return { txtColor, bgColor };
};

export const logout = () => {
  localStorage.removeItem("clerk-db-jwt");
  window.location.href = "/auth";
};
