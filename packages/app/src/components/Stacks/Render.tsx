import { REFINED_STACKS as REFINED_STACKS_DATA } from "@data/stack";
import React, { useContext, useEffect, useState } from "react";
import { FlexColCenter, FlexColEnd, FlexRowStart } from "../Flex";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import {
  CodebaseArchitectureMap,
  REFINED_STACK_VALUE,
  TechStackCategory,
} from "@veloz/shared/types";
import { cn, isUserEligibleForStack, isStackAvailable } from "@/lib/utils";
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
  const stacks = REFINED_STACKS_DATA.find(
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

export function RenderSelectableStacks({
  category,
  updateStacksState,
  selecedStacks,
}: RenderSelectableStacksProps) {
  const { userPlan, togglePremiumModalVisibility, setPkgPlan } =
    useContext(DataContext);
  const tech_stacks = REFINED_STACKS_DATA.find(
    (stk) => stk.category === category
  )?.stacks as REFINED_STACK_VALUE[];

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
              "min-w-[120px] min-h-[120px] relative px-3 py-2 rounded-md border-solid border-[1px] border-white-600 overflow-hidden ",
              selectedStackExists && selectedStackExists.stack === stack.key
                ? "border-orange-100"
                : ""
            )}
            onClick={() => {
              if (!isStackAvailable(stack.key, category)) return;
              if (
                isStackAvailable(stack.key, category) &&
                !isUserEligibleForStack(stack.key, category, userPlan)
              ) {
                setPkgPlan(stack.pricing_plan);
                togglePremiumModalVisibility();
                return;
              }
              handleStackSelection(stack.key, stack.name);
            }}
            disabled={!isStackAvailable(stack.key, category)}
          >
            {/* Coming soon badge */}
            {!isStackAvailable(stack.key, category) && (
              <FlexColCenter className="w-full h-full absolute top-0 left-0 backdrop-blur-[1px] ">
                <span className="px-2 py-1 rounded-[30px] bg-orange-301 border-solid border-[.5px] border-white-600 text-orange-100 font-ppSB text-[9px] ">
                  Coming Soon
                </span>
              </FlexColCenter>
            )}

            {isStackAvailable(stack.key, category) &&
              !isUserEligibleForStack(stack.key, category, userPlan) && (
                <FlexColCenter className="w-full h-full absolute top-0 left-0 backdrop-blur-[1.5px] z-[10] ">
                  <Image
                    src={
                      stack.pricing_plan === "STANDARD_PKG"
                        ? "/images/diamond.png"
                        : "/images/diamond-2.png"
                    }
                    width={30}
                    height={0}
                    alt="premium"
                  />
                </FlexColCenter>
              )}

            <FlexColCenter
              key={stack.key}
              className="w-full min-h-[85px] h-fit "
            >
              <Image
                width={
                  stackWithExtendedHeight.includes(stack.key)
                    ? 40
                    : stack.key === "lemonsqueezy"
                    ? 120
                    : 30
                }
                height={0}
                alt={stack.key}
                src={getImageUrl(stack.key) as string}
                className={twMerge(
                  stackWithRoundedCorners.includes(stack.key)
                    ? "rounded-[50%]"
                    : "",
                  stackWithWhiteBg.includes(stack.key) ? "bg-white-105" : "",
                  stack.key === "nextjs-api" ? "scale-[3] mt-2" : ""
                )}
              />
              <span className="px-2 py-1 mt-2 text-[10px] text-white-100 rounded-md bg-dark-200 font-ppR">
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

export function RenderFineTunedStacks({
  tech_stacks,
}: {
  tech_stacks: string[];
}) {
  const validStacks: StackObj[] = [];
  const stacks = REFINED_STACKS_DATA.map((stk: any) => stk.stacks);
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

function getImageUrl(stackName: string) {
  const stack = StackImages.find((s) => s.name === stackName);
  return stack?.img || "";
}
