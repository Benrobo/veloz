import TECH_STACKS from "@/data/stacks";
import React, { useEffect, useState } from "react";
import { FlexColCenter, FlexColEnd, FlexRowStart } from "../Flex";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { CodebaseArchitectureMap, TechStackCategory } from "../../../types";
import { cn } from "@/lib/utils";

interface RenderStacksProps {
  tech_stacks: string[];
  category?: TechStackCategory;
}

type StackObj = { name: string; key: string; img: string };

const stackWithWhiteBg = ["nextjs"];
const stackWithRoundedCorners = ["nextjs"];
const stackWithExtendedHeight = ["stripe", "mysql"];

function RenderStacks({ tech_stacks }: RenderStacksProps) {
  const validStacks: StackObj[] = [];
  const stackData = TECH_STACKS.map((d) => d.key);
  if (tech_stacks.length > 0) {
    tech_stacks.forEach((d, i, arr) => {
      if (d.length > 0) {
        if (stackData.includes(d)) {
          const foundStack = TECH_STACKS.find(
            (stack) => stack.key === d
          ) as StackObj;
          validStacks.push(foundStack);
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

/**
 * - Selectable (only able to select one stack per category)
 * - Show if stack is available or not. (coming soon badge)
 * - Show premium badge if stack is considered available for a specific plan users only.
 * {
 *  "frontend":{
 *   "stack": ""
 *  }
 * }
 */

interface RenderSelectableStacksProps {
  category?: TechStackCategory;
  updateStacksState: (
    key: string,
    name: string,
    category: TechStackCategory
  ) => void;
  selecedStacks: CodebaseArchitectureMap;
}

export function RenderSelectableStacks({
  category,
  updateStacksState,
  selecedStacks,
}: RenderSelectableStacksProps) {
  const tech_stacks = TECH_STACKS.filter((stk) => stk.category === category);
  function handleStackSelection(key: string, name: string) {
    const techCategory = category as TechStackCategory;
    updateStacksState(key, name, techCategory);
  }

  const selectedStackExists = selecedStacks[category as TechStackCategory];

  return (
    <FlexRowStart className="w-full flex-wrap gap-8">
      {tech_stacks.length > 0 ? (
        tech_stacks.map((stack) => (
          <button
            key={stack.key}
            className={cn(
              "px-3 py-2 rounded-md border-solid border-[1px] border-white-600 ",
              selectedStackExists && selectedStackExists.stack === stack.key
                ? "border-orange-100"
                : ""
            )}
            onClick={() => handleStackSelection(stack.key, stack.name)}
          >
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
          </button>
        ))
      ) : (
        <p className="text-gray-100 font-ppR text-[12px] ">Nothing yet</p>
      )}
    </FlexRowStart>
  );
}
