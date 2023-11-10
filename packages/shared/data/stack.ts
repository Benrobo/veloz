import { FINE_TUNED_STACKS as FINE_TUNED_STACKS_TYPE } from "../types";

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
