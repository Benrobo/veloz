import {
  FINE_TUNED_STACKS as FINE_TUNED_STACKS_TYPE,
  REFINED_STACKS as REFINED_STACKS_TYPE,
} from "../../types";

const REFINED_STACKS = [
  // Codebase Architecture
  {
    name: "Monolith",
    key: "monolith",
    img: "/images/cb_architecture/monolith.png",
    pricing_plan: "BASIC_PKG",
    category: "codebase_acrhitecture",
    available: true,
    supported_architecture: ["monolith"],
  },
  {
    name: "Monorepo",
    key: "monorepo",
    img: "/images/cb_architecture/monorepo.png",
    pricing_plan: "STANDARD_PKG",
    category: "codebase_acrhitecture",
    available: true,
    supported_architecture: ["monorepo"],
  },
  // Frontend
  {
    name: "Vanilla JS",
    key: "vanillajs",
    img: "/images/tech_stacks/javascript.svg",
    pricing_plan: "BASIC_PKG",
    category: "frontend",
    available: true,
    supported_architecture: ["monolith", "monorepo"],
  },
  {
    name: "nextjs",
    key: "nextjs",
    img: "/images/tech_stacks/nextjs.svg",
    pricing_plan: "BASIC_PKG",
    category: "frontend",
    available: true,
    supported_architecture: ["monolith", "monorepo"],
  },
  {
    name: "React + Vite",
    key: "react",
    img: "/images/tech_stacks/react.svg",
    pricing_plan: "BASIC_PKG",
    category: "frontend",
    available: true,
    supported_architecture: ["monolith", "monorepo"],
  },
  // Design System
  {
    name: "tailwindcss",
    key: "tailwindcss",
    img: "/images/tech_stacks/tailwindcss.svg",
    pricing_plan: "BASIC_PKG",
    category: "design_system",
    available: true,
    supported_architecture: ["monolith", "monorepo"],
  },
  {
    name: "Sass",
    key: "sass",
    img: "/images/tech_stacks/sass.svg",
    pricing_plan: "BASIC_PKG",
    category: "design_system",
    available: false,
    supported_architecture: ["monolith", "monorepo"],
  },
  // BACKEND
  {
    name: "Nextjs API",
    key: "nextjs-api",
    img: "/images/tech_stacks/nextjs-api.png",
    pricing_plan: "BASIC_PKG",
    category: "backend",
    available: true,
    supported_architecture: ["monolith", "monorepo"],
  },
  {
    name: "nodejs",
    key: "nodejs",
    img: "/images/tech_stacks/nodejs.svg",
    pricing_plan: "ENTERPRISE_PKG",
    category: "backend",
    available: true,
    supported_architecture: ["monolith"],
  },
  {
    name: "Golang",
    key: "golang",
    img: "/images/tech_stacks/golang.svg",
    pricing_plan: "STANDARD_PKG",
    category: "backend",
    available: true,
    supported_architecture: ["monolith"],
  },
  {
    name: "Laravel",
    key: "laravel",
    img: "/images/tech_stacks/laravel.svg",
    pricing_plan: "ENTERPRISE_PKG",
    category: "backend",
    available: false,
    supported_architecture: ["monolith"],
  },
  // Database
  {
    name: "Mongodb",
    key: "mongodb",
    img: "/images/tech_stacks/mongodb.svg",
    pricing_plan: "BASIC_PKG",
    category: "database",
    available: true,
    supported_architecture: ["monolith", "monorepo"],
  },
  {
    name: "mysql",
    key: "mysql",
    img: "/images/tech_stacks/mysql.svg",
    pricing_plan: "STANDARD_PKG",
    category: "database",
    available: false,
    supported_architecture: ["monolith", "monorepo"],
  },
  {
    name: "Postgresql",
    key: "postgresql",
    img: "/images/tech_stacks/postgres.svg",
    pricing_plan: "STANDARD_PKG",
    category: "database",
    available: false,
    supported_architecture: ["monolith", "monorepo"],
  },
  //   Payment Services
  {
    name: "Lemonsqueezy",
    key: "lemonsqueezy",
    img: "/images/payment/lemonsqueezy.svg",
    pricing_plan: "BASIC_PKG",
    category: "payment",
    available: true,
    supported_architecture: ["monolith"],
  },
  {
    name: "Stripe",
    key: "stripe",
    img: "/images/payment/stripe.svg",
    pricing_plan: "BASIC_PKG",
    category: "payment",
    available: false,
    supported_architecture: ["monolith"],
  },
  //   Email Services
  {
    name: "Postmark",
    key: "postmark",
    img: "/images/mail/postmark.png",
    pricing_plan: "BASIC_PKG",
    category: "mailing",
    available: true,
    supported_architecture: ["monolith", "monorepo"],
  },
  {
    name: "Sendgrid",
    key: "sendgrid",
    img: "/images/mail/sendgrid.png",
    pricing_plan: "STANDARD_PKG",
    category: "mailing",
    available: true,
    supported_architecture: ["monolith", "monorepo"],
  },
  {
    name: "Resend",
    key: "resend",
    img: "/images/mail/resend.png",
    pricing_plan: "STANDARD_PKG",
    category: "mailing",
    available: false,
    supported_architecture: ["monolith", "monorepo"],
  },
  // Authentication service
  {
    name: "JWT",
    key: "jsonwebtoken",
    img: "/images/auth/jwt.png",
    pricing_plan: "BASIC_PKG",
    category: "authentication",
    available: true,
    supported_architecture: ["monolith", "monorepo"],
  },
  {
    name: "Clerk",
    key: "clerk",
    img: "/images/auth/clerk.png",
    pricing_plan: "STANDARD_PKG",
    category: "authentication",
    available: true,
    supported_architecture: ["monolith", "monorepo"],
  },
  {
    name: "Passage",
    key: "passage",
    img: "/images/auth/passage.png",
    pricing_plan: "STANDARD_PKG",
    category: "authentication",
    available: false,
    supported_architecture: ["monolith", "monorepo"],
  },
] satisfies REFINED_STACKS_TYPE[];

export default REFINED_STACKS;

export const FINE_TUNED_STACKS = [
  {
    id: 2,
    plan: "STANDARD_PKG",
    name: "Athena",
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
] satisfies FINE_TUNED_STACKS_TYPE[];
