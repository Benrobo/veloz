import { FINE_TUNED_STACKS, PARENT_TEMPLATES } from "@data/stack";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TechStackCategory, TechStackPricingPlan } from "@veloz/shared/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// check if user has bought a specific template
export function hasTemplateBeenPurchased(
  items: { name: string; id: string }[],
  template_id: string,
  template_name: string
) {
  if (!items || items?.length === 0) return false;
  for (const item of items) {
    const template = PARENT_TEMPLATES.find(
      (t) =>
        t.id === template_id ||
        t.name.toLowerCase() === template_name.toLowerCase()
    );
    if (
      item.id === template?.id ||
      item.name.toLowerCase() === template?.name.toLowerCase()
    ) {
      return true;
    }
    return false;
  }
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
    case "LITE_PKG":
      return "Lite";
    case "PRO_PKG":
      return "Pro";
  }
}

export const planColor = (plan: TechStackPricingPlan) => {
  let txtColor = "",
    bgColor = "";
  if (plan === "FREE_PKG") {
    txtColor = "text-green-100";
    bgColor = "bg-green-100";
  }
  if (plan === "LITE_PKG") {
    txtColor = "text-blue-100";
    bgColor = "bg-blue-100";
  }
  if (plan === "PRO_PKG") {
    txtColor = "text-pink-100";
    bgColor = "bg-pink-100";
  }
  return { txtColor, bgColor };
};

type StackProps = Record<
  TechStackCategory,
  { category: TechStackCategory; name: string; stack: string }
>;

export const logout = () => {
  localStorage.removeItem("clerk-db-jwt");
  window.location.href = "/auth";
};

// format number to 100, 1k, 2.5k, 1m, 2.5m
export function formatNumber(number: number) {
  // International number formatting
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

// currency formatter
export function formatCurrency(number: number, currency: string) {
  // International number formatting
  let formatter = Intl.NumberFormat("en", {
    style: "currency",
    currency,
  });
  return formatter.format(number);
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
