"use client";
import Accordion from "@/components/Accordion";
import {
  FlexColStart,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import Layout from "@/components/Layout";
import { DifficultyBadge, StackedAvatar } from "@/components/Badge";
import RenderStacks from "@/components/Stacks/Render";
import { FINE_TUNED_STACKS } from "@/data/stack";
import usePageLoaded from "@/hooks/usePageLoaded";
import { renderAccdIcon } from "@/lib/comp_utils";
import { getLastUpdated, getKitConsumption } from "@/lib/http/requests";
import { ResponseData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { FineTunedStacksName, TechStackPricingPlan } from "@veloz/shared/types";
import { ArrowDownFromLine, ArrowLeftToLine, MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { formatNumber } from "@/lib/utils";
import withAuth from "@/lib/auth/withAuth";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  params: {
    kit_name: string;
  };
};

function ProjectTemplate({ params }: Props) {
  const pageLoaded = usePageLoaded(1000);
  const name = params.kit_name;
  const router = useRouter();
  const [installs, setInstalls] = React.useState<number>(0);
  const [usedBy, setUsedBy] = React.useState<string[]>([]);
  const [lastUpdatedDate, setLastUpdatedDate] = React.useState<string>("");
  const getLastUpdatedQuery = useQuery({
    queryKey: ["last_updated"],
    queryFn: async () => await getLastUpdated((name as string)?.toLowerCase()),
    enabled: pageLoaded,
  });
  const getTemplateConsumptionQuery = useQuery({
    queryKey: ["get_template_consumption"],
    queryFn: async () =>
      await getKitConsumption((name as string)?.toLowerCase()),
    enabled: pageLoaded,
  });

  useEffect(() => {
    if (getLastUpdatedQuery.data) {
      const responseData = getLastUpdatedQuery.data as ResponseData;
      const formatted = responseData?.data?.formatted;
      setLastUpdatedDate(formatted ?? "N/A");
    }
  }, [
    getLastUpdatedQuery.data,
    getLastUpdatedQuery.isPending,
    getLastUpdatedQuery.isError,
  ]);

  useEffect(() => {
    if (getTemplateConsumptionQuery.data) {
      const responseData = getTemplateConsumptionQuery.data as ResponseData;
      const data: {
        installs: number;
        name: string;
        users: { images: string[]; count: number };
      } = responseData?.data;
      // setLastUpdatedDate(formatted ?? "N/A");
      setInstalls(data.installs);
      setUsedBy(data.users.images);
    }
  }, [
    getTemplateConsumptionQuery.data,
    getTemplateConsumptionQuery.isPending,
    getTemplateConsumptionQuery.isError,
  ]);

  const returnFineTunedStackDetails = (name: FineTunedStacksName) => {
    const stack = FINE_TUNED_STACKS.find(
      (d) => d.name.toLowerCase() === name.toLowerCase()
    );
    return stack;
  };

  const stackDetails = returnFineTunedStackDetails(name as FineTunedStacksName);

  const _frontend = stackDetails?.tech_stacks.find(
    (s) => s.title === "frontend"
  );
  const _backend = stackDetails?.tech_stacks.find((s) => s.title === "backend");
  const _database = stackDetails?.tech_stacks.find(
    (s) => s.title === "database"
  );
  const _auth = stackDetails?.tech_stacks.find(
    (s) => s.title === "authentication"
  );
  const _mailing = stackDetails?.tech_stacks.find((s) => s.title === "mailing");
  const _payment = stackDetails?.tech_stacks.find((s) => s.title === "payment");

  return (
    <Layout activePage="kits">
      <FlexColStart className="w-full h-full hideScrollBar2 overflow-y-scroll">
        <FlexRowStart className="px-4 py-4">
          <button
            onClick={() => router.back()}
            className="underline w-auto flex gap-2 items-center justify-start"
          >
            <ArrowLeftToLine
              size={15}
              className="text-white-300 group-hover:text-white-100 transition-all"
            />
            <span className="text-white-300 group-hover:text-white-100 text-[12px] transition-all font-ppSB">
              Back
            </span>
          </button>
        </FlexRowStart>
        <br />
        {stackDetails ? (
          <FlexRowStartBtw className="w-full px-9 py-5 flex-col md:flex-row">
            <FlexColStart className="w-full">
              <FlexColStart className="w-full">
                <FlexRowStartBtw className="w-full pr-7">
                  <FlexRowStartCenter>
                    <p className="text-white-100 font-jbEB text-[24px]">
                      {stackDetails?.name}
                    </p>
                    {stackDetails?.documentation && (
                      <Link
                        href={stackDetails?.documentation as string}
                        target="_blank"
                        className="text-xs underline font-ppReg text-white-200"
                      >
                        <FlexRowStartCenter className="gap-1">
                          Documentation ↗
                        </FlexRowStartCenter>
                      </Link>
                    )}
                  </FlexRowStartCenter>
                  <FlexRowStartCenter>
                    {/* Template Consumption */}
                    <FlexRowStartCenter className="w-fit gap-1">
                      <ArrowDownFromLine size={14} className="text-white-100" />
                      <span className="text-white-100 text-[14px] font-jbSB">
                        {formatNumber(installs)}
                      </span>
                    </FlexRowStartCenter>
                    {/* divider */}
                    <span className="text-white-600">|</span>
                    {/* Used By */}
                    <FlexRowStartCenter className="w-fit">
                      <StackedAvatar limit={5} images={usedBy} />
                    </FlexRowStartCenter>
                  </FlexRowStartCenter>
                </FlexRowStartBtw>
              </FlexColStart>
              <br />
              {stackDetails?.description.split("\n").map((d, i) => (
                <p className="text-white-200 font-ppReg text-[14px]" key={i}>
                  {d}
                </p>
              ))}
              <br />
              <FlexColStart className="w-auto min-w-[200px] rounded-sm bg-[#000] font-mono px-7 py-3 gap-0">
                <span className="text-white-400/50 font-jbR text-[12px] ">
                  # Run the code snippet below to install the template
                </span>
                <FlexRowStartCenter className="">
                  <span className="text-green-400 text-[10px] flex items-center justify-center">
                    ~/
                  </span>
                  <span className="text-white-100 font-jbEB text-[12px] ">
                    veeloz use {stackDetails?.name.toLowerCase()}
                  </span>
                </FlexRowStartCenter>
              </FlexColStart>
              <br />
              <FlexRowStartCenter className="w-auto">
                <span className="text-white-300 text-[12px] font-jbSB">
                  Difficulty:{" "}
                  {/* <span className="text-white-100 font-jbEB">
                    {stackDetails?.difficulty}
                  </span> */}
                </span>
                <DifficultyBadge difficulty={stackDetails?.difficulty as any} />
              </FlexRowStartCenter>

              <FlexRowStartCenter className="w-auto">
                <span className="bg-green-400 w-[10px] h-[10px] rounded-[50%] animate-pulse "></span>
                <span className="text-white-300 text-[12px] font-jbSB">
                  Last updated:{" "}
                  <span className="text-white-100 font-jbEB">
                    {getLastUpdatedQuery.isPending ? "..." : lastUpdatedDate}
                  </span>
                </span>
              </FlexRowStartCenter>
            </FlexColStart>
            <FlexColStart className="w-full max-w-[500px] h-screen hideScrollBar2 overflow-x-hidden overflow-y-scroll">
              <p className="text-white-100 font-jbEB text-[15px]">
                Technologies
              </p>
              <p className="text-white-300 font-jbR text-[12px]">
                Boilerplate code for the following technologies.
              </p>
              <br />
              <FlexColStart className="w-full min-w-[400px] h-full">
                {_frontend && (
                  <Accordion
                    title={_frontend.title}
                    name="frontend"
                    className="w-full"
                    leftIcon={renderAccdIcon("frontend")}
                  >
                    <FlexColStart className="w-full px-3 py-2">
                      <RenderStacks
                        tech_stacks={_frontend.stacks as string[]}
                        category="frontend"
                      />
                    </FlexColStart>
                  </Accordion>
                )}
                {_backend && (
                  <Accordion
                    title={_backend.title}
                    name="backend"
                    className="w-full"
                    leftIcon={renderAccdIcon("backend")}
                  >
                    <FlexColStart className="w-full px-3 py-2">
                      <RenderStacks
                        tech_stacks={_backend.stacks as string[]}
                        category="backend"
                      />
                    </FlexColStart>
                  </Accordion>
                )}
                {_database && (
                  <Accordion
                    title={_database.title}
                    name="database"
                    className="w-full"
                    leftIcon={renderAccdIcon("database")}
                  >
                    <FlexColStart className="w-full px-3 py-2">
                      <RenderStacks
                        tech_stacks={_database.stacks as string[]}
                        category="database"
                      />
                    </FlexColStart>
                  </Accordion>
                )}
                {_auth && (
                  <Accordion
                    title={_auth.title}
                    name="auth"
                    className="w-full"
                    leftIcon={renderAccdIcon("authentication")}
                  >
                    <FlexColStart className="w-full px-3 py-2">
                      <RenderStacks
                        tech_stacks={_auth.stacks as string[]}
                        category="authentication"
                      />
                    </FlexColStart>
                  </Accordion>
                )}
                {_mailing && (
                  <Accordion
                    title={_mailing.title}
                    name="mailing"
                    className="w-full"
                    leftIcon={renderAccdIcon("mailing")}
                  >
                    <FlexColStart className="w-full px-3 py-2">
                      <RenderStacks
                        tech_stacks={_mailing.stacks as string[]}
                        category="mailing"
                      />
                    </FlexColStart>
                  </Accordion>
                )}

                {_payment && (
                  <Accordion
                    title={_payment.title}
                    name="payment"
                    className="w-full"
                    leftIcon={renderAccdIcon("payment")}
                  >
                    <FlexColStart className="w-full px-3 py-2">
                      <RenderStacks
                        tech_stacks={_payment.stacks as string[]}
                        category="payment"
                      />
                    </FlexColStart>
                  </Accordion>
                )}
              </FlexColStart>
            </FlexColStart>
          </FlexRowStartBtw>
        ) : null}
      </FlexColStart>
    </Layout>
  );
}

export default withAuth(ProjectTemplate);
