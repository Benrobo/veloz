import {
  TechStackPricingPlan,
  FINE_TUNED_STACKS as FINE_TUNED_STACKS_TYPE,
  GENERAL_STACKS as GENERAL_STACKS_TYPE,
} from "@veloz/shared/types";
import templates from "./stack_templates.json";

interface IFINE_TUNED_STACKS_TEMP extends FINE_TUNED_STACKS_TYPE {
  media: string;
}

export const FINE_TUNED_STACKS = templates as IFINE_TUNED_STACKS_TEMP[];

// Stack Repos Name
type StackAvailabilityRepoName = {
  plan: TechStackPricingPlan;
  repo: string;
  available: boolean;
};

export const STACK_AVAILABILITY_REPO_NAME = [
  {
    plan: "FREE_PKG",
    repo: "veloz-react",
    available: true,
  },
  {
    plan: "FREE_PKG",
    repo: "veloz-vuejs",
    available: false,
  },
  {
    plan: "BASIC_PKG",
    repo: "veloz-nextjs",
    available: false,
  },
  {
    plan: "BASIC_PKG",
    repo: "veloz-zeus",
    available: false,
  },
] satisfies StackAvailabilityRepoName[];

// GENERAL STACKS
export const GENERAL_STACKS = [
  {
    category: "frontend",
    stacks: [
      {
        name: "Vue.js",
        key: "vuejs",
        pricing_plan: "FREE_PKG",
      },
      {
        name: "Next.js",
        key: "nextjs",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "React",
        key: "react",
        pricing_plan: "FREE_PKG",
      },
    ],
  },
  {
    category: "codebase_acrhitecture",
    stacks: [
      // Add codebase architecture stacks here
      // Example:
      {
        name: "Monolith",
        key: "monolith",
        pricing_plan: "FREE_PKG",
      },
      {
        name: "Monorepo",
        key: "monorepo",
        pricing_plan: "FREE_PKG",
      },
    ],
  },
  {
    category: "design_system",
    stacks: [
      // Add design system stacks here
      // Example:
      {
        name: "Tailwind CSS",
        key: "tailwindcss",
        pricing_plan: "FREE_PKG",
      },
      {
        name: "Sass",
        key: "sass",
        pricing_plan: "FREE_PKG",
      },
    ],
  },
  {
    category: "backend",
    stacks: [
      // Add backend stacks here
      // Example:
      {
        name: "Next.js API",
        key: "nextjs-api",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "Node.js",
        key: "nodejs",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "Golang",
        key: "golang",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "PHP",
        key: "php",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "Python",
        key: "python",
        pricing_plan: "BASIC_PKG",
      },
    ],
  },
  {
    category: "database",
    stacks: [
      // Add database stacks here
      // Example:
      {
        name: "MongoDB",
        key: "mongodb",
        pricing_plan: "FREE_PKG",
      },
      {
        name: "MySQL",
        key: "mysql",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "PostgreSQL",
        key: "postgresql",
        pricing_plan: "BASIC_PKG",
      },
    ],
  },
  {
    category: "payment",
    stacks: [
      // Add payment stacks here
      // Example:
      {
        name: "LemonSqueezy",
        key: "lemonsqueezy",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "Paddle",
        key: "paddle",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "Stripe",
        key: "stripe",
        pricing_plan: "BASIC_PKG",
      },
    ],
  },
  {
    category: "mailing",
    stacks: [
      // Add mailing stacks here
      // Example:
      {
        name: "Elasticmail",
        key: "elasticmail",
        pricing_plan: "FREE_PKG",
      },
      {
        name: "Postmark",
        key: "postmark",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "Resend",
        key: "resend",
        pricing_plan: "BASIC_PKG",
      },
    ],
  },
  {
    category: "authentication",
    stacks: [
      // Add authentication stacks here
      // Example:
      {
        name: "JSON Web Token",
        key: "jsonwebtoken",
        pricing_plan: "FREE_PKG",
      },
      {
        name: "Clerk",
        key: "clerk",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "Passage",
        key: "passage",
        pricing_plan: "BASIC_PKG",
      },
    ],
  },
] satisfies GENERAL_STACKS_TYPE[];
