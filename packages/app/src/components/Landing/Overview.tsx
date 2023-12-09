import React from "react";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "../Flex";
import { Bird, Flame } from "lucide-react";
import Image from "next/image";
import { ProjectType } from "@veloz/shared/types";
import { RenderProjectIcons } from "../Templates/Card";

type OverviewData = {
  title: string;
  key: ProjectType;
  desc: string;
};

const overviewData = [
  {
    title: "Framework Freedom",
    key: "Vortex",
    desc: "Our templates are built with a flexible architecture that allows you to use any framework of your choice.",
  },
  {
    title: "Production Ready",
    key: "Apex",
    desc: "Veloz is pre-configured with everything you need to deploy your app to production.",
  },
  {
    title: "Code Simplicity",
    key: "Nebula",
    desc: "Veloz is built with clean code and follows best practices to ensure scalability.",
  },
  {
    title: "Continuous Updates",
    key: "Odyssey",
    desc: "Veloz is constantly updated with new features and improvements.",
  },
] satisfies OverviewData[];

function Overview() {
  return (
    <FlexColStart className="relative w-full h-auto bg-dark-102 border-t-solid border-t-[1px] border-t-gray-100/30 px-9 py-[6em]">
      <div className="w-full md:max-w-[95%] mx-auto h-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-5">
        <FlexColStart className="w-full h-auto">
          <FlexRowStartCenter className="w-auto">
            <Flame
              size={50}
              className="p-3 bg-red-305 text-white-100 rounded-lg"
            />
            <h1 className="text-white-100 font-ppSB">
              Get Started in minutes.
            </h1>
          </FlexRowStartCenter>
          <p className="text-white-300/40 font-ppSB text-2xl md:text-4xl">
            <span className="text-white-100">Launch with Confidence</span>. Our
            SaaS Starter Kit is equipped with everything you need for a seamless
            project kickstart."
          </p>
        </FlexColStart>
        <FlexColCenter className="w-full">
          <Image
            src="/images/screenshots/scr1.png"
            alt="overview"
            className="w-full h-auto rounded-lg shadow-xl shadow-dark-105"
            width={0}
            height={0}
          />
        </FlexColCenter>
      </div>
      <FlexRowStartBtw className="w-full md:max-w-[95%] mx-auto h-auto mt-20 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 ">
        {overviewData.map((data, i) => (
          <OverviewCard
            title={data.title}
            _key={data.key}
            description={data.desc}
            key={i}
          />
        ))}
      </FlexRowStartBtw>
    </FlexColStart>
  );
}

export default Overview;

type OverviewCardProps = {
  title: string;
  description: string;
  _key: ProjectType;
};

function OverviewCard({ title, description, _key }: OverviewCardProps) {
  return (
    <FlexRowStart className="w-full md:max-w-[250px] h-auto px-4 py-3 rounded-lg bg-dark-200 border-solid border-[1px] border-gray-100/40 ">
      <RenderProjectIcons type={_key} />
      <FlexColStart className="w-full">
        <h1 className="text-white-100 font-ppSB text-md">{title}</h1>
        <p className="text-white-300/40 font-ppReg text-xs">{description}</p>
      </FlexColStart>
    </FlexRowStart>
  );
}
