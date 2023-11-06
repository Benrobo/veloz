import React, {
  ChangeEventHandler,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import Layout from "@/components/Layout";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenter,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import { ArrowLeftToLine, KeyRound, Layers, PackageCheck } from "lucide-react";
import Link from "next/link";
import { RenderProjectIcons } from "@/components/Projects/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CodebaseArchitecture,
  CodebaseArchitectureMap,
  ProjectSideBarConfigKeysType,
  ProjectType,
  TechStackCategory,
} from "../../../types";
import { ProjectSideBarConfig, projectTempData } from "@/data/project";
import AddTechStack from "@/components/Projects/TechStacks";
import ManageProjectSecret from "@/components/Environment/Secret";
import { ProjectContext } from "@/context/ProjectContext";
import toast from "react-hot-toast";

function CreateProject() {
  const {
    projDetails,
    projType,
    selectedSecretId,
    selectedStacks,
    setProjDetails,
    setProjType,
    setSelectedSecretId,
    setSelectedStacks,
    activeSection,
    setActiveSection,
    projectOptions,
    selectedFinetunedStack,
  } = useContext(ProjectContext);

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
        const _prev = selectedStacks;
        const stackCombo = {
          ..._prev,
          [techCategory]: mapCat,
        };
        setSelectedStacks(stackCombo);
        console.log("UPDATED");
      }
    } else {
      // add to selected Stacks
      const _prev = selectedStacks;
      const stackCombo = {
        ..._prev,
        [techCategory]: {
          stack: key,
          name,
          category: techCategory,
        },
      };
      setSelectedStacks(stackCombo);
      console.log("CREATED");
    }
  }

  function handleProjDetailsChange(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "name" | "description"
  ) {
    const inpValue = e.target.value;
    setProjDetails((prev) => ({
      ...prev,
      [type]: inpValue,
    }));
  }

  // This function checks whether the save button should be disabled or not
  function _shouldEnableSaveButton() {
    const { name } = projDetails;
    if (projectOptions === "Refined") {
      const stacks = selectedStacks;
      const frontend = "frontend" in stacks;
      const backend = "backend" in stacks;
      // Check if the name is not empty
      if (name.length === 0) return false;

      // Check if the "frontend" stack exists and the "backend" stack doesn't
      if (frontend && !backend) return true;

      // Check if the "backend" stack exists and the "frontend" stack doesn't
      if (backend && !frontend) return true;

      // Check if both the stacks exist
      if (frontend && backend) return true;

      // if none of the stacks exist, disable the save button
      if (!frontend && !backend) return false;
    } else {
      // Check if the name is not empty
      if (name.length === 0) return false;
      if (selectedFinetunedStack.length === 0) return false;
      return true;
    }
  }

  function saveProjectChanges() {
    const { name, description } = projDetails;
    const defaultCodebaseArch = {
      stack: "monolith",
      name: "Monolith",
      category: "codebase_acrhitecture",
    };

    // Provide a type for selectedStacks object
    const _selectedStacks: Record<
      string,
      { stack: string; name: string; category: string }
    > = selectedStacks;

    if (!("codebase_acrhitecture" in _selectedStacks)) {
      _selectedStacks["codebase_acrhitecture"] = defaultCodebaseArch;
    }

    const payload = {
      name,
      description,
      stacks: _selectedStacks,
      env_id: selectedSecretId,
      projectOption: projectOptions,
      fineTunedStackName: selectedFinetunedStack,
    };
    console.log(payload);
  }

  useEffect(() => {
    setProjType(randomProjectType() as ProjectType);
  }, []);

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
                {projDetails.name.length > 0 ? projDetails.name : "Untitled"}
              </p>
              <p className="text-white-200 font-ppR text-[11px] leading-none m-0 p-0">
                {projDetails.description.length > 0
                  ? projDetails.description
                  : "description"}
              </p>
            </FlexColStart>
          </FlexRowStart>

          {/* Create Project */}
          <Button
            variant={"primary"}
            className="font-ppR text-[12px]"
            disabled={!_shouldEnableSaveButton()}
            onClick={saveProjectChanges}
          >
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

          <FlexColStart className="w-full h-screen px-3">
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
                  defaultValue={projDetails.name}
                  onChange={(e) => handleProjDetailsChange(e, "name")}
                />
                <label className="text-gray-100 font-ppR text-[12px] mt-3">
                  Project Description
                </label>
                <Input
                  type="text"
                  className="bg-dark-200 min-w-[20em] placeholder:text-gray-100 font-ppR border-white-600 focus-visible:ring-2 text-white-100"
                  placeholder="Description"
                  defaultValue={projDetails.description}
                  onChange={(e) => handleProjDetailsChange(e, "description")}
                />
              </FlexColStart>
            )}

            {/* Tech Stack Section */}
            {activeSection === "tech_stacks" && (
              <AddTechStack
                updateStacksState={updateStacksState}
                selectedStacks={selectedStacks}
              />
            )}

            {/* Secrets Section */}
            {activeSection === "secrets" && <ManageProjectSecret />}
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
    icon = <PackageCheck size={20} className="group-hover:text-white-100" />;
  }
  if (key === "secrets") {
    icon = <KeyRound size={20} className="group-hover:text-white-100" />;
  }
  if (key === "tech_stacks") {
    icon = <Layers size={20} className="group-hover:text-white-100" />;
  }
  return icon;
}
