import { ProjectType } from "@/components/Projects/Card";

export interface VelozProjectType {
  name: string;
  id: any;
  description?: string;
  label: ProjectType;
  stacks: [
    {
      title: "frontend" | "backend" | "payment" | "database" | "mailing";
      stacks: string[];
    }
  ];
  download_link?: string;
}
