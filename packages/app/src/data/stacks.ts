import { TechStacks } from "../../types";

const TECH_STACKS = [
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
    name: "nextjs",
    key: "nextjs",
    img: "/images/tech_stacks/nextjs.svg",
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
    supported_architecture: ["monolith"],
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
    pricing_plan: "PRO_PKG",
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
    pricing_plan: "PRO_PKG",
    category: "backend",
    available: false,
    supported_architecture: ["monolith"],
  },
  // Database
  {
    name: "mysql",
    key: "mysql",
    img: "/images/tech_stacks/mysql.svg",
    pricing_plan: "BASIC_PKG",
    category: "database",
    available: true,
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
    name: "Sendgrid",
    key: "sendgrid",
    img: "/images/mail/sendgrid.png",
    pricing_plan: "BASIC_PKG",
    category: "mailing",
    available: true,
    supported_architecture: ["monolith"],
  },
  {
    name: "Resend",
    key: "resend",
    img: "/images/mail/resend.png",
    pricing_plan: "BASIC_PKG",
    category: "mailing",
    available: true,
    supported_architecture: ["monolith"],
  },
] satisfies TechStacks[];

export default TECH_STACKS;
