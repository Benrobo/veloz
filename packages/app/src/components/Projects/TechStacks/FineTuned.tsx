import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import { cn, getPlanTitle } from "@/lib/utils";
import { Crosshair, Gem } from "lucide-react";
import React, { useContext, useState } from "react";
import { Tabs } from ".";
import { FineTunedStacksName, TechStackPricingPlan } from "../../../../types";
import Image from "next/image";
import { DataContext } from "@/context/DataContext";
import Modal from "@/components/Modal";
import RenderStacks from "@/components/Stacks/Render";
import { Button } from "@/components/ui/button";
import { ProjectContext } from "@/context/ProjectContext";
import { FINE_TUNED_STACKS } from "@/data/stacks";

interface FineTunedProps {}

type SelectedCardProps = {
  name: FineTunedStacksName;
  pricing_plan: TechStackPricingPlan;
};

function FineTuned({}: FineTunedProps) {
  const { setSelectedFinetunedStack } = useContext(ProjectContext);
  const [selectedCard, setSelectedCard] = useState<SelectedCardProps>(
    {} as any
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleStackSelection = (name: FineTunedStacksName) => {
    console.log(name);
    const stack = FINE_TUNED_STACKS.find((d) => d.name === name);
    if (stack) {
      setSelectedCard({
        name: stack?.name as FineTunedStacksName,
        pricing_plan: stack?.plan as TechStackPricingPlan,
      });
      setModalVisible(true);
    }
  };

  const tech_stacks = [
    "nodejs",
    "tailwindcss",
    "mysql",
    "lemonsqueezy",
    "postmark",
    "golang",
    "postgresql",
    "laravel",
    "resend",
    "stripe",
  ];

  return (
    <>
      <FlexColStart className="w-full">
        <p className="text-gray-100 font-jbR font-bold text-[13px] ">
          Get started quickly with preconfigured tech stacks designed for
          specific use cases.
        </p>
        <br />
        <FineTunedCard
          handleStackSelection={() => handleStackSelection("Zeus" as any)}
          name={"Zeus" as FineTunedStacksName}
          pricing_plan={"ENTERPRISE_PKG"}
          stacks={tech_stacks}
        />
      </FlexColStart>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        showCloseIcon
      >
        <FlexColCenter className="w-full h-full">
          <FlexRowCenterBtw className="w-full h-full pt-9 pb-9 max-w-[700px] max-h-[450px] bg-dark-200 rounded-md px-2">
            <FlexColStart className="w-full h-full px-5">
              <div
                className={cn(
                  `w-full h-auto min-h-[200px] bg-cover bg-no-repeat bg-top-left rounded-md`,
                  `bg-[url(/images/finetuned/zeus.jpeg)]`
                )}
              ></div>
              <FlexRowStartBtw>
                <h1 className="text-white-100 text-2xl font-jbSB font-extrabold">
                  Zeus
                </h1>
                <FlexRowCenterBtw className="w-auto px-3 py-1 rounded-[30px] bg-dark-200 scale-[.85] border-solid border-white-600 border-[1px]">
                  <p
                    className={cn(
                      "text-white-100 text-[12px] font-ppB",
                      selectedCard?.pricing_plan === "BASIC_PKG"
                        ? "text-blue-100"
                        : selectedCard?.pricing_plan === "STANDARD_PKG"
                        ? "text-orange-100"
                        : selectedCard?.pricing_plan === "ENTERPRISE_PKG"
                        ? "text-pink-100"
                        : ""
                    )}
                  >
                    {getPlanTitle(selectedCard?.pricing_plan as any)}
                  </p>
                  <Image
                    src={
                      selectedCard?.pricing_plan === "STANDARD_PKG"
                        ? "/images/diamond.png"
                        : "/images/diamond-2.png"
                    }
                    width={15}
                    height={0}
                    alt="premium"
                  />
                </FlexRowCenterBtw>
              </FlexRowStartBtw>
              <FlexRowStartCenter>
                <span className="p-1 bg-green-400 animate-ping rounded-[50%]"></span>
                <span className="text-gray-100 text-[13px] font-jbR">
                  Last updated:{" "}
                  <span className="text-white-300 font-jbR font-bold">
                    1day ago
                  </span>
                </span>
              </FlexRowStartCenter>
              <Button
                variant={"appeal"}
                className="font-jbSB font-extrabold text-[12px] mt-2 "
                onClick={() =>
                  setSelectedFinetunedStack(selectedCard?.name as any)
                }
              >
                Select
              </Button>
            </FlexColStart>
            <FlexColStart className="w-full h-full">
              <FlexColStart className="w-full">
                <p className="text-white-200 font-ppB">Technologies</p>
              </FlexColStart>
              <br />
              <FlexColStart className="w-full h-full gap-5 flex-wrap overflow-y-scroll hideScrollBar2 py-2">
                <RenderStacks tech_stacks={tech_stacks} />
              </FlexColStart>
            </FlexColStart>
          </FlexRowCenterBtw>
        </FlexColCenter>
      </Modal>
    </>
  );
}

export default FineTuned;

interface FineTunedCardProps {
  name: FineTunedStacksName;
  pricing_plan: TechStackPricingPlan;
  isSelected?: boolean;
  handleStackSelection: (name: FineTunedStacksName) => void;
  stacks: string[];
}

function FineTunedCard({
  name,
  pricing_plan,
  isSelected,
  handleStackSelection,
  stacks,
}: FineTunedCardProps) {
  const {} = useContext(DataContext);

  const max_stack = 5;
  const stack_count = stacks.length;
  const rest = stack_count - max_stack;
  const extractStack = stacks.filter((s) => s.length <= 6).slice(0, max_stack);

  return (
    <button className="w-auto" onClick={() => handleStackSelection(name)}>
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
        <FlexRowStart className="w-full gap-2 px-3 pb-4">
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
    </button>
  );
}
