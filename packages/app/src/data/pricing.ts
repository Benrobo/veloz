import { TEMPLATES_PRICING_MODEL } from "@/constant/starter-kit";
import { TechStackPricingPlan } from "@veloz/shared/types";

type PricingPlan = {
  name: string;
  price: number;
  plan: TechStackPricingPlan;
  features: string[];
  description: string;
  tagline?: string;
  isRecommended: boolean;
  isMostPopular: boolean;
};

// pricing page data
const getPricingPlanPrice = (plan: TechStackPricingPlan) =>
  TEMPLATES_PRICING_MODEL.find((p) => p.plan === plan)?.pricing?.price || 0;

export const PRICING_PAGE_DATA = [
  {
    plan: "LITE_PKG",
    name: "Lite",
    price: getPricingPlanPrice("LITE_PKG"),
    description:
      "For small teams and individuals. Charge per templates bought.",
    features: [
      "Unlimited projects",
      "Unlimited collaborators",
      "Unlimited deployments",
      "Unlimited secrets",
      "Unlimited environments",
      "Unlimited custom domains",
      "Unlimited API calls",
      "Unlimited API calls",
      "Unlimited API calls",
      "Unlimited API calls",
      "Unlimited API calls",
    ],
    isRecommended: true,
    isMostPopular: false,
  },
] satisfies PricingPlan[];

export const KIT_PRICING_PLAN_FEATURES = [
  {
    name: "zeus",
    plans: [
      "Next 14 (App Router)",
      "Custom Waitlist page and component",
      "Prebuilt UI Components",
      "Authentication support",
      "Clean, well written and structure code",
      "Own your data",
      "Lemonsqueezy payment integration",
      "Lifetime updates",
      "Discord community",
      "Unlimited projects",
      "Buy now use forever",
      "Unlimited projects",
    ],
  },
];
