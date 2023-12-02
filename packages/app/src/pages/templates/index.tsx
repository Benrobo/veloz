import Layout from "@/components/Layout";
import { withAuth } from "@/lib/helpers";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  FineTunedStacksName,
  ProjectType,
  TechStackPricingPlan,
} from "@veloz/shared/types";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/http/requests";
import {
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
} from "@/components/Flex";
import { Spinner } from "@/components/Spinner";
import DataContext from "@/context/DataContext";
import { FINE_TUNED_STACKS } from "@/data/stack";
import { cn, getPlanTitle } from "@/lib/utils";
import Image from "next/image";
import { ProjectContext } from "@/context/ProjectContext";
import { RenderProjectIcons } from "@/components/Projects/Card";

function Projects() {
  const { setSelectedFinetunedStack, selectedFinetunedStack } =
    useContext(ProjectContext);
  // const { togglePremiumModalVisibility, setPkgPlan, userPlan } =
  // useContext(DataContext);

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
    <Layout activePage="templates">
      <FlexColStart className="w-full px-4 py-4 ">
        <br />
        <FlexRowStartBtw className="gap-2 flex-wrap">
          {FINE_TUNED_STACKS.map(
            (d) =>
              d.available && (
                <FineTunedCard
                  name={d.name as FineTunedStacksName}
                  pricing_plan={d.plan}
                  stacks={extractFineTunedStack(d.tech_stacks)}
                  available={d.available}
                  label={d.label}
                />
              )
          )}
        </FlexRowStartBtw>
      </FlexColStart>
    </Layout>
  );
}

export default withAuth(Projects);

interface FineTunedCardProps {
  name: FineTunedStacksName;
  pricing_plan: TechStackPricingPlan;
  stacks: string[];
  available: boolean;
  label: ProjectType;
}

function FineTunedCard({
  name,
  pricing_plan,
  stacks,
  label,
  available,
}: FineTunedCardProps) {
  const max_stack = 5;
  const stack_count = stacks.length;
  const rest = stack_count - max_stack;
  // show only stack whoose length is less than 6 to prevent overflow on the card
  const extractStack = stacks.filter((s) => s.length <= 6).slice(0, max_stack);

  return (
    <Link
      href={`/templates/${name}`}
      className={cn(
        "w-auto relative rounded-md border-solid border-[2px] border-transparent"
      )}
    >
      <FlexColStart className="w-fit max-w-[350px] min-w-[300px] bg-dark-300 rounded-md overflow-hidden py-4 border-solid border-[.5px] border-gray-100  ">
        <FlexRowStartBtw className="w-full px-4 pt-0 pb-4 py-5">
          <FlexRowStart>
            <RenderProjectIcons type={label} />
            <FlexColStart>
              <p className="text-white-100 leading-none text-[14px] font-ppSB">
                {name}
              </p>
              <p className="text-white-300 leading-none text-[11px] font-jbSB">
                Fine-tuned stack.
              </p>
            </FlexColStart>
          </FlexRowStart>
          <FlexRowCenterBtw className="w-auto absolute top-4 right-2 px-3 py-1 rounded-[30px] bg-dark-200 scale-[.85] border-solid border-white-600 border-[1px]">
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
      </FlexColStart>
    </Link>
  );
}
