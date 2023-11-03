import { FlexColStart, FlexRowStartCenter } from "@/components/Flex";
import { cn } from "@/lib/utils";
import { Button } from "@radix-ui/themes";
import { Crosshair, Gem } from "lucide-react";
import React from "react";
import { Tabs } from ".";
import { FineTunedStacksName } from "../../../../types";
import Image from "next/image";

interface FineTunedProps {}

function FineTuned({}: FineTunedProps) {
  return (
    <FlexColStart className="w-full">
      <p className="text-gray-100 font-jbR font-bold text-[13px] ">
        Get started quickly with preconfigured tech stacks designed for specific
        use cases.
      </p>
      <br />
      <FineTunedCard name="Zeus" />
    </FlexColStart>
  );
}

export default FineTuned;

interface FineTunedCardProps {
  name: FineTunedStacksName;
}

function FineTunedCard({ name }: FineTunedCardProps) {
  return (
    <FlexColStart className="w-fit max-w-[350px] min-w-[320px] bg-dark-300 rounded-md ">
      <div
        className={cn(
          `w-full h-auto min-h-[120px] bg-cover`,
          `bg-[url(/images/finetuned/zeus.jpeg)]`
        )}
      ></div>
    </FlexColStart>
  );
}
