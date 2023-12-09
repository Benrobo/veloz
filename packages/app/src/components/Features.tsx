import React from "react";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenterBtw,
  FlexRowStart,
} from "./Flex";
import { Bezier } from "iconsax-react";
import BlurBgRadial from "./BlurBgRadial";
import { cn } from "@/lib/utils";
import { TechStackCategory } from "@veloz/shared/types";
import { Server } from "lucide-react";

function Features() {
  return (
    <FlexColCenter className="relative w-full h-full pb-9 ">
      <FlexColCenter className="text-center h-full max-w-[70%] min-h-[300px] overflow-hidden ">
        <BlurBgRadial className="w-[60%] absolute opacity-1 bottom-[-40%] bg-white-400/50 blur-[250px] " />
        <h1 className="text-white-100 text-[2em] font-ppEB">
          Your SaaS{" "}
          <span className=" relative left-5 whitespace-nowrap">
            <span className="absolute bg-red-305 -left-3 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
            <span className="relative text-white-100">Launchpad</span>
          </span>
        </h1>
        <p className="text-white-300 text-[14px] font-ppReg">
          Unlike any other SaaS boilerplate, we provide you with a complete
          solution to launch your SaaS business. Not all saas are built with{" "}
          <span className="text-white-200 font-ppSB">Next.js</span>! Veloz
          provides customers with much flexibility and customization so you dont
          have to worry about transitioning into a new framework / language
          rather, use the same language you are familiar with.
        </p>
      </FlexColCenter>
      <FlexColCenter className="w-full bg-dark-100">
        <div className="w-full max-w-[90%]  min-h-[350px] grid grid-cols-2">
          <FlexRowStart className="w-full h-full gap-10 flex-wrap py-8 px-5  ">
            <StackFeatures category="frontend" />
            <StackFeatures category="backend" />
          </FlexRowStart>
          <FlexColCenter className="w-auto"></FlexColCenter>
        </div>
      </FlexColCenter>
    </FlexColCenter>
  );
}

export default Features;

type StackFeatureProps = {
  category: TechStackCategory;
  // name: string;
};

function StackFeatures({ category }: StackFeatureProps) {
  const [activeFeature, setActiveFeature] =
    React.useState<TechStackCategory>("frontend");

  return (
    <FlexColCenter className="w-auto">
      <button
        className="transition-all scale-[.85] hover:scale-[1] delay-100 "
        onClick={() => setActiveFeature(category)}
      >
        <FlexColCenter className="relative overflow-hidden w-auto px-4 py-3 rounded-lg border-solid border-[1px] border-white-600 ">
          <BlurBgRadial className="w-[60%] h-[300px] absolute top-[2%] bg-white-300/80 " />
          {RenderStackFeatureIcon(category, activeFeature)}
        </FlexColCenter>
      </button>
      <FlexColCenter>
        <p
          className={cn(
            "text-white-300 text-[13px] font-ppReg",
            "text-white-400"
          )}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
      </FlexColCenter>
    </FlexColCenter>
  );
}

function RenderStackFeatureIcon(
  category: TechStackCategory,
  active: TechStackCategory
) {
  let icon = null;
  const iconSize = 25;

  if (category === "frontend") {
    icon = (
      <Bezier
        size={iconSize}
        className={cn(
          active === "frontend" ? "text-orange-100" : "text-white-400"
        )}
      />
    );
  }
  if (category === "backend") {
    icon = (
      <Server
        size={iconSize}
        className={cn(
          active === "backend" ? "text-orange-100" : "text-white-400"
        )}
      />
    );
  }

  return icon;
}
