import React, { ReactElement, useContext, useState } from "react";
import { FlexColStart, FlexRowStart, FlexRowStartCenter } from "../../Flex";
import { Crosshair } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import FineTuned from "./FineTuned";
import { ProjectContext } from "@/context/ProjectContext";

export interface AddTechStackProps {}

export const Tabs = ["Fine-Tuned"] as const;

function AddTechStack({}: AddTechStackProps) {
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
