import React, { useEffect, useState } from "react";
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
import { ProjectType, RenderProjectIcons } from "@/components/Projects/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ProjectSideBarConfigKeysType } from "../../../types";
import { ProjectSideBarConfig } from "@/data/project";

function CreateProject() {
  const [projType, setProjType] = useState<ProjectType>();
  const [activeSection, setActiveSection] =
    useState<ProjectSideBarConfigKeysType>("details");

  useEffect(() => {
    setProjType(randomProjectType() as ProjectType);
  }, []);

  return (
    <Layout activePage="projects">
      <div className="w-full h-[100vh] relative px-4">
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
        <FlexRowStart className="w-auto px-3 py-0 ">
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

        <FlexRowStart className="mt-9">
          <FlexColStart className="w-fit px-3 py-2">
            {ProjectSideBarConfig.map((cf) => (
              <Button
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
