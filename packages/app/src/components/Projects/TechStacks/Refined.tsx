import Accordion from "@/components/Accordion";
import {
  FlexColStart,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import { RenderSelectableStacks } from "@/components/Stacks/Render";
import {
  DatabaseZap,
  LayoutDashboard,
  Mails,
  Paintbrush2,
  Server,
  Shield,
  Theater,
  WalletCards,
} from "lucide-react";
import React, { ReactElement } from "react";
import { TechStackCategory } from "../../../../types";
import { AddTechStackProps } from ".";

interface RefinedProps extends AddTechStackProps {}

function Refined({ updateStacksState, selectedStacks }: RefinedProps) {
  return (
    <FlexColStart className="w-full h-screen pb-[25em] overflow-scroll hideScrollBar2 px-3">
      <p className="text-gray-100 font-jbR font-bold text-[13px] ">
        Tailor your codebase to match your preferences and requirements.
      </p>
      <br />
      {/* Architecture Section */}
      <Accordion
        name="codebase_architecture"
        title="Codebase architecture"
        className="w-full"
        leftIcon={renderAccdIcon("codebase_acrhitecture")}
      >
        <FlexRowStart className="mb-3">
          <p className="text-gray-100 font-ppR text-[12px]">
            Monorepo architecture is defaulted to{" "}
            <kbd className="px-1 py-1 rounded-sm bg-dark-300 text-[10px]">
              yarn-workspaces
            </kbd>
          </p>
        </FlexRowStart>
        <FlexRowStartCenter>
          <RenderSelectableStacks
            category={"codebase_acrhitecture"}
            updateStacksState={updateStacksState}
            selecedStacks={selectedStacks}
          />
        </FlexRowStartCenter>
      </Accordion>
      {/* Frontend Section */}
      <Accordion
        name="frontend"
        title="Frontend"
        className="w-full"
        leftIcon={renderAccdIcon("frontend")}
      >
        <FlexRowStartCenter>
          <RenderSelectableStacks
            category={"frontend"}
            updateStacksState={updateStacksState}
            selecedStacks={selectedStacks}
          />
        </FlexRowStartCenter>
      </Accordion>

      {/* Design System */}
      <Accordion
        name="design_system"
        title="Design System"
        className="w-full"
        leftIcon={renderAccdIcon("design_system")}
      >
        <FlexRowStartCenter>
          <RenderSelectableStacks
            category={"design_system"}
            updateStacksState={updateStacksState}
            selecedStacks={selectedStacks}
          />
        </FlexRowStartCenter>
      </Accordion>

      {/* Backend Section */}
      <Accordion
        name="backend"
        title="Backend"
        className="w-full"
        leftIcon={renderAccdIcon("backend")}
      >
        <FlexRowStartCenter>
          <RenderSelectableStacks
            category={"backend"}
            updateStacksState={updateStacksState}
            selecedStacks={selectedStacks}
          />
        </FlexRowStartCenter>
      </Accordion>

      {/* Database section */}
      <Accordion
        name="database"
        title="Database"
        className="w-full"
        leftIcon={renderAccdIcon("database")}
      >
        <FlexRowStartCenter>
          <RenderSelectableStacks
            category={"database"}
            updateStacksState={updateStacksState}
            selecedStacks={selectedStacks}
          />
        </FlexRowStartCenter>
      </Accordion>

      {/* Payment Section */}
      <Accordion
        name="payment"
        title="Payment"
        className="w-full"
        leftIcon={renderAccdIcon("payment")}
      >
        <FlexRowStartCenter>
          <RenderSelectableStacks
            category={"payment"}
            updateStacksState={updateStacksState}
            selecedStacks={selectedStacks}
          />
        </FlexRowStartCenter>
      </Accordion>

      {/* Mailing */}
      <Accordion
        name="mailing"
        title="Mailing"
        className="w-full"
        leftIcon={renderAccdIcon("mailing")}
      >
        <FlexRowStartCenter>
          <RenderSelectableStacks
            category={"mailing"}
            updateStacksState={updateStacksState}
            selecedStacks={selectedStacks}
          />
        </FlexRowStartCenter>
      </Accordion>

      {/* Authentication */}
      <Accordion
        name="authentication"
        title="Authentication"
        className="w-full"
        leftIcon={renderAccdIcon("authentication")}
      >
        <FlexRowStartCenter>
          <RenderSelectableStacks
            category={"authentication"}
            updateStacksState={updateStacksState}
            selecedStacks={selectedStacks}
          />
        </FlexRowStartCenter>
      </Accordion>
    </FlexColStart>
  );
}

export default Refined;

function renderAccdIcon(category: TechStackCategory) {
  let icon = null;
  if (category === "codebase_acrhitecture") {
    icon = (
      <LayoutDashboard className="group-hover:text-white-100 text-white-300" />
    );
  }
  if (category === "frontend") {
    icon = <Theater className="group-hover:text-white-100 text-white-300" />;
  }
  if (category === "design_system") {
    icon = (
      <Paintbrush2 className="group-hover:text-white-100 text-white-300" />
    );
  }
  if (category === "backend") {
    icon = <Server className="group-hover:text-white-100 text-white-300" />;
  }
  if (category === "database") {
    icon = (
      <DatabaseZap className="group-hover:text-white-100 text-white-300" />
    );
  }
  if (category === "payment") {
    icon = (
      <WalletCards className="group-hover:text-white-100 text-white-300" />
    );
  }
  if (category === "mailing") {
    icon = <Mails className="group-hover:text-white-100 text-white-300" />;
  }
  if (category === "authentication") {
    icon = <Shield className="group-hover:text-white-100 text-white-300" />;
  }

  return icon as ReactElement;
}
