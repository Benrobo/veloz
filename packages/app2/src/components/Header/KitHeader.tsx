"use client";
import React from "react";
import {
  FlexColCenter,
  FlexColEnd,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartCenter,
} from "../Flex";
import { PARENT_KITS } from "@/data/stack";
import Image from "next/image";
import BlurBgRadial from "../BlurBgRadial";
import { Globe, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  name: string;
};

function KitHeader({ name }: Props) {
  const template = PARENT_KITS.find((t) => t.name.toLowerCase() === "zeus");

  return (
    <FlexRowStart className="relative w-full h-full gap-2 py-[4em]">
      <BlurBgRadial className=" w-[100%] lg:w-[60%] h-[300px] absolute top-[10%] lg:top-[-10%] bg-white-300/10 " />
      {/* Header */}
      <div className="relative w-auto h-auto max-w-[95%] md:max-w-[90%] mx-auto py-[5em] flex flex-col-reverse md:grid md:grid-cols-2 gap-10 pattern-bg overflow-y-hidden ">
        <FlexColStart className="w-full px-3 z-[100]">
          <h1 className="text-white-100 font-ppEB text-2xl md:text-4xl">
            Zeus Kits
          </h1>
          <p className="text-white-300 max-w-[90%] md:max-w-[90%] text-[13px] font-ppReg">
            Zeus kits are production-ready, fully cutomizable and responsive
            template powered by{" "}
            <span className="text-white-100 font-ppSB">
              Next.js ( App Router )
            </span>{" "}
            with{" "}
            <span className="text-white-100">Typescript and Javascript</span>{" "}
            support. Zeus kits are equipped with everything you need for a fast
            & easy project kickstart.
          </p>
          <br />
          <FlexRowStartCenter>
            <a
              href={template?.demo.live_url}
              target="_blank"
              className="w-auto ml-[-.9em] m-0 p-0 "
            >
              <FlexRowStartCenter className="gap-2 w-[160px] px-5 py-3 bg-dark-200 rounded-[30px] scale-[.85] ">
                <span className="text-orange-100 font-jbEB text-md ">
                  View Demo
                </span>
                <Globe
                  size={15}
                  strokeWidth={"3px"}
                  className="text-orange-100"
                />
              </FlexRowStartCenter>
            </a>
            <Link href="#kit-pricing">
              <Button
                variant={"primary"}
                className={cn(
                  "w-full rounded-[30px] py-5 px-5 font-ppSB text-[15px] gap-2 premium-button"
                )}
              >
                <Zap size={15} /> View Pricing
              </Button>
            </Link>
          </FlexRowStartCenter>
        </FlexColStart>
        <FlexColEnd className="w-full">
          <Image
            src={template?.image as string}
            alt="zeus"
            width={0}
            height={0}
            className="w-full rounded-md shadow-xl shadow-dark-105"
          />
        </FlexColEnd>
      </div>
    </FlexRowStart>
  );
}

export default KitHeader;
