import {
  TechStackPricingPlan,
  FINE_TUNED_STACKS as FINE_TUNED_STACKS_TYPE,
  GENERAL_STACKS as GENERAL_STACKS_TYPE,
  TechStackCategory,
} from "@veloz/shared/types";
import children_templates from "./templates/children.json";
import parent_templates from "./templates/parent.json";
import githubRepos from "./github_repo.json";

export interface IFINE_TUNED_STACKS_TEMP extends FINE_TUNED_STACKS_TYPE {
  media: {
    thumbnail: string | null;
    video: string | null;
  };
  tagline: string;
  difficulty: "intermediate" | "advanced" | "beginner";
  tags: string[];
  parent_id: string;
}

interface IPARENT_TEMPLATES {
  id: string;
  name: string;
  tagline: string;
  image: string;
  pricing_plan: TechStackPricingPlan;
  available: boolean;
  shop_url: string;
  demo: {
    live_url: string;
    video_url: string;
  };
}

export const PARENT_TEMPLATES = parent_templates as IPARENT_TEMPLATES[];
export const FINE_TUNED_STACKS =
  children_templates as IFINE_TUNED_STACKS_TEMP[];

// Stack Repos Name
type TemplateRepositoryType = {
  repo: string;
  available: boolean;
  template_name: string;
};

export const TEMPLATES_REPOSITORY = githubRepos as TemplateRepositoryType[];

// GENERAL STACKS
export const GENERAL_STACKS = [
  {
    category: "frontend",
    stacks: [
      {
        name: "Vue.js",
        key: "vuejs",
      },
      {
        name: "Javascript",
        key: "javascript",
      },
      {
        name: "Typescript",
        key: "typescript",
      },
      {
        name: "Next.js",
        key: "nextjs",
      },
      {
        name: "React",
        key: "react",
      },
      {
        name: "Tailwind CSS",
        key: "tailwindcss",
      },
      {
        name: "Sass",
        key: "sass",
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
      },
      {
        name: "Typescript",
        key: "typescript",
      },
      {
        name: "Node.js",
        key: "nodejs",
      },
      {
        name: "Golang",
        key: "golang",
      },
      {
        name: "PHP",
        key: "php",
      },
      {
        name: "Python",
        key: "python",
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
      },
      {
        name: "MySQL",
        key: "mysql",
      },
      {
        name: "PostgreSQL",
        key: "postgresql",
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
      },
      {
        name: "Paddle",
        key: "paddle",
      },
      {
        name: "Stripe",
        key: "stripe",
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
      },
      {
        name: "Postmark",
        key: "postmark",
      },
      {
        name: "Resend",
        key: "resend",
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
      },
      {
        name: "Clerk",
        key: "clerk",
      },
      {
        name: "Passage",
        key: "passage",
      },
    ],
  },
] satisfies GENERAL_STACKS_TYPE[];

export const STACK_CATEGORIES = [
  "frontend",
  "backend",
  "database",
  "payment",
  "mailing",
  "authentication",
] satisfies TechStackCategory[];
