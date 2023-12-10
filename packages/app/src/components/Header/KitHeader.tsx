import React from "react";
import {
  FlexColEnd,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartCenter,
} from "../Flex";
import { PARENT_TEMPLATES } from "@/data/stack";
import Image from "next/image";
import BlurBgRadial from "../BlurBgRadial";
import { Globe } from "lucide-react";

type Props = {
  name: string;
};

function KitHeader({ name }: Props) {
  const template = PARENT_TEMPLATES.find(
    (t) => t.name.toLowerCase() === "zeus"
  );

  return (
    <FlexRowStart className="relative w-full h-full gap-2 py-[4em]">
      <BlurBgRadial className=" w-[100%] lg:w-[60%] h-[300px] absolute top-[10%] lg:top-[-10%] bg-white-300/10 " />
      <div className="w-auto h-auto max-w-[90%] mx-auto mt-9 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 ">
        <FlexColStart className="w-full">
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
