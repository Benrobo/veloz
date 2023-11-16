import { ProjectSideBarConfigType } from "../types";
import { TechStackPricingPlan } from "@veloz/shared/types";

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

export const ProjectLabels = [
  "Vortex",
  "Apex",
  "Serenity",
  "Nebula",
  "Odyssey",
];

export const TechPricingPlans = [
  "BASIC_PKG",
  "ENTERPRISE_PKG",
  "STANDARD_PKG",
] as TechStackPricingPlan[];
