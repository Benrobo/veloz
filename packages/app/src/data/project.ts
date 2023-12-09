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
] satisfies ProjectSideBarConfigType[];

export const ProjectLabels = [
  "Vortex",
  "Apex",
  "Serenity",
  "Nebula",
  "Odyssey",
];

export const TechPricingPlans = [
  "LITE_PKG",
  "PRO_PKG",
  "STANDARD_PKG",
] as TechStackPricingPlan[];
