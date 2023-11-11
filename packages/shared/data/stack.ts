import {
  FINE_TUNED_STACKS as FINE_TUNED_STACKS_TYPE,
  REFINED_STACKS as REFINED_STACKS_TYPE,
  TechStackCategory,
  StackAvailabilityType,
} from "../types";

// Static data meant for backend and frontend
export const FINE_TUNED_STACKS = [
  {
    id: 2,
    plan: "STANDARD_PKG",
    name: "Athena",
    available: false,
    description: "Athena is a fine tuned stack for your next project",
    tech_stacks: [
      {
        title: "frontend",
        stacks: ["react", "tailwindcss"],
      },
      {
        title: "backend",
        stacks: ["nextjs-api"],
      },
      {
        title: "database",
        stacks: ["postgresql"],
      },
      {
        title: "mailing",
        stacks: ["sendgrid"],
      },
      {
        title: "authentication",
        stacks: ["clerk"],
      },
      {
        title: "payment",
        stacks: ["stripe"],
      },
    ],
  },
  {
    id: 3,
    plan: "ENTERPRISE_PKG",
    name: "Zeus",
    available: true,
    description: "Zeus is a fine tuned stack for your next project",
    tech_stacks: [
      {
        title: "frontend",
        stacks: ["nextjs", "tailwindcss"],
      },
      {
        title: "backend",
        stacks: ["nodejs", "expressjs"],
      },
      {
        title: "database",
        stacks: ["mysql"],
      },
      {
        title: "mailing",
        stacks: ["postmark"],
      },
      {
        title: "authentication",
        stacks: ["jwt"],
      },
      {
        title: "payment",
        stacks: ["lemonsqueezy"],
      },
    ],
  },
] as FINE_TUNED_STACKS_TYPE[];

// REFINED STACKS (only)
export const REFINED_STACKS = [
  {
    category: "frontend",
    stacks: [
      {
        name: "Vanilla JS",
        key: "vanillajs",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "Next.js",
        key: "nextjs",
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "React",
        key: "react",
        pricing_plan: "BASIC_PKG",
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
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "Monorepo",
        key: "monorepo",
        pricing_plan: "BASIC_PKG",
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
        pricing_plan: "BASIC_PKG",
      },
      {
        name: "Sass",
        key: "sass",
        pricing_plan: "BASIC_PKG",
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
        pricing_plan: "BASIC_PKG",
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
        pricing_plan: "BASIC_PKG",
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
        pricing_plan: "BASIC_PKG",
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
] satisfies REFINED_STACKS_TYPE[];

// (Refined Only)
export const STACK_CATEGORIES = [
  "frontend",
  "codebase_acrhitecture",
  "design_system",
  "backend",
  "database",
  "payment",
  "mailing",
  "authentication",
] satisfies TechStackCategory[];

// (Refined Only) ALL STACKS
export const validFrontendStacks = ["vanillajs", "nextjs", "react"];
export const validBackendStacks = [
  "nextjs-api",
  "nodejs",
  "golang",
  "php",
  "python",
];
export const validDesignSystem = ["tailwindcss", "sass"];
export const validDatabases = ["mongodb", "mysql", "postgresql"];
export const validCodebaseArchitecture = ["monolith", "monorepo"];
export const validPaymentProviders = ["lemonsqueezy", "paddle", "stripe"];
export const validAuthProviders = ["jsonwebtoken", "clerk", "passage"];
export const mailingProviders = ["elasticmail", "postmark", "resend"];

// (Refined Only) STACKS AVAILABILITY
export const STACK_AVAILABILITY = [
  // Frontend
  {
    category: "frontend",
    available: [""],
    not_available: [""],
  },

  // Design System
  {
    category: "frontend",
    available: [""],
    not_available: [""],
  },
] as StackAvailabilityType[];
