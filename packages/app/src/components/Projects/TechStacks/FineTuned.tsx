import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import { cn, getPlanTitle, isUserEligibleForStack } from "@/lib/utils";
import React, { useContext, useState } from "react";
import { FineTunedStacksName, TechStackPricingPlan } from "@veloz/shared/types";
import Image from "next/image";
import { DataContext } from "@/context/DataContext";
import Modal from "@/components/Modal";
import RenderStacks, {
  RenderFineTunedStacks,
} from "@/components/Stacks/Render";
import { Button } from "@/components/ui/button";
import { ProjectContext } from "@/context/ProjectContext";
import { FINE_TUNED_STACKS } from "@data/stack";
import Link from "next/link";

interface FineTunedProps {}

type SelectedCardProps = {
  name: FineTunedStacksName;
  description?: string;
  pricing_plan: TechStackPricingPlan;
};

function FineTuned({}: FineTunedProps) {
  const { setSelectedFinetunedStack, selectedFinetunedStack } =
    useContext(ProjectContext);
  const { togglePremiumModalVisibility, setPkgPlan, userPlan } =
    useContext(DataContext);

  const handleStackSelection = (name: FineTunedStacksName) => {
    const stack = FINE_TUNED_STACKS.find((d) => d.name === name);
    if (stack && stack.available) {
      if (!isUserEligibleForStack(stack.name, stack.plan)) {
        setPkgPlan(stack.plan);
        togglePremiumModalVisibility();
        return;
      }
      setSelectedFinetunedStack(
        stack.name === selectedFinetunedStack ? "" : (stack.name as any)
      );
    }
  };

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

  return (
    <>
      <FlexColStart className="w-full ">
        <p className="text-white-300 font-jbR font-bold text-[12px] ">
          Get started quickly with preconfigured tech stacks designed for
          specific use cases.
        </p>
        <br />
        <FlexRowStartBtw className="gap-2 flex-wrap">
          {FINE_TUNED_STACKS.map(
            (d) =>
              d.available && (
                <FineTunedCard
                  handleStackSelection={() =>
                    handleStackSelection(d.name as any)
                  }
                  name={d.name as FineTunedStacksName}
                  pricing_plan={d.plan}
                  stacks={extractFineTunedStack(d.tech_stacks)}
                  isSelected={selectedFinetunedStack === d.name}
                  available={d.available}
                />
              )
          )}
        </FlexRowStartBtw>
      </FlexColStart>
    </>
  );
}

export default FineTuned;

interface FineTunedCardProps {
  name: FineTunedStacksName;
  pricing_plan: TechStackPricingPlan;
  isSelected?: boolean;
  handleStackSelection: (name: FineTunedStacksName) => void;
  stacks: string[];
  available: boolean;
}

function FineTunedCard({
  name,
  pricing_plan,
  isSelected,
  handleStackSelection,
  stacks,
  available,
}: FineTunedCardProps) {
  const {} = useContext(DataContext);

  const max_stack = 5;
  const stack_count = stacks.length;
  const rest = stack_count - max_stack;
  // show only stack whoose length is less than 6 to prevent overflow on the card
  const extractStack = stacks.filter((s) => s.length <= 6).slice(0, max_stack);

  return (
    <button
      className={cn(
        "w-auto relative rounded-md border-solid border-[2px] border-transparent",
        isSelected ? " border-orange-100" : ""
      )}
      onClick={() => handleStackSelection(name)}
    >
      <FlexColStart className="w-fit max-w-[350px] min-w-[300px] bg-dark-300 rounded-md overflow-hidden ">
        <FlexRowStartBtw className="w-full px-4 pt-0 pb-4 py-5">
          <FlexColStart>
            <p className="text-white-100 leading-none text-[14px] font-ppSB">
              {name}
            </p>
            <p className="text-gray-100 mt-2 leading-none text-[12px] font-ppR italic">
              Last updated:{" "}
              <span className="text-white-200 font-ppSB">2 days ago</span>
            </p>
          </FlexColStart>
          <FlexRowCenterBtw className="w-auto px-3 py-1 rounded-[30px] bg-dark-200 scale-[.85] border-solid border-white-600 border-[1px]">
            <p
              className={cn(
                "text-white-100 text-[12px] font-ppB",
                pricing_plan === "BASIC_PKG"
                  ? "text-blue-100"
                  : pricing_plan === "STANDARD_PKG"
                    ? "text-orange-100"
                    : pricing_plan === "ENTERPRISE_PKG"
                      ? "text-pink-100"
                      : ""
              )}
            >
              {getPlanTitle(pricing_plan)}
            </p>
            <Image
              src={
                pricing_plan === "STANDARD_PKG"
                  ? "/images/diamond.png"
                  : "/images/diamond-2.png"
              }
              width={15}
              height={0}
              alt="premium"
            />
          </FlexRowCenterBtw>
        </FlexRowStartBtw>
        <FlexRowStart className="w-full gap-2 px-3">
          {extractStack.map((stack, i) => (
            <span
              key={i}
              className="text-white-200 bg-dark-200 rounded-md font-jbR text-[10px] px-[5px] py-[2px]"
            >
              {stack}
            </span>
          ))}
          {rest > 0 && (
            <span className="text-white-200 bg-dark-200 rounded-md font-jbR text-[10px] px-[5px] py-[2px]">
              +{rest}
            </span>
          )}
        </FlexRowStart>
        <FlexRowStartBtw className="mt-0 px-3 py-2 pb-4">
          <Link
            href={`/projects/template/${name}`}
            className="text-white-100 underline text-[12px] font-jbEB italic"
          >
            more info
          </Link>
        </FlexRowStartBtw>
      </FlexColStart>
    </button>
  );
}
