import React from "react";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartCenter,
} from "../Flex";
import { Bezier } from "iconsax-react";
import BlurBgRadial from "../BlurBgRadial";
import { cn } from "@/lib/utils";
import { TechStackCategory } from "@veloz/shared/types";
import {
  CheckCheck,
  DatabaseZap,
  FileSearch2,
  Mails,
  PiggyBank,
  Server,
  ShieldCheck,
} from "lucide-react";
import { GENERAL_STACKS } from "@/data/stack";
import { StackImages } from "@/data/images";
import { FeaturesData, STACKS_NOT_AVAILABLE } from "@/data/features";
import Image from "next/image";

function Features() {
  const [activeFeature, setActiveFeature] =
    React.useState<TechStackCategory>("frontend");

  const getActiveFeatureStack = (name: TechStackCategory) => {
    const _stacks = [];
    const stacks = GENERAL_STACKS.find((stk) => stk.category === name)?.stacks;
    if (stacks) {
      for (const stack of stacks) {
        // get image of each stack
        const stackImg = StackImages.find((img) => img.name === stack.key);
        if (stackImg) {
          _stacks.push({
            name: stack.name,
            img: stackImg.img,
            key: stack.key,
          });
        }
      }
    }
    return _stacks;
  };

  // get active stacks
  const _activeStacks = getActiveFeatureStack(activeFeature);
  const _features = FeaturesData.find((f) => f.key === activeFeature);
  const _allStacks = [
    ...GENERAL_STACKS.map((stk) => stk.category).flat(),
    "seo" as TechStackCategory,
  ];
  const _stackWithWhiteBg = ["nextjs"];

  // sort stacks by availability in descending order
  const activeStacksByAvailability = _activeStacks
    ? _activeStacks
        ?.map((s) => {
          const _unavailable = STACKS_NOT_AVAILABLE.includes(s.key);
          return {
            ...s,
            _unavailable,
          };
        })
        ?.sort((a, b) => (a?._unavailable as any) - (b._unavailable as any))
    : [];

  return (
    <FlexColCenter className="relative w-full h-auto md:h-auto py-[5em] mb-[10em] bg-dark-103 ">
      <FlexColCenter className="text-center w-full h-full md:max-w-[60%] z-[20]">
        <h1 className="text-white-100 text-[1.5em] md:text-[2em] font-ppEB">
          Your SaaS{" "}
          <span className=" relative left-5 whitespace-nowrap">
            <span className="absolute bg-red-305 -left-3 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
            <span className="relative text-white-100">Launchpad</span>
          </span>
        </h1>
        <p className="text-white-300 text-[12px] max-w-[90%] md:w-full md:text-md font-ppReg">
          Veloz offers a unique solution to launch your SaaS business with
          versatility in technology. Unlike typical SaaS boilerplates, we don't
          limit you to a single framework or language. Enjoy the flexibility to
          use the language you're comfortable with while getting the complete
          package for your SaaS journey.
        </p>
      </FlexColCenter>
      <FlexColCenter className="w-full md:max-w-[80%] z-[200]">
        <div className="w-full px-5 md:px-0 flex flex-col md:max-w-[90%] md:grid md:grid-cols-2">
          <FlexRowStart className="w-full h-auto mx-auto md:h-0 gap-10  flex-wrap py-8 md:px-5 ">
            {_allStacks.map((stk, i) => (
              <StackFeatures
                key={i}
                category={stk}
                activeFeature={activeFeature}
                setActiveFeature={setActiveFeature}
              />
            ))}
          </FlexRowStart>
          <FlexColStart className="w-full h-full py-8 md:px-5">
            <FlexColStart className="w-full h-auto">
              <h1 className="text-white-100 text-[13px] font-ppSB leading-none">
                {_features?.title}
              </h1>
              <p className="text-white-400 text-[12px] font-ppReg leading-none">
                {_features?.description}
              </p>
            </FlexColStart>
            {/* Features */}
            <FlexColStart className="w-full h-auto flex-wrap mt-4">
              {_features?.features.map((f, i) => (
                <FlexRowStartCenter key={i} className="gap-1">
                  <CheckCheck size={15} className="text-orange-100" />
                  <span className="text-white-300 font-ppSB text-[11px] ">
                    {f.title}
                  </span>
                </FlexRowStartCenter>
              ))}
            </FlexColStart>

            {/* Stacks Section */}
            <FlexRowStart className="w-full h-0 flex-wrap mt-9 gap-3 md:gap-9">
              {_features?.includeStacks &&
                activeStacksByAvailability.map((d, i) => (
                  <FlexColCenter key={i}>
                    <FlexColCenter className="w-auto h-auto p-3 relative border-solid border-white-600 border-[.5px] rounded-lg ">
                      {STACKS_NOT_AVAILABLE.includes(d.key) && (
                        <span className="px-2 py-[2px] rounded-[30px] text-[8px] font-ppSB text-white-100 bg-red-305 absolute top-[-17%] right-[-5%]">
                          soon!
                        </span>
                      )}
                      <div
                        className={cn(
                          "rounded-[50%]",
                          _stackWithWhiteBg.includes(d.key)
                            ? "bg-white-100"
                            : ""
                        )}
                      >
                        <Image
                          src={d.img}
                          width={d.key === "lemonsqueezy" ? 120 : 30}
                          height={0}
                          className="rounded-md"
                          alt="image"
                        />
                      </div>
                    </FlexColCenter>
                    <span className="text-white-300 text-[10px] font-ppReg">
                      {d.name}
                    </span>
                  </FlexColCenter>
                ))}
            </FlexRowStart>
          </FlexColStart>
        </div>
      </FlexColCenter>
    </FlexColCenter>
  );
}

export default Features;

type StackFeatureProps = {
  category: TechStackCategory;
  activeFeature: TechStackCategory;
  setActiveFeature: React.Dispatch<React.SetStateAction<TechStackCategory>>;
};

function StackFeatures({
  category,
  activeFeature,
  setActiveFeature,
}: StackFeatureProps) {
  return (
    <FlexColCenter className="w-auto">
      <button
        className="transition-all scale-[.95] hover:scale-[1] delay-100 "
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
            "text-xs font-ppReg",
            activeFeature === category ? "text-white-100" : "text-white-300"
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
  if (category === "database") {
    icon = (
      <DatabaseZap
        size={iconSize}
        className={cn(
          active === "database" ? "text-orange-100" : "text-white-400"
        )}
      />
    );
  }
  if (category === "authentication") {
    icon = (
      <ShieldCheck
        size={iconSize}
        className={cn(
          active === "authentication" ? "text-orange-100" : "text-white-400"
        )}
      />
    );
  }
  if (category === "payment") {
    icon = (
      <PiggyBank
        size={iconSize}
        className={cn(
          active === "payment" ? "text-orange-100" : "text-white-400"
        )}
      />
    );
  }
  if (category === "mailing") {
    icon = (
      <Mails
        size={iconSize}
        className={cn(
          active === "mailing" ? "text-orange-100" : "text-white-400"
        )}
      />
    );
  }

  if (category === "seo") {
    icon = (
      <FileSearch2
        size={iconSize}
        className={cn(active === "seo" ? "text-orange-100" : "text-white-400")}
      />
    );
  }

  return icon;
}
