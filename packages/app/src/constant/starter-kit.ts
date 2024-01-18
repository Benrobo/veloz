import { TechStackPricingPlan } from "@veloz/shared/types";

type TEMPLATE_PLAN_TYPE = {
  plan: TechStackPricingPlan;
  pricing: {
    currency: string;
    currency_symbol: string;
    price: number;
  };
};

export const TEMPLATES_PRICING_MODEL = [
  {
    plan: "LITE_PKG",
    pricing: {
      currency: "USD",
      currency_symbol: "$",
      price: 199,
    },
  },
  {
    plan: "PRO_PKG",
    pricing: {
      currency: "USD",
      currency_symbol: "$",
      price: 500,
    },
  },
] satisfies TEMPLATE_PLAN_TYPE[];
