import React, { ReactElement, useContext, useState } from "react";
import Accordion from "../../Accordion";
import { FlexColStart, FlexRowStart, FlexRowStartCenter } from "../../Flex";
import { RenderSelectableStacks } from "../../Stacks/Render";
import { Shield } from "iconsax-react";
import {
  LayoutDashboard,
  Theater,
  Paintbrush2,
  Server,
  DatabaseZap,
  WalletCards,
  Mails,
  Crosshair,
  Gem,
} from "lucide-react";
import { CodebaseArchitectureMap, TechStackCategory } from "../../../../types";
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

export const Tabs = ["Refined", "Fine-Tuned"] as const;

function AddTechStack({
  updateStacksState,
  selectedStacks,
}: AddTechStackProps) {
  const { setProjectOptions } = useContext(ProjectContext);
  const [activeTab, setActiveTab] = useState<(typeof Tabs)[number]>("Refined");

  return (
    <FlexColStart className="w-full">
      {/* Tab */}
      <FlexRowStartCenter className="w-fit border-b-solid border-b-[1px] border-b-white-600 gap-0 ">
        {Tabs.map((t) => (
          <Button
            key={t}
            className={cn(
              "bg-transparent text-[13px] text-white-100 rounded-t-md rounded-b-none rounded-l-none rounded-r-none group transition-all gap-2 border-solid border-[1px]",
              activeTab === t
                ? " border-b-transparent border-t-white-600 border-l-white-600 border-r-white-600 bg-dark-200 hover:bg-dark-200 "
                : "border-transparent text-gray-100 hover:bg-transparent"
            )}
            onClick={() => {
              setActiveTab(t);
              setProjectOptions(t === "Fine-Tuned" ? "FineTuned" : t);
            }}
          >
            {renderBaseTabIcon(t, activeTab)}
            <span
              className={cn(
                "font-ppR group-hover:text-white-100 transition-all",
                activeTab === t ? "text-white-100" : "text-gray-100"
              )}
            >
              {t}
            </span>
          </Button>
        ))}
      </FlexRowStartCenter>

      {/* Refined Section */}
      {activeTab === "Refined" && (
        <Refined
          selectedStacks={selectedStacks}
          updateStacksState={updateStacksState}
        />
      )}
      {/* Fine-Tuned section */}
      {activeTab === "Fine-Tuned" && <FineTuned />}
    </FlexColStart>
  );
}

export default AddTechStack;

function renderBaseTabIcon(
  tab: (typeof Tabs)[number],
  activeTab: (typeof Tabs)[number]
) {
  let icon = null;
  if (tab === "Fine-Tuned") {
    icon = (
      <Crosshair
        className={cn(
          "group-hover:text-white-100 text-white-300",
          tab === activeTab && "text-white-100"
        )}
      />
    );
  }
  if (tab === "Refined") {
    icon = (
      <Gem
        className={cn(
          "group-hover:text-white-100 text-white-300",
          tab === activeTab && "text-white-100"
        )}
      />
    );
  }
  return icon;
}
