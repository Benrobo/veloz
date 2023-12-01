import Accordion from "@/components/Accordion";
import {
  FlexColStart,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import Layout from "@/components/Layout";
import RenderStacks from "@/components/Stacks/Render";
import { FINE_TUNED_STACKS } from "@/data/stack";
import { renderAccdIcon } from "@/lib/comp_utils";
import { FineTunedStacksName } from "@veloz/shared/types";
import { ArrowLeftToLine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

function ProjectTemplate() {
  const { name } = useRouter().query;

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

  const returnFineTunedStacks = (name: FineTunedStacksName) => {
    const stack = FINE_TUNED_STACKS.find((d) => d.name === name);
    if (stack) {
      return extractFineTunedStack(stack.tech_stacks);
    }
    return [];
  };

  const returnFineTunedStackDetails = (name: FineTunedStacksName) => {
    const stack = FINE_TUNED_STACKS.find((d) => d.name === name);
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
    <Layout activePage="projects">
      <FlexColStart className="w-full h-full hideScrollBar2 overflow-y-scroll">
        <FlexRowStart className="px-4 py-4">
          <Link
            href="/projects/create"
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
        <br />
        {returnFineTunedStackDetails(name as FineTunedStacksName) ? (
          <FlexRowStartBtw className="w-full px-9 py-5">
            <FlexColStart className="w-full">
              <p className="text-white-100 font-jbEB text-[24px]">
                {stackDetails?.name}
              </p>
              <p className="text-white-300 font-jbR text-[14px]">
                {stackDetails?.description}
              </p>
              <br />
              <FlexRowStartCenter className="w-auto">
                <span className="bg-green-400 w-[10px] h-[10px] rounded-[50%] animate-pulse "></span>
                <span className="text-white-300 text-[12px] font-jbSB">
                  Last updated:{" "}
                  <span className="text-white-100 font-jbEB">12/11/20202</span>
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

export default ProjectTemplate;
