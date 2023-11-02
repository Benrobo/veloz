import React, { ReactElement, useContext, useEffect, useState } from "react";
import { FlexColCenter, FlexColStart, FlexRowStartCenter } from "../Flex";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { KeyRound, Server, Theater } from "lucide-react";
import { TechStackCategory } from "../../../types";
import { TestProjectEnv } from "@/data/project";
import ManageSecrets from "./ManageSecrets";
import CreateSecretModal from "./CreateSecretModal";
import { ProjectContext } from "@/context/ProjectContext";

const Tabs: TechStackCategory[] = ["frontend", "backend"];

type SelectedEnv = {
  name: string;
  id: string;
  secrets: {
    id: string;
    name: string;
    value: string;
  }[];
};

function ManageProjectSecret() {
  const { setSelectedSecretId } = useContext(ProjectContext);
  const [activeTab, setActiveTab] = useState<TechStackCategory>("frontend");
  const [selectedEnv, setSelectedEnv] = useState<SelectedEnv | null>(
    TestProjectEnv.find((d) => d.category === activeTab) ?? null
  );
  const [envName, setEnvName] = useState("");
  const [createSecret, setCreateSecret] = useState(false);

  useEffect(() => {
    const env = TestProjectEnv.find((d) => d.category === activeTab);
    setSelectedEnv(env ?? null);
    setEnvName(env?.name ?? "");
    setSelectedSecretId(env?.secrets[0]?.id);
  }, [activeTab]);

  const updateSelectedEnv = (id: string) => {
    const env = TestProjectEnv.find((d) => d.id === id);
    if (env) {
      setSelectedEnv(env);
      setEnvName(env.name);
    }
  };

  const secrets = TestProjectEnv.filter((d) => d.category === activeTab);

  return (
    <FlexColStart className="w-full h-full">
      <h1 className="text-white-100 text-[20px] font-ppB mt-2">
        Project Environment
      </h1>
      <p className="text-gray-100 font-ppR mt-[-1em] text-[15px]">
        Manage your project environmental variables.
      </p>
      <br />

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
            onClick={() => setActiveTab(t)}
          >
            {renderAccdIcon(t, activeTab)}
            <span
              className={cn(
                "font-ppR group-hover:text-white-100 transition-all",
                activeTab === t ? "text-white-100" : "text-gray-100"
              )}
            >
              {t === "frontend" ? "Frontend Env" : "Backend Env"}
            </span>
          </Button>
        ))}
      </FlexRowStartCenter>

      {/* Tab Content */}
      <FlexColStart className="mt-5">
        <p className="text-gray-100 font-ppR mt-[-1em] text-[13px]">
          {secrets.length === 0
            ? `No ${activeTab} environment variable found.`
            : `Select from list of created environment, or`}{" "}
          <span
            className="text-white-100 text-[13px] underline cursor-pointer"
            onClick={() => setCreateSecret(true)}
          >
            create one.
          </span>
        </p>
      </FlexColStart>

      {/* Secret Tabs */}
      <FlexRowStartCenter className="w-full h-full mt-9">
        <FlexColStart className="w-auto min-w-[200px] h-full px-3 hideScrollBar2 gap-3 overflow-y-scroll">
          {secrets.map((d) => (
            <Button
              key={d.id}
              className={cn(
                "w-full bg-transparent text-[13px] text-white-100 rounded-md group transition-all gap-2 border-solid border-[1px]",
                selectedEnv?.id === d.id
                  ? "bg-dark-200 border-white-600 hover:bg-dark-200 "
                  : "border-transparent text-gray-100 hover:bg-transparent"
              )}
              onClick={() => {
                if (selectedEnv?.id !== d.id) {
                  updateSelectedEnv(d.id);
                  setSelectedSecretId(d.id);
                }
              }}
            >
              <FlexRowStartCenter className="w-full">
                <KeyRound
                  size={15}
                  className={cn(
                    "group-hover:text-white-100 text-white-100",
                    selectedEnv?.id === d.id
                      ? "text-white-100"
                      : "text-gray-100"
                  )}
                />
                <span
                  className={cn(
                    "font-ppR group-hover:text-white-100 transition-all",
                    selectedEnv?.id === d.id
                      ? "text-white-100"
                      : "text-gray-100"
                  )}
                >
                  {d.name}
                </span>
              </FlexRowStartCenter>
            </Button>
          ))}
        </FlexColStart>
        <FlexColStart
          className={cn(
            "w-full h-full overflow-y-auto px-2 py-2 pb-[8em] hideScrollBar2"
          )}
        >
          {selectedEnv?.name === envName && (
            <ManageSecrets
              selectedEnv={selectedEnv}
              hideSaveBtn={false}
              btmSpace={true}
            />
          )}
        </FlexColStart>
      </FlexRowStartCenter>

      {/* Create Secret Modal */}
      <CreateSecretModal
        isOpen={createSecret}
        onClose={() => setCreateSecret(false)}
      />
    </FlexColStart>
  );
}

export default ManageProjectSecret;

function renderAccdIcon(
  category: TechStackCategory,
  active: TechStackCategory
): ReactElement | null {
  if (category === "frontend") {
    return (
      <Theater
        size={15}
        className={cn(
          "group-hover:text-white-100 text-white-100",
          active === "frontend" ? "text-white-100" : "text-gray-100"
        )}
      />
    );
  }
  if (category === "backend") {
    return (
      <Server
        size={15}
        className={cn(
          "group-hover:text-white-100 text-white-300",
          active === "backend" ? "text-white-100" : "text-gray-100"
        )}
      />
    );
  }
  return null;
}
