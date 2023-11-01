import { ProjectType } from "@/components/Projects/Card";

export interface VelozProjectType {
  name: string;
  id: any;
  description?: string;
  label: ProjectType;
  stacks?: {
    title: "frontend" | "backend" | "payment" | "database" | "mailing";
    stacks: string[];
  }[];
  download_link?: string;
  status: "pending" | "done" | "failed";
  env?: string | null;
}

export type ProjectSideBarConfigKeysType =
  | "details"
  | "tech_stacks"
  | "secrets";

export type ProjectSideBarConfigType = {
  title: string;
  key: string;
};
