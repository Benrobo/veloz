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
import { getProjects, getTemplates } from "@/lib/http/requests";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
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
import { ProjectContext } from "@/context/ProjectContext";
import { RenderProjectIcons } from "@/components/StarterKits/Card";
import { PricingBadge } from "@/components/Badge";
import { ResponseData, ReturnedTemplatesType } from "@/types";
import toast from "react-hot-toast";
import usePageActive from "@/hooks/usePageActive";
import { get } from "http";
import StarterKitCard from "@/components/StarterKits/StarterKitCard";

function Templates() {
  const {} = useContext(ProjectContext);
  const [templates, setTemplates] = useState<ReturnedTemplatesType[]>([]);
  const getTemplatesQuery = useQuery({
    queryKey: ["getTemplates"],
    queryFn: async () => await getTemplates(),
  });

  // refetch templates when page is active
  // usePageActive({ fn: () => getTemplatesQuery.refetch(), log: true });

  useEffect(() => {
    if (getTemplatesQuery.error) {
      const errMsg = (getTemplatesQuery.error as any)?.response?.data?.message;
      toast.error(errMsg);
    }
    if (getTemplatesQuery.data) {
      const data = getTemplatesQuery.data as ResponseData;
      setTemplates(data.data as ReturnedTemplatesType[]);
    }
  }, [
    getTemplatesQuery.data,
    getTemplatesQuery.error,
    getTemplatesQuery.isPending,
  ]);

  return (
    <Layout activePage="kits">
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

        {getTemplatesQuery.isPending && (
          <FlexColStartCenter className="w-full h-full">
            <Spinner size={15} />
          </FlexColStartCenter>
        )}

        <br />
        {/* Template parents */}
        <FlexRowStartCenter className="w-full flex-wrap">
          {!getTemplatesQuery.isPending &&
            templates.length > 0 &&
            templates.map((d) => (
              <StarterKitCard
                name={d.name}
                id={d.id}
                tagline={d.tagline}
                pricing_plan={d.pricing_plan}
                userImages={d.users.images}
                thumbnail={d.image}
                key={d.id}
              />
            ))}

          {!getTemplatesQuery.isPending && templates.length === 0 && (
            <FlexColStartCenter className="w-full h-full">
              <p className="text-white-300 font-jbSB text-[12px] ">
                No templates found
              </p>
            </FlexColStartCenter>
          )}
        </FlexRowStartCenter>
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
