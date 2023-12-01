import {
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
} from "@/components/Flex";
import Layout from "@/components/Layout";
import { RenderFineTunedStacks } from "@/components/Stacks/Render";
import { FINE_TUNED_STACKS } from "@/data/stack";
import { FineTunedStacksName } from "@veloz/shared/types";
import { ArrowLeftToLine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function ProjectTemplate() {
  const { name } = useRouter().query;

  const extractFineTunedStack = (
    stacks: { title: string; stacks: string[] }[]
  ) => {
    const validStacks: string[] = [];
    stacks.forEach((stack) => {
      stack.stacks.forEach((s) => {
        if (!validStacks.includes(s)) {
          validStacks.push(s);
        }
      });
    });
    return validStacks;
  };

  const returnFineTunedStacks = (name: FineTunedStacksName) => {
    const stack = FINE_TUNED_STACKS.find((d) => d.name === name);
    if (stack) {
      return extractFineTunedStack(stack.tech_stacks);
    }
    return [];
  };

  const returnFineTunedStackDetails = (name: FineTunedStacksName) => {
    const stack = FINE_TUNED_STACKS.find((d) => d.name === name);
    return stack;
  };

  const stackDetails = returnFineTunedStackDetails(name as FineTunedStacksName);

  return (
    <Layout activePage="projects">
      <FlexColStart className="w-full">
        <FlexRowStart className="px-3 py-4">
          <Link
            href="/projects/create"
            className="underline w-auto flex gap-2 items-center justify-start"
          >
            <ArrowLeftToLine
              size={15}
              className="text-white-300 group-hover:text-white-100 transition-all"
            />
            <span className="text-white-300 group-hover:text-white-100 text-[12px] transition-all font-ppSB">
              Back
            </span>
          </Link>
        </FlexRowStart>
        <br />
        {returnFineTunedStackDetails(name as FineTunedStacksName) ? (
          <FlexRowStartBtw className="w-full px-9 py-5">
            <FlexColStart className="w-full">
              <p className="text-white-100 font-jbEB text-[24px]">
                {stackDetails?.name}
              </p>
              <p className="text-white-300 font-jbR text-[14px]">
                {stackDetails?.description}
              </p>
              <br />
            </FlexColStart>
            <FlexColStart className="w-auto">
              <p className="text-white-100 font-jbEB text-[14px]">
                Supported Technologies
              </p>
              <br />
              <FlexColStart className="w-full h-full">
                <RenderFineTunedStacks
                  tech_stacks={returnFineTunedStacks(name as any)}
                />
              </FlexColStart>
            </FlexColStart>
          </FlexRowStartBtw>
        ) : null}
      </FlexColStart>
    </Layout>
  );
}

export default ProjectTemplate;
