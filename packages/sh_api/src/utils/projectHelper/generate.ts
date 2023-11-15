import { REFINED_STACK_VALUE, TechStackCategory } from "@veloz/shared";

type Props = {
  category: TechStackCategory;
  name: string;
  technology: string;
  key: string;
  _id: object;
}[];

export default async function ProjectGenerate(
  tech_stacks: Props,
  name: string
) {
  const formatedName = name.toLowerCase().replace(/\s/gi, "-");
  const codebaseArchitecture = findStack(tech_stacks, "codebase_acrhitecture");
  const _frontend = findStack(tech_stacks, "frontend");
  const _backend = findStack(tech_stacks, "backend");

  console.log(codebaseArchitecture);
  if (codebaseArchitecture === "monorepo") {
    console.log(formatedName, _frontend, _backend);
  }
  if (codebaseArchitecture === "monolith") {
  }
}

function findStack(stacks: Props, category: TechStackCategory, match?: string) {
  const foundStack = stacks.find((s) => s.category === category);
  if (match) {
    return foundStack?.key === match ? foundStack?.key : null;
  }
  return foundStack?.key ?? null;
}
