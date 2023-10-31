import React from "react";
import Modal from "../Modal";
import {
  FlexColEnd,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStartBtw,
  FlexRowEnd,
} from "../Flex";
import {
  Database,
  DownloadCloud,
  KeyRound,
  Mailbox,
  PiggyBank,
  Server,
  Theater,
  X,
} from "lucide-react";
import Link from "next/link";
import RenderStacks from "../Stacks/Render";
import Accordion from "../Accordion";
import { Wallet } from "iconsax-react";
import { ProjectType } from "./Card";
import { VelozProjectType } from "../../../types";
import ProjectStatus from "./Badge";
import Editor from "../Editor";

interface SidebarProps {
  onClose: () => void;
  projects: VelozProjectType[];
  proj_id: any;
  isOpen: boolean;
}

function Slidebar({ onClose, projects, isOpen, proj_id }: SidebarProps) {
  const selectedProj = projects.find(
    (p) => p.id === proj_id
  ) as VelozProjectType;

  return (
    <Modal isOpen={isOpen} isBlurBg>
      <div className="w-fit min-w-[400px] md:min-w-[450px] h-screen overflow-y-scroll bg-dark-100 absolute top-[-2em] right-[-1em] border-l-solid border-l-[.5px] border-l-white-600  pb-[4em]">
        <button
          className="w-[50px] h-[50px] outline-none fixed top-[-12px] right-[-25px]"
          onClick={onClose}
        >
          <X
            size={25}
            className="bg-red-600 p-[6px] transition-all text-red-305"
          />
        </button>
        <FlexRowStartBtw className="py-5 px-5">
          <FlexColStart className="w-full px-3 py-2">
            <ProjectStatus status={selectedProj?.status} />
            <p className="text-white-100 relative font-ppSB text-[20px] ">
              {selectedProj?.name ?? "Project Name"}
            </p>
            <p className="text-white-200 font-ppR text-[12px] ">
              {selectedProj?.description ?? "created project description."}
            </p>
          </FlexColStart>
          <FlexRowEnd className="w-fit mr-8 py-2 items-center">
            <Link href={selectedProj?.download_link ?? "#"}>
              <DownloadCloud
                size={35}
                className="text-orange-100 p-[6px] transition-all rounded-sm hover:bg-orange-200"
              />
            </Link>
          </FlexRowEnd>
        </FlexRowStartBtw>
        <br />
        <FlexColStart className="w-full px-5 py-2 pb-9 border-b-solid border-b-[.5px] border-b-white-600">
          {selectedProj?.stacks?.map((stack) =>
            stack.title === "frontend" ? (
              <Accordion
                title="Frontend"
                leftIcon={
                  <Theater className="text-white-300 group-hover:text-white-100" />
                }
                name={"frontend"}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks tech_stacks={stack.stacks} />
                </FlexColStart>
              </Accordion>
            ) : stack.title === "backend" ? (
              <Accordion
                title="Backend"
                leftIcon={
                  <Server className="text-white-300 group-hover:text-white-100" />
                }
                name={"backend"}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks tech_stacks={stack.stacks} />
                </FlexColStart>
              </Accordion>
            ) : stack.title === "database" ? (
              <Accordion
                title="Database"
                leftIcon={
                  <Database className="text-white-300 group-hover:text-white-100" />
                }
                name={"database"}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks tech_stacks={stack.stacks} />
                </FlexColStart>
              </Accordion>
            ) : stack.title === "payment" ? (
              <Accordion
                title="Payment"
                leftIcon={
                  <PiggyBank className="text-white-300 group-hover:text-white-100" />
                }
                name={"payment"}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks tech_stacks={stack.stacks} />
                </FlexColStart>
              </Accordion>
            ) : stack.title === "mailing" ? (
              <Accordion
                title="Mailing"
                leftIcon={
                  <Mailbox className="text-white-300 group-hover:text-white-100" />
                }
                name={"mailing"}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks tech_stacks={stack.stacks} />
                </FlexColStart>
              </Accordion>
            ) : null
          )}
        </FlexColStart>
        <br />
        <FlexColStart className="w-full px-5 py-2 pb-9 border-b-solid border-b-[.5px] border-b-white-600">
          <p className="text-white-100 relative font-ppSB text-[15px] ">
            Environmental Variables
          </p>
          <p className="text-white-300 font-ppR text-[12px] ">
            Project managed environmental variable
          </p>
          <br />
          <Accordion
            leftIcon={
              <KeyRound className="text-white-300 group-hover:text-white-100" />
            }
            title=".env"
            name="environmental-variable"
          >
            <Editor
              lineNumbers="off"
              readonly
              defaultValue={selectedProj?.env ?? `//Nothing here`}
              wordWrap="on"
            />
          </Accordion>
        </FlexColStart>
      </div>
    </Modal>
  );
}

export default Slidebar;
