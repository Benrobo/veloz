"use client";
import { PricingBadge } from "@/components/Badge";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenter,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import Layout from "@/components/Layout";
import { Spinner } from "@/components/Spinner";
import { RenderProjectIcons } from "@/components/Templates/Card";
import TemplateDetails from "@/components/Templates/Details";
import { Button } from "@/components/ui/button";
import { TEMPLATES_PRICING_MODEL } from "@/constant/template";
import { DataContext } from "@/context/DataContext";
import { FINE_TUNED_STACKS, PARENT_TEMPLATES } from "@/data/stack";
import usePageLoaded from "@/hooks/usePageLoaded";
import { withAuth } from "@/lib/helpers";
import { createCheckout, getUser } from "@/lib/http/requests";
import { cn, formatCurrency, hasTemplateBeenPurchased } from "@/lib/utils";
import { ResponseData, UserInfo } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FineTunedStacksName,
  ProjectType,
  TechStackPricingPlan,
} from "@veloz/shared/types";
import { ArrowLeftToLine, CheckCheck, Zap } from "lucide-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

function Page() {
  const { purchasedTemplates, setPurchasedTemplates } = useContext(DataContext);
  const pageLoaded = usePageLoaded();
  const parentName = useRouter().query.parent as string;
  const [parentTemplates, setParentTemplates] = useState(PARENT_TEMPLATES);
  const createCheckoutMut = useMutation({
    mutationFn: async (data: any) => await createCheckout(data),
  });

  const userInfoQuery = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUser(),
  });

  const parentTemplate = parentTemplates.find(
    (t) => t.name.toLowerCase() === parentName?.toLowerCase()
  );

  const childTemplates = FINE_TUNED_STACKS.filter(
    (s) => s.parent_id === parentTemplate?.id
  );

  const pricingModel = TEMPLATES_PRICING_MODEL.find(
    (m) => m.plan === parentTemplate?.pricing_plan
  );

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

  useEffect(() => {
    if (createCheckoutMut.error) {
      const errMsg = (createCheckoutMut.error as any)?.response?.data?.message;
      toast.error(errMsg);
    }
    if (createCheckoutMut.data) {
      const data = createCheckoutMut.data as ResponseData;
      window.location.href = data.data.url;
    }
  }, [
    createCheckoutMut.data,
    createCheckoutMut.error,
    createCheckoutMut.isPending,
  ]);

  React.useEffect(() => {
    if (!userInfoQuery?.data?.errorStatus) {
      const reqData = userInfoQuery.data?.data as UserInfo;
      setPurchasedTemplates(reqData?.purchased_items);
    }
  }, [userInfoQuery.isLoading, userInfoQuery.data]);

  if (!pageLoaded || userInfoQuery.isPending) {
    return (
      <Layout activePage="templates">
        <FlexColCenter className="w-full h-screen">
          <Spinner />
        </FlexColCenter>
      </Layout>
    );
  }

  const alreadyPurchased =
    parentTemplate?.pricing_plan === "FREE_PKG" ||
    hasTemplateBeenPurchased(
      purchasedTemplates,
      parentTemplate?.id as string,
      parentTemplate?.name as string
    );

  return (
    <Layout activePage="templates">
      {!parentTemplates && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-white-100">No templates found</p>
        </div>
      )}

      {parentTemplates && (
        <FlexColStart className="w-full h-full px-5 py-4">
          <FlexRowStart className="px-4 py-4">
            <Link
              href="/templates"
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
          <FlexColStart className="w-full px-3">
            <FlexRowStartBtw className="w-full">
              <FlexColStart className="w-full">
                <h1 className="text-white-100 font-jbEB text-2xl">
                  {parentName}
                </h1>
                <p className="text-white-300 font-jbR text-[12px]">
                  {parentTemplate?.tagline}
                </p>
                {/* Template description */}
                <TemplateDetails name={parentName} />
              </FlexColStart>
              <FlexColStart className="w-fit min-w-[250px]">
                <FlexRowEnd className="w-full">
                  {!alreadyPurchased && (
                    <Button
                      variant={"primary"}
                      className={cn(
                        "w-fit min-w-[190px] rounded-[30px] font-ppSB text-[15px] gap-2",
                        createCheckoutMut.isPending
                          ? "bg-purple-100/50 hover:cursor-not-allowed"
                          : "premium-button"
                      )}
                      onClick={() => {
                        const parentTempId = parentTemplate?.id as string;
                        createCheckoutMut.mutate(parentTempId);
                      }}
                      disabled={createCheckoutMut.isPending}
                    >
                      {createCheckoutMut.isPending ? (
                        <FlexRowCenter className="w-full py-10">
                          <Spinner color="#fff" size={16} />
                        </FlexRowCenter>
                      ) : (
                        <>
                          <Zap size={15} />{" "}
                          <span className="text-[13px]">Buy Now</span>{" "}
                          {formatCurrency(
                            pricingModel?.pricing.price as number,
                            pricingModel?.pricing.currency as string
                          )}
                        </>
                      )}
                    </Button>
                  )}

                  {alreadyPurchased && (
                    <FlexRowStartCenter className="gap-1 w-auto px-5 py-[10px] bg-dark-200 rounded-[30px] scale-[.85] ">
                      <CheckCheck
                        size={15}
                        strokeWidth={"3px"}
                        className="text-orange-100"
                      />
                      <span className="text-orange-100 font-jbEB text-[11px] ">
                        Purchased
                      </span>
                    </FlexRowStartCenter>
                  )}

                  <Link
                    href={parentTemplate?.demo_url as string}
                    target="_blank"
                  >
                    <FlexRowStartCenter className="gap-2 w-[120px] px-5 py-[10px] bg-dark-200 rounded-[30px] scale-[.85] ">
                      <span className="p-[5px] rounded-[50%] bg-green-400 "></span>
                      <span className="text-orange-100 underline font-jbEB text-[11px] ">
                        Live Demo
                      </span>
                    </FlexRowStartCenter>
                  </Link>
                </FlexRowEnd>
              </FlexColStart>
            </FlexRowStartBtw>
            <br />
            <p className="text-white-300 font-jbR text-[12px]">
              Buying this template will give you access to all the child
              templates listed below.
            </p>
          </FlexColStart>
          <br />
          <FlexRowStartBtw className="px-3 gap-2 flex-wrap">
            {childTemplates.length > 0 ? (
              childTemplates.map(
                (d) =>
                  d.available && (
                    <FineTunedCard
                      name={d.name as FineTunedStacksName}
                      pricing_plan={d.plan as any}
                      stacks={extractFineTunedStack(d.tech_stacks)}
                      available={d.available}
                      label={d.label}
                    />
                  )
              )
            ) : (
              <FlexColCenter className="w-full h-full">
                <p className="text-white-100 font-jbSB text-[15px]">
                  No templates found. Check back later.
                </p>
              </FlexColCenter>
            )}
          </FlexRowStartBtw>
        </FlexColStart>
      )}
    </Layout>
  );
}

export default withAuth(Page);

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
      href={`/templates/parent/child/${name}`}
      className={cn(
        "w-auto relative rounded-md border-solid border-[2px] border-transparent"
      )}
    >
      <FlexColStart className="w-fit max-w-[350px] min-w-[300px] bg-dark-300 rounded-md overflow-hidden py-4 border-solid border-[.5px] border-gray-100  ">
        <FlexRowStartBtw className="w-full px-4 pt-0 pb-4 py-3">
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
          {/* <div className="absolute top-3 right-3">
            <PricingBadge pricing_plan={pricing_plan} />
          </div> */}
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
