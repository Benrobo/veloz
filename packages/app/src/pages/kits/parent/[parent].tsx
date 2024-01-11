"use client";
import { PricingBadge } from "@/components/Badge";
import {
  FlexColCenter,
  FlexColEnd,
  FlexColStart,
  FlexRowCenter,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import Layout from "@/components/Layout";
import { Spinner } from "@/components/Spinner";
import { RenderProjectIcons } from "@/components/StarterKits/Card";
import TemplateDetails from "@/components/StarterKits/Details";
import { Button } from "@/components/ui/button";
import { TEMPLATES_PRICING_MODEL } from "@/constant/starter-kit";
import { DataContext } from "@/context/DataContext";
import { LayoutContext } from "@/context/LayoutContext";
import { FINE_TUNED_STACKS, PARENT_KITS } from "@/data/stack";
import usePageLoaded from "@/hooks/usePageLoaded";
import withAuth from "@/lib/auth/withAuth";
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
  const { setActivePage } = useContext(LayoutContext);
  const { purchasedKits, setPurchasedTemplates } = useContext(DataContext);
  const pageLoaded = usePageLoaded();
  const parentName = useRouter().query.parent as string;
  const [parentTemplates, setParentTemplates] = useState(PARENT_KITS);
  const createCheckoutMut = useMutation({
    mutationFn: async (data: any) => await createCheckout(data),
  });

  setActivePage("kits");

  const userInfoQuery = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUser(),
  });

  const parentKit = parentTemplates.find(
    (t) => t.name.toLowerCase() === parentName?.toLowerCase()
  );

  const childTemplates = FINE_TUNED_STACKS.filter(
    (s) => s.parent_id === parentKit?.id
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
    // parentKit?.pricing_plan === "FREE_PKG" ||
    hasTemplateBeenPurchased(
      purchasedKits,
      parentKit?.id as string,
      parentKit?.name as string
    );

  return (
    <Layout activePage="kits">
      {!parentTemplates && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-white-100">No templates found</p>
        </div>
      )}

      {parentTemplates && (
        <FlexColStart className="w-full h-full overflow-y-scroll px-2 md:px-5 py-4 pb-[10em]">
          <FlexRowStart className="px-4 py-4">
            <Link
              href="/kits"
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
          <FlexColStart className="w-full px-2 md:px-5">
            <FlexColStart className="w-full">
              <FlexColStart className="w-full mr-3">
                <FlexRowStartBtw className="w-full flex-wrap">
                  <FlexColStart className="w-full">
                    <h1 className="text-white-100 font-jbEB text-2xl">
                      {parentName}
                    </h1>
                    <p className="text-white-300 font-jbR text-[12px]">
                      {parentKit?.tagline}
                    </p>
                  </FlexColStart>
                  <FlexRowEnd className="w-full mt-5 md:mt-0 px-0 items-start md:items-end justify-start md:justify-end">
                    {!alreadyPurchased && (
                      <Button
                        variant={"primary"}
                        className={cn(
                          "w-fit min-w-[150px] rounded-[30px] font-ppSB text-[15px] gap-2",
                          createCheckoutMut.isPending
                            ? "bg-purple-100/50 hover:cursor-not-allowed"
                            : "premium-button"
                        )}
                        onClick={() => {
                          const parentTempId = parentKit?.id as string;
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
                            <span className="text-xs">Buy Now</span>
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
                      href={parentKit?.demo?.live_url as string}
                      target="_blank"
                    >
                      <FlexRowStartCenter className="gap-2 w-[120px] px-5 py-[13px] bg-dark-200 rounded-[30px] scale-[.95] ">
                        <span className="p-[5px] rounded-[50%] bg-green-400 "></span>
                        <span className="text-orange-100 underline font-jbEB text-[11px] ">
                          Live Demo
                        </span>
                      </FlexRowStartCenter>
                    </Link>
                  </FlexRowEnd>
                </FlexRowStartBtw>

                {/* Template description */}
                <TemplateDetails name={parentName} />
                <br />
                <blockquote className="w-full bg-dark-200/50 px-3 py-3 border-l-solid border-l-[3px] border-l-orange-100 ">
                  <p className="text-white-300 font-jbSB text-[13px]">
                    Purchasing this template will give you access to all related
                    templates listed.
                  </p>
                </blockquote>
              </FlexColStart>
              <FlexColStart className="w-fit h-full min-w-[320px]  ">
                {/* Template cards */}
                <FlexColCenter className="w-full mt-4">
                  {/* <h1 className="text-white-100 text-[14px] font-jbEB">
                    Templates
                  </h1> */}
                </FlexColCenter>
                <FlexColEnd className="w-full gap-1 flex-wrap px-0">
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
                            tagline={d.tagline}
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
                </FlexColEnd>
              </FlexColStart>
            </FlexColStart>
          </FlexColStart>
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
  tagline: string;
}

function FineTunedCard({
  name,
  pricing_plan,
  stacks,
  label,
  available,
  tagline,
}: FineTunedCardProps) {
  const max_stack = 5;
  const stack_count = stacks.length;
  const rest = stack_count - max_stack;
  // show only stack whoose length is less than 6 to prevent overflow on the card
  const extractStack = stacks.filter((s) => s.length <= 6).slice(0, max_stack);

  return (
    <Link
      href={`/kits/parent/child/${name}`}
      className={cn(
        "w-full md:w-auto relative rounded-md border-solid border-[2px] border-transparent"
      )}
    >
      <FlexColStart className="w-full md:w-fit md:max-w-[350px] min-w-[300px] bg-dark-300 rounded-md overflow-hidden py-4 border-solid border-[.5px] border-gray-100  ">
        <FlexRowStartBtw className="w-full px-4 pt-0 pb-4 py-3">
          <FlexRowStart>
            <RenderProjectIcons type={label} />
            <FlexColStart>
              <p className="text-white-100 leading-none text-[14px] font-ppSB">
                {name}
              </p>
              <p className="text-white-300 leading-none text-[11px] font-jbSB">
                {tagline}
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
