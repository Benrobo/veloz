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
  type Arch = "monolith" | "monorepo";
  const codebaseArchitecture =
    (tech_stacks.find((s) => s.key === "monorepo")?.key as Arch) ??
    ("monolith" as Arch);
  const _frontend = findStack(tech_stacks, "frontend");
  const _backend = findStack(tech_stacks, "backend");

  for (const _stacks of tech_stacks) {
    // monorepo setup
    if (codebaseArchitecture === "monorepo") {
      console.log(formatedName, _stacks);
    }
    if (codebaseArchitecture === "monolith") {
    }
  }
}

function findStack(stacks: Props, key: TechStackCategory) {
  return stacks.find((s) => s.key === key) ?? null;
}
