import { ProjectSideBarConfigType } from "../types";
import { VelozProjectType, SecretDataTypes } from "@veloz/shared/types";

export const projectTempData: VelozProjectType[] = [
  {
    name: "Event App",
    label: "Apex",
    description: "Source code for my event app",
    id: 1,
    download_link: "",
    status: "done",
    stacks: [
      {
        title: "backend",
        stacks: ["nodejs"],
      },
      {
        title: "frontend",
        stacks: ["nextjs", "tailwindcss"],
      },
      {
        title: "database",
        stacks: ["mysql"],
      },
    ],
    env: null, // No environmental variables required for this project
  },
  {
    name: "E-commerce Platform",
    label: "Vortex",
    description: "Development of an online marketplace",
    id: 2,
    download_link: "",
    status: "done",
    stacks: [
      {
        title: "backend",
        stacks: ["nextjs"],
      },
      {
        title: "frontend",
        stacks: ["nextjs", "tailwindcss"],
      },
      {
        title: "payment",
        stacks: ["stripe"],
      },
    ],
    env: `
DATABASE_URL='postgresql://postgres:@localhost:5432/myecommerce'

NODE_ENV='production'

JWT_SECRET='another-secret-key'

CLOUDINARY_NAME='ecommerce-cloud'

STRIPE_API_KEY='stripe-api-for-ecommerce'
`,
  },
  {
    name: "Health and Wellness App",
    label: "Serenity",
    description: "Creating a fitness and well-being application",
    id: 3,
    download_link: "",
    status: "failed",
    stacks: [
      {
        title: "frontend",
        stacks: ["nextjs", "tailwindcss"],
      },
      {
        title: "payment",
        stacks: ["lemonsqueezy"],
      },
      {
        title: "mailing",
        stacks: ["sendgrid"],
      },
    ],
    env: null, // No environmental variables required for this project
  },
  {
    name: "Astronomy Portal",
    label: "Nebula",
    description: "Building a website for astronomy enthusiasts",
    id: 4,
    download_link: "",
    status: "pending",
    stacks: [
      {
        title: "frontend",
        stacks: ["nextjs", "tailwindcss"],
      },
      {
        title: "payment",
        stacks: ["stripe"],
      },
    ],
    env: `
DATABASE_URL='astronomy-database-url'

NODE_ENV='development'

SOME_OTHER_VARIABLE='some-value'
`,
  },
  {
    name: "Travel Blog",
    label: "Odyssey",
    description: "Blogging platform for travel enthusiasts",
    id: 5,
    download_link: "",
    status: "done",
    stacks: [
      {
        title: "backend",
        stacks: ["nextjs"],
      },
      {
        title: "frontend",
        stacks: ["nextjs", "tailwindcss"],
      },
      {
        title: "database",
        stacks: ["mysql"],
      },
      {
        title: "mailing",
        stacks: ["sendgrid"],
      },
    ],
    env: `
DATABASE_URL='travel-blog-db'

NODE_ENV='production'

ANOTHER_VARIABLE='another-value'
`,
  },
];

export const ProjectSideBarConfig = [
  {
    title: "Project Details",
    key: "details",
  },
  {
    title: "Tech Stacks",
    key: "tech_stacks",
  },
  {
    title: "Secrets",
    key: "secrets",
  },
] satisfies ProjectSideBarConfigType[];
