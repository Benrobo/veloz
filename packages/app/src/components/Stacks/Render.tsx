import { GENERAL_STACKS as GENERAL_STACKS_DATA } from "@data/stack";
import React, { useContext, useEffect, useState } from "react";
import { FlexColCenter, FlexColEnd, FlexColStart, FlexRowStart } from "../Flex";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import {
  CodebaseArchitectureMap,
  GENERAL_STACK_VALUE,
  TechStackCategory,
} from "@veloz/shared/types";
import { cn, isUserEligibleForStack } from "@/lib/utils";
import { DataContext } from "@/context/DataContext";
import { StackImages } from "@/data/images";

interface RenderStacksProps {
  tech_stacks: string[];
  category: TechStackCategory;
}

type StackObj = { name: string; key: string; img: string };

const stackWithWhiteBg = ["nextjs"];
const stackWithRoundedCorners = ["nextjs"];
const stackWithExtendedHeight = [
  "stripe",
  "mysql",
  "golang",
  "laravel",
  "nodejs",
  "nextjs-api",
];

function RenderStacks({ tech_stacks, category }: RenderStacksProps) {
  const validStacks: StackObj[] = [];
  const stacks = GENERAL_STACKS_DATA.find(
    (stk: any) => stk.category === category
  )?.stacks;
  const stackData = stacks?.map((d) => d.key);
  if (tech_stacks.length > 0) {
    tech_stacks.forEach((d, i, arr) => {
      if (d.length > 0) {
        if (stackData?.includes(d)) {
          const foundStack = stacks?.find((stack) => stack.key === d);
          validStacks.push({
            name: foundStack?.name as string,
            key: d,
            img: getImageUrl(d) as string,
          });
        }
      }
    });
  }

  return (
    <FlexRowStart className="w-full flex-wrap gap-8">
      {validStacks.map((stack) => (
        <FlexColCenter key={stack.key} className="w-fit h-[70px]">
          <Image
            width={
              stackWithExtendedHeight.includes(stack.key)
                ? 50
                : stack.key === "lemonsqueezy"
                  ? 120
                  : 30
            }
            height={0}
            alt={stack.key}
            src={stack.img}
            className={twMerge(
              stackWithRoundedCorners.includes(stack.key)
                ? "rounded-[50%]"
                : "",
              stackWithWhiteBg.includes(stack.key) ? "bg-white-105" : ""
            )}
          />
          <span className="px-2 py-1 text-[10px] text-white-100 rounded-md bg-dark-200 font-ppR">
            {stack.name}
          </span>
        </FlexColCenter>
      ))}
    </FlexRowStart>
  );
}

export default RenderStacks;

// Refined Renderer
interface RenderSelectableStacksProps {
  category: TechStackCategory;
  updateStacksState: (
    key: string,
    name: string,
    category: TechStackCategory
  ) => void;
  selecedStacks: CodebaseArchitectureMap;
}

export function RenderFineTunedStacks({
  tech_stacks,
}: {
  tech_stacks: string[];
}) {
  const validStacks: StackObj[] = [];
  const stacks = GENERAL_STACKS_DATA.map((stk: any) => stk.stacks);
  const _traversedStacks: { name: string; key: string }[] = [];
  const stackData: string[] = [];

  if (tech_stacks.length > 0) {
    for (const st of stacks) {
      for (const s of st) {
        stackData.push(s.key);
        _traversedStacks.push({ name: s.name, key: s.key });
      }
    }
    for (const d of tech_stacks) {
      if (d.length > 0) {
        if (stackData?.includes(d)) {
          const foundStack = _traversedStacks?.find((stack) => stack.key === d);
          validStacks.push({
            name: foundStack?.name as string,
            key: d,
            img: getImageUrl(d) as string,
          });
        }
      }
    }
  }

  return (
    <FlexRowStart className="w-full flex-wrap gap-8">
      {validStacks.map((stack) => (
        <FlexColCenter
          key={stack.key}
          className="w-fit h-[90px] flex flex-col items-center justify-around py-3 px-2 rounded-md "
        >
          <Image
            width={
              stackWithExtendedHeight.includes(stack.key)
                ? 50
                : stack.key === "lemonsqueezy"
                  ? 120
                  : 30
            }
            height={0}
            alt={stack.key}
            src={stack.img}
            className={twMerge(
              stackWithRoundedCorners.includes(stack.key)
                ? "rounded-[50%]"
                : "",
              stackWithWhiteBg.includes(stack.key) ? "bg-white-105" : ""
            )}
          />
          <span className="px-2 py-1 text-[10px] text-white-100 rounded-md bg-dark-200 font-ppR">
            {stack.name}
          </span>
        </FlexColCenter>
      ))}
    </FlexRowStart>
  );
}

function getImageUrl(stackName: string) {
  const stack = StackImages.find((s) => s.name === stackName);
  return stack?.img || "";
}
