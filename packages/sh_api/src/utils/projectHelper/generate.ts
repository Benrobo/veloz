import { REFINED_STACK_VALUE, TechStackCategory } from "@veloz/shared";

type Props = {
  category: TechStackCategory;
  name: string;
  stack: string;
  _id: object;
}[];

export default async function ProjectGenerate(tech_stacks: Props) {
  for (const _stacks of tech_stacks) {
    const codebaseArchitecture = _stacks.name;

    // monorepo setup
    if (codebaseArchitecture?.toLowerCase() === "monorepo") {
    }
    if (codebaseArchitecture?.toLowerCase() === "monolith") {
    }
  }
}
