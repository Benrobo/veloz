import STACKS_LOGOS from "@/data/stacks";
import React from "react";
import { FlexColCenter, FlexColEnd, FlexRowStart } from "../Flex";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface RenderStacksProps {
  tech_stacks: string[];
}

type StackObj = { name: string; key: string; img: string };

const stackWithWhiteBg = ["nextjs"];
const stackWithRoundedCorners = ["nextjs"];
const stackWithExtendedHeight = ["stripe", "mysql"];

function RenderStacks({ tech_stacks }: RenderStacksProps) {
  const validStacks: StackObj[] = [];
  const stackData = STACKS_LOGOS.map((d) => d.key);
  if (tech_stacks.length > 0) {
    tech_stacks.forEach((d, i, arr) => {
      if (d.length > 0) {
        if (stackData.includes(d)) {
          const foundStack = STACKS_LOGOS.find(
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
