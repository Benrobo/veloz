import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenter,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import {
  ArrowLeftToLine,
  DatabaseZap,
  KeyRound,
  Layers,
  LayoutDashboard,
  Mails,
  PackageCheck,
  Paintbrush2,
  Server,
  Shield,
  ShieldPlus,
  Theater,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { ProjectType, RenderProjectIcons } from "@/components/Projects/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CodebaseArchitecture,
  CodebaseArchitectureMap,
  ProjectSideBarConfigKeysType,
  TechStackCategory,
} from "../../../types";
import { ProjectSideBarConfig } from "@/data/project";
import Accordion from "@/components/Accordion";
import RenderStacks, {
  RenderSelectableStacks,
} from "@/components/Stacks/Render";
import FreemiumModal from "@/components/FreemiumModal";

function CreateProject() {
  const [projType, setProjType] = useState<ProjectType>();
  const [activeSection, setActiveSection] =
    useState<ProjectSideBarConfigKeysType>("details");
  const [selectedStacks, setSelectedStacks] = useState<CodebaseArchitectureMap>(
    {} as CodebaseArchitectureMap
  );

  function updateStacksState(
    key: string,
    name: string,
    category: TechStackCategory
  ) {
    const techCategory = category as TechStackCategory;
    const stackCategoryExists = selectedStacks && selectedStacks[techCategory];
    if (typeof stackCategoryExists !== "undefined") {
      const mapCat = stackCategoryExists as CodebaseArchitecture;
      if (mapCat !== null && (mapCat as CodebaseArchitecture)?.stack === key) {
        // delete selected stack
        const updatedStacks = { ...selectedStacks } as CodebaseArchitectureMap;
        delete updatedStacks[techCategory];
        setSelectedStacks(updatedStacks);
        console.log("DELETED");
      } else {
        // update selected stack
        mapCat.stack = key;
        mapCat.name = name;
        mapCat.category = techCategory;
        setSelectedStacks((prev: any) => ({ ...prev, [techCategory]: mapCat }));
        console.log("UPDATED");
      }
    } else {
      // add to selected Stacks
      setSelectedStacks(
        (prev: any) =>
          ({
            ...prev,
            [techCategory as TechStackCategory]: {
              stack: key,
              name,
              category: techCategory,
            },
          } as CodebaseArchitectureMap)
      );
      console.log("CREATED");
    }
  }

  useEffect(() => {
    setProjType(randomProjectType() as ProjectType);
  }, []);

  useEffect(() => {
    console.log(selectedStacks);
  }, [selectedStacks]);

  return (
    <Layout activePage="projects">
      <div className="w-full h-[100vh] overflow-y-hidden relative px-4">
        {/* back link */}
        <Link href="/projects" className="underline">
          <FlexRowStartCenter className="w-auto px-3 py-7 group ">
            <ArrowLeftToLine
              size={15}
              className="text-white-300 group-hover:text-white-100 transition-all"
            />
            <span className="text-white-300 group-hover:text-white-100 text-[12px] transition-all font-ppSB">
              Back
            </span>
          </FlexRowStartCenter>
        </Link>

        {/* project header */}
        <FlexRowStartBtw className="w-auto px-3 py-0 ">
          <FlexRowStart>
            <FlexColCenter>
              <RenderProjectIcons type={projType as ProjectType} />
            </FlexColCenter>
            <FlexColStart>
              <p className="text-white-100 font-ppSB text-[12px] leading-none m-0 p-0">
                Untitled
              </p>
              <p className="text-white-200 font-ppR text-[11px] leading-none m-0 p-0">
                description
              </p>
            </FlexColStart>
          </FlexRowStart>
          <Button variant={"primary"} className="font-ppR text-[12px]" disabled>
            Save Changes
          </Button>
        </FlexRowStartBtw>

        <FlexRowStart className="mt-9">
          {/* Sidebar */}
          <FlexColStart className="w-fit min-w-[11.9em] px-3 py-2">
            {ProjectSideBarConfig.map((cf) => (
              <Button
                key={cf.key}
                variant={"secondary"}
                className={cn(
                  "w-full bg-dark-100 font-ppR border-solid border-[1px] border-transparent group hover:text-white-100 hover:bg-dark-200 hover:border-white-600 transition-all ",
                  activeSection === cf.key
                    ? "bg-dark-200 text-white-100  border-white-600"
                    : "text-gray-100"
                )}
                onClick={() =>
                  setActiveSection(cf.key as ProjectSideBarConfigKeysType)
                }
              >
                <FlexRowStart className="w-full">
                  {renderSidebarConfigIcon(
                    cf.key as ProjectSideBarConfigKeysType
                  )}
                  {cf.title}
                </FlexRowStart>
              </Button>
            ))}
          </FlexColStart>
          <FlexColStart className="w-full h-screen overflow-scroll hideScrollBar2 pb-[20em] px-3">
            {/* Details section */}
            {activeSection === "details" && (
              <FlexColStart className="w-fit">
                <h1 className="text-white-100 font-ppB mt-2">Details</h1>
                <br />
                <label className="text-gray-100 font-ppR text-[12px] ">
                  Project Name
                </label>
                <Input
                  type="text"
                  className="bg-dark-200 placeholder:text-gray-100 font-ppR border-white-600 focus-visible:ring-2 text-white-100"
                  placeholder="Name"
                />
                <label className="text-gray-100 font-ppR text-[12px] mt-3">
                  Project Description
                </label>
                <Input
                  type="text"
                  className="bg-dark-200 min-w-[20em] placeholder:text-gray-100 font-ppR border-white-600 focus-visible:ring-2 text-white-100"
                  placeholder="Description"
                />
              </FlexColStart>
            )}

            {/* Tech Stack Section */}
            {activeSection === "tech_stacks" && (
              <FlexColStart className="w-full">
                <h1 className="text-white-100 text-[20px] font-ppB mt-2">
                  Preferred Technology
                </h1>
                <br />
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
            )}
          </FlexColStart>
        </FlexRowStart>
      </div>
    </Layout>
  );
}

export default CreateProject;

function randomProjectType() {
  const type: ProjectType[] = [
    "Vortex",
    "Apex",
    "Serenity",
    "Nebula",
    "Odyssey",
  ];
  const dup: ProjectType[] = [];

  let randType: ProjectType | undefined;

  while (dup.length < type.length) {
    const rand = Math.floor(Math.random() * type.length);
    randType = type[rand];

    if (!dup.includes(randType)) {
      dup.push(randType);
      break; // Exit the loop once a unique value is found
    }
  }

  return randType;
}

function renderSidebarConfigIcon(key: ProjectSideBarConfigKeysType) {
  let icon = null;
  if (key === "details") {
    icon = <PackageCheck className="group-hover:text-white-100" />;
  }
  if (key === "secrets") {
    icon = <KeyRound className="group-hover:text-white-100" />;
  }
  if (key === "tech_stacks") {
    icon = <Layers className="group-hover:text-white-100" />;
  }
  return icon;
}

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
