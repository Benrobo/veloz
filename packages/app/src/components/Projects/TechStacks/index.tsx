import React, { ReactElement, useContext, useState } from "react";
import Accordion from "../../Accordion";
import { FlexColStart, FlexRowStart, FlexRowStartCenter } from "../../Flex";
import { Shield } from "iconsax-react";
import { Crosshair, Gem } from "lucide-react";
import {
  CodebaseArchitectureMap,
  TechStackCategory,
} from "@veloz/shared/types";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import Refined from "./Refined";
import FineTuned from "./FineTuned";
import { ProjectContext } from "@/context/ProjectContext";

export interface AddTechStackProps {
  updateStacksState: (
    key: string,
    name: string,
    category: TechStackCategory
  ) => void;
  selectedStacks: CodebaseArchitectureMap;
}

export const Tabs = ["Fine-Tuned"] as const;

function AddTechStack({
  updateStacksState,
  selectedStacks,
}: AddTechStackProps) {
  const { setProjectOptions } = useContext(ProjectContext);
  const [activeTab, setActiveTab] =
    useState<(typeof Tabs)[number]>("Fine-Tuned");

  return (
    <FlexColStart className="w-full">
      {/* Fine-Tuned section */}
      <FlexRowStartCenter className="w-full">
        <Crosshair
          className={cn("group-hover:text-white-100 text-white-100")}
        />
        <p className="text-white-100 font-jbEB">Fine-Tuned</p>
      </FlexRowStartCenter>

      {activeTab === "Fine-Tuned" && <FineTuned />}
    </FlexColStart>
  );
}

export default AddTechStack;
