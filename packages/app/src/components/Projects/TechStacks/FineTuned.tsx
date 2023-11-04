import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import { cn, getPlanTitle } from "@/lib/utils";
import { Button } from "@radix-ui/themes";
import { Crosshair, Gem } from "lucide-react";
import React, { useContext } from "react";
import { Tabs } from ".";
import { FineTunedStacksName, TechStackPricingPlan } from "../../../../types";
import Image from "next/image";
import { DataContext } from "@/context/DataContext";

interface FineTunedProps {}

function FineTuned({}: FineTunedProps) {
  return (
    <FlexColStart className="w-full">
      <p className="text-gray-100 font-jbR font-bold text-[13px] ">
        Get started quickly with preconfigured tech stacks designed for specific
        use cases.
      </p>
      <br />
      <FineTunedCard name="Zeus" pricing_plan={"ENTERPRISE_PKG"} />
    </FlexColStart>
  );
}

export default FineTuned;

interface FineTunedCardProps {
  name: FineTunedStacksName;
  pricing_plan: TechStackPricingPlan;
}

function FineTunedCard({ name, pricing_plan }: FineTunedCardProps) {
  const {} = useContext(DataContext);
  return (
    <button className="w-auto">
      <FlexColStart className="w-fit max-w-[350px] min-w-[300px] bg-dark-300 rounded-md overflow-hidden ">
        <FlexColCenter className="w-full h-full relative">
          <div
            className={cn(
              `w-full h-auto min-h-[150px] bg-cover bg-no-repeat bg-top-left rounded-md`,
              `bg-[url(/images/finetuned/zeus.jpeg)]`
            )}
          ></div>
          <FlexColCenter className="w-full h-full absolute bg-[rgba(0,0,0,.7)]">
            <span className="px-3 py-1 rounded-2xl bg-orange-200 text-orange-100 font-ppSB font-extrabold text-[10px] ">
              coming soon
            </span>
          </FlexColCenter>
        </FlexColCenter>
        <FlexRowStartBtw className="w-full px-4 pt-0 pb-4">
          <FlexColStart>
            <p className="text-white-100 leading-none text-[14px] font-ppSB">
              Zeus
            </p>
            <p className="text-gray-100 leading-none text-[12px] font-ppR italic">
              Last updated:{" "}
              <span className="text-white-200 font-ppSB">2 days ago</span>
            </p>
          </FlexColStart>
          <FlexRowCenterBtw className="w-auto px-3 py-1 rounded-[30px] bg-dark-200 scale-[.85] border-solid border-white-600 border-[1px]">
            <p
              className={cn(
                "text-white-100 text-[12px] font-ppB",
                pricing_plan === "BASIC_PKG"
                  ? "text-blue-100"
                  : pricing_plan === "STANDARD_PKG"
                  ? "text-orange-100"
                  : pricing_plan === "ENTERPRISE_PKG"
                  ? "text-pink-100"
                  : ""
              )}
            >
              {getPlanTitle(pricing_plan)}
            </p>
            <Image
              src={
                pricing_plan === "STANDARD_PKG"
                  ? "/images/diamond.png"
                  : "/images/diamond-2.png"
              }
              width={15}
              height={0}
              alt="premium"
            />
          </FlexRowCenterBtw>
        </FlexRowStartBtw>
      </FlexColStart>
    </button>
  );
}
