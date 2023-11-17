import { REFINED_STACKS, STACK_AVAILABILITY } from "@data/stack";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TechStackCategory, TechStackPricingPlan } from "@veloz/shared/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const planLevels = {
  FREE_PKG: 1,
  BASIC_PKG: 2,
  STANDARD_PKG: 3,
  ENTERPRISE_PKG: 4,
};

// check if user is eligible or not for a specific plan
export function isUserEligibleForStack(
  stackKey: string,
  category: TechStackCategory,
  userPricingPlan: TechStackPricingPlan
) {
  const stacks = REFINED_STACKS.find((stack) => stack.category === category)
    ?.stacks;
  const techStack = stacks?.find((stack) => stack.key === stackKey);
  if (techStack) {
    const { pricing_plan } = techStack;
    if (planLevels[userPricingPlan] >= planLevels[pricing_plan]) {
      return true;
    } else {
      return false;
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

// check stack availability
export function isStackAvailable(stack: string, category: TechStackCategory) {
  const notAvailableStacks = STACK_AVAILABILITY.find(
    (s) => s.category === category
  )?.not_available as string[];

  if (notAvailableStacks?.includes(stack)) return false;

  return true;
}

type StackProps = Record<
  TechStackCategory,
  { category: TechStackCategory; name: string; stack: string }
>;

export function _checkRefinedStackAvailability(stacks: StackProps) {
  // check if stack is available
  for (const [category, stack] of Object.entries(stacks)) {
    if (!isStackAvailable(stack.stack, category as TechStackCategory)) {
      console.log(`[${category} : ${stack.stack}] stack not available`);
      return false;
    }
  }
  return true;
}

// check if user is eligible or not for a specific stack plan
export function _isUserEligibleForStack(
  stacks: StackProps,
  userPlan: TechStackPricingPlan
) {
  let resp = {
    eligible: false,
    message: "",
  };
  for (const [category, stack] of Object.entries(stacks)) {
    const _stack = REFINED_STACKS.find(
      (s) => s.category === category
    )?.stacks.find((s) => s.key === stack.stack);

    if (!_stack) {
      console.log(`[${stack.stack} : ${category}] Stack not found`);
      resp.message = `Stack not found`;
      return resp;
    }

    if (planLevels[userPlan] < planLevels[_stack.pricing_plan]) {
      console.log(`[${stack.stack} : ${_stack.pricing_plan}] Not Eligible`);
      resp.message = `You are not eligible for ${stack.stack} stack`;
      return resp;
    }
  }
  resp.eligible = true;
  return resp;
}

export const logout = () => {
  localStorage.removeItem("clerk-db-jwt");
  window.location.href = "/auth";
};
