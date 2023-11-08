import React from "react";
import Modal from "./Modal";
import { FlexColCenter, FlexColStart } from "./Flex";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { cn, planColor } from "@/lib/utils";
import { TechStackPricingPlan } from "@veloz/shared/types";

interface FreemiumModalProps {
  price_plan: TechStackPricingPlan;
  isOpen: boolean;
  onClose: () => void;
}

function FreemiumModal({ price_plan, isOpen, onClose }: FreemiumModalProps) {
  const planTitle = {
    BASIC_PKG: "Basic Package",
    STANDARD_PKG: "Standard Package",
    ENTERPRISE_PKG: "Enterprise Package",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseIcon>
      <FlexColCenter className="w-full h-full">
        <div className="w-fit max-w-[350px] min-w-[350px] py-3 rounded-lg bg-darkk-200 bg-dark-200">
          <FlexColStart className="px-6 py-3 border-b-solid border-b-[1px] border-b-white-600">
            <h1
              className={cn(
                "font-ppB text-[20px] leading-none",
                planColor(price_plan).txtColor
              )}
            >
              {planTitle[price_plan]}
            </h1>
            <p className="text-gray-100 font-ppR text-[14px] mt-[-.5em] leading-none">
              Upgrade your account to continue.
            </p>
          </FlexColStart>
          <br />
          <FlexColCenter className="w-full px-6 py-1">
            <p className="text-white-200 font-ppR text-[13px]">
              Upgrade your account to have access to this package for life time.
            </p>
          </FlexColCenter>
          <br />
          <FlexColCenter className="px-6 py-3">
            <Button
              variant={"primary"}
              className={cn(
                "w-full font-ppSB text-[15px] gap-2 transition-opacity",
                `${planColor(price_plan).bgColor} hover:${
                  planColor(price_plan).bgColor
                } hover:opacity-[.75]`
              )}
            >
              <Zap size={13} /> Life Time Access
            </Button>
          </FlexColCenter>
        </div>
      </FlexColCenter>
    </Modal>
  );
}

export default FreemiumModal;
