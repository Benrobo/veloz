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
import ProjectStatus from "./Badge";
import Editor from "../Editor";
import { Button } from "../ui/button";
import { ProjectListType } from "@/types";
import { FINE_TUNED_STACKS } from "@/data/stack";
import { renderAccdIcon } from "@/lib/comp_utils";

interface SidebarProps {
  onClose: () => void;
  selectedProject: ProjectListType;
  proj_id: any;
  isOpen: boolean;
}

function Slidebar({ onClose, selectedProject, isOpen, proj_id }: SidebarProps) {
  const projStacks =
    FINE_TUNED_STACKS.find((s) => s.name === selectedProject?.name)
      ?.tech_stacks ?? [];

  const _frontend = projStacks.find((s) => s.title === "frontend");
  const _backend = projStacks.find((s) => s.title === "backend");
  const _database = projStacks.find((s) => s.title === "database");
  const _auth = projStacks.find((s) => s.title === "authentication");
  const _mailing = projStacks.find((s) => s.title === "mailing");
  const _payment = projStacks.find((s) => s.title === "payment");

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
            <ProjectStatus status={selectedProject?.status} />
            <p className="text-white-100 relative font-ppSB text-[20px] ">
              {selectedProject?.name ?? "Project Name"}
            </p>
            <p className="text-white-200 font-ppR text-[12px] ">
              {selectedProject?.description ?? "created project description."}
            </p>
          </FlexColStart>
          <FlexRowEnd className="w-fit mr-8 py-2 items-center">
            <Link href={selectedProject?.download_link ?? "#"}>
              <DownloadCloud
                size={35}
                className="text-orange-100 p-[6px] transition-all rounded-sm hover:bg-orange-200"
              />
            </Link>
          </FlexRowEnd>
        </FlexRowStartBtw>
        <br />
        <FlexColStart className="w-full px-5 py-2 pb-9 border-b-solid border-b-[.5px] border-b-white-600">
          <FlexColStart className="w-full min-w-[400px] h-full">
            {_frontend && (
              <Accordion
                title={_frontend.title}
                name="frontend"
                className="w-full"
                leftIcon={renderAccdIcon("frontend")}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks
                    tech_stacks={_frontend.stacks as string[]}
                    category="frontend"
                  />
                </FlexColStart>
              </Accordion>
            )}
            {_backend && (
              <Accordion
                title={_backend.title}
                name="backend"
                className="w-full"
                leftIcon={renderAccdIcon("backend")}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks
                    tech_stacks={_backend.stacks as string[]}
                    category="backend"
                  />
                </FlexColStart>
              </Accordion>
            )}
            {_database && (
              <Accordion
                title={_database.title}
                name="database"
                className="w-full"
                leftIcon={renderAccdIcon("database")}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks
                    tech_stacks={_database.stacks as string[]}
                    category="database"
                  />
                </FlexColStart>
              </Accordion>
            )}
            {_auth && (
              <Accordion
                title={_auth.title}
                name="auth"
                className="w-full"
                leftIcon={renderAccdIcon("authentication")}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks
                    tech_stacks={_auth.stacks as string[]}
                    category="authentication"
                  />
                </FlexColStart>
              </Accordion>
            )}
            {_mailing && (
              <Accordion
                title={_mailing.title}
                name="mailing"
                className="w-full"
                leftIcon={renderAccdIcon("mailing")}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks
                    tech_stacks={_mailing.stacks as string[]}
                    category="mailing"
                  />
                </FlexColStart>
              </Accordion>
            )}

            {_payment && (
              <Accordion
                title={_payment.title}
                name="payment"
                className="w-full"
                leftIcon={renderAccdIcon("payment")}
              >
                <FlexColStart className="w-full px-3 py-2">
                  <RenderStacks
                    tech_stacks={_payment.stacks as string[]}
                    category="payment"
                  />
                </FlexColStart>
              </Accordion>
            )}
          </FlexColStart>
        </FlexColStart>
        <br />

        <br />
        <FlexColStart className="w-full px-5 py-2 pb-9 ">
          <p className="text-white-105 relative font-ppSB text-[15px] ">
            Danger Zone
          </p>
          <p className="text-white-200 font-ppSB text-[12px] flex flex-col ">
            Once you delete a project, there is no going back. Please be
            certain.
          </p>
          <Button variant={"destructive"} className="font-ppSB mt-3">
            Delete project
          </Button>
        </FlexColStart>
      </div>
    </Modal>
  );
}

export default Slidebar;
