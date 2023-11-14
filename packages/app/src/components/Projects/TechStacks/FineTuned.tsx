import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import { cn, getPlanTitle } from "@/lib/utils";
import React, { useContext, useState } from "react";
import { FineTunedStacksName, TechStackPricingPlan } from "@veloz/shared/types";
import Image from "next/image";
import { DataContext } from "@/context/DataContext";
import Modal from "@/components/Modal";
import RenderStacks, {
  RenderFineTunedStacks,
} from "@/components/Stacks/Render";
import { Button } from "@/components/ui/button";
import { ProjectContext } from "@/context/ProjectContext";
import { FINE_TUNED_STACKS } from "@veloz/shared/data/stack";

interface FineTunedProps {}

type SelectedCardProps = {
  name: FineTunedStacksName;
  description?: string;
  pricing_plan: TechStackPricingPlan;
};

const getStackImg = (name: FineTunedStacksName) => {
  switch (name?.toLocaleLowerCase()) {
    case "athena":
      return "/images/finetuned/athena.jpeg";
    case "hera":
      return "/images/finetuned/hera.jpeg";
    case "zeus":
      return "/images/finetuned/zeus.jpeg";
    case "poseidon":
      return "/images/finetuned/poseidon.jpeg";
    case "ares":
      return "/images/finetuned/ares.jpeg";
    case "dynamo":
      return "/images/finetuned/dynamo.jpeg";
    default:
      return "/images/finetuned/zeus.jpeg";
  }
};

function FineTuned({}: FineTunedProps) {
  const { setSelectedFinetunedStack, selectedFinetunedStack } =
    useContext(ProjectContext);
  const { togglePremiumModalVisibility, setPkgPlan, userPlan } =
    useContext(DataContext);
  const [selectedCard, setSelectedCard] = useState<SelectedCardProps>(
    {} as any
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleStackSelection = (name: FineTunedStacksName) => {
    const stack = FINE_TUNED_STACKS.find((d) => d.name === name);
    if (stack) {
      setSelectedCard({
        name: stack?.name as FineTunedStacksName,
        pricing_plan: stack?.plan as TechStackPricingPlan,
        description: stack?.description,
      });
      setModalVisible(true);
    }
  };

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

  return (
    <>
      <FlexColStart className="w-full">
        <p className="text-gray-100 font-jbR font-bold text-[13px] ">
          Get started quickly with preconfigured tech stacks designed for
          specific use cases.
        </p>
        <br />
        <FlexRowStartBtw className="gap-2 flex-wrap">
          {FINE_TUNED_STACKS.map((d) => (
            <FineTunedCard
              handleStackSelection={() => handleStackSelection(d.name as any)}
              name={d.name as FineTunedStacksName}
              pricing_plan={d.plan}
              stacks={extractFineTunedStack(d.tech_stacks)}
              isSelected={selectedFinetunedStack === d.name}
              available={d.available}
            />
          ))}
        </FlexRowStartBtw>
      </FlexColStart>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        showCloseIcon
      >
        <FlexColCenter className="w-full h-full">
          <FlexRowCenterBtw className="w-full h-auto pt-9 pb-9 max-w-[700px] max-h-[450px] bg-dark-200 rounded-md px-2">
            <FlexColStart className="w-full h-full px-5">
              <FlexRowStartBtw>
                <h1 className="text-white-100 text-2xl font-jbSB font-extrabold">
                  {selectedCard.name}
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
              <FlexColStart className="w-full mb-7">
                <p className="text-white-300 text-[13px] font-jbR">
                  {selectedCard.description}
                </p>
              </FlexColStart>
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
                className="font-jbSB font-extrabold text-[12px] mt-2 disabled:cursor-not-allowed "
                onClick={() => {
                  if (userPlan !== selectedCard.pricing_plan) {
                    togglePremiumModalVisibility();
                    setPkgPlan(selectedCard.pricing_plan);
                    return;
                  }
                  setSelectedFinetunedStack(
                    selectedCard?.name === selectedFinetunedStack
                      ? ""
                      : (selectedCard?.name as any)
                  );
                }}
                disabled={
                  !returnFineTunedStackDetails(selectedCard?.name)?.available
                }
              >
                {selectedFinetunedStack === selectedCard?.name
                  ? "Unselect"
                  : "Select"}
              </Button>
            </FlexColStart>
            <FlexColStart className="w-full h-full">
              <FlexColStart className="w-full">
                <p className="text-white-200 font-ppB">Technologies</p>
              </FlexColStart>
              <br />
              <FlexColStart className="w-full h-full gap-5 flex-wrap overflow-y-scroll hideScrollBar2 py-2">
                <RenderFineTunedStacks
                  tech_stacks={returnFineTunedStacks(selectedCard.name)}
                />
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
  available: boolean;
}

function FineTunedCard({
  name,
  pricing_plan,
  isSelected,
  handleStackSelection,
  stacks,
  available,
}: FineTunedCardProps) {
  const {} = useContext(DataContext);

  const max_stack = 5;
  const stack_count = stacks.length;
  const rest = stack_count - max_stack;
  // show only stack whoose length is less than 6 to prevent overflow on the card
  const extractStack = stacks.filter((s) => s.length <= 6).slice(0, max_stack);

  return (
    <button
      className={cn(
        "w-auto rounded-md border-solid border-[1px] border-transparent",
        isSelected ? " border-orange-100" : ""
      )}
      onClick={() => handleStackSelection(name)}
    >
      <FlexColStart className="w-fit max-w-[350px] min-w-[300px] bg-dark-300 rounded-md overflow-hidden ">
        <FlexColCenter className="w-full h-full relative">
          <Image
            src={getStackImg(name)}
            width={0}
            height={50}
            alt="img"
            className="w-full h-auto max-h-[200px] bg-cover rounded-md"
            objectFit="cover"
          />
          {available === false && (
            <FlexColCenter className="w-full h-full absolute bg-[rgba(0,0,0,.7)]">
              <span className="px-3 py-1 rounded-2xl bg-orange-200 text-orange-100 font-ppSB font-extrabold text-[10px] ">
                coming soon
              </span>
            </FlexColCenter>
          )}
        </FlexColCenter>

        <FlexRowStartBtw className="w-full px-4 pt-0 pb-4">
          <FlexColStart>
            <p className="text-white-100 leading-none text-[14px] font-ppSB">
              {name}
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
