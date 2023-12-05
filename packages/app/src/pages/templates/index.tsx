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
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import { Spinner } from "@/components/Spinner";
import DataContext from "@/context/DataContext";
import { FINE_TUNED_STACKS, PARENT_TEMPLATES } from "@/data/stack";
import { cn, getPlanTitle } from "@/lib/utils";
import Image from "next/image";
import { ProjectContext } from "@/context/ProjectContext";
import { RenderProjectIcons } from "@/components/Templates/Card";
import { PricingBadge } from "@/components/Badge";
import TemplateCard from "@/components/Templates/TemplateCard";

const testImages = Array(5).fill(
  `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(
    Math.random() * 3
  )}.jpg`
);

function Templates() {
  const { setSelectedFinetunedStack, selectedFinetunedStack } =
    useContext(ProjectContext);
  const [parentTemplates, setParentTemplates] = useState(PARENT_TEMPLATES);
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
        <FlexRowCenterBtw className="w-full">
          <FlexColStart className="gap-2">
            <p className="text-white-100 font-jbEB text-[14px]">
              Veloz Templates
            </p>
            <p className="text-white-300 font-jbSB text-[11px]">
              Ship your project faster with our templates. Select a template to
              start with.
            </p>
          </FlexColStart>
        </FlexRowCenterBtw>

        <br />
        {/* Template parents */}
        <FlexRowStartCenter className="w-full flex-wrap">
          {parentTemplates.map((d) => (
            <TemplateCard
              name={d.name}
              id={d.id}
              tagline={d.tagline}
              pricing_plan={d.pricing_plan}
              userImages={testImages}
              thumbnail={d.image}
              shop_url={d.shop_url}
              key={d.id}
            />
          ))}
        </FlexRowStartCenter>

        {/* <FlexRowStartBtw className="gap-2 flex-wrap">
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
        </FlexRowStartBtw> */}
      </FlexColStart>
    </Layout>
  );
}

export default withAuth(Templates);

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
          <div className="absolute top-3 right-3">
            <PricingBadge pricing_plan={pricing_plan} />
          </div>
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
