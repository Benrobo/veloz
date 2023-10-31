import { VelozProjectType } from "../../types";

export const ProjectLabels = [
  "Vortex",
  "Apex",
  "Serenity",
  "Nebula",
  "Odyssey",
];

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
  },
];
