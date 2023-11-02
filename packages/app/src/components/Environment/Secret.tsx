import React, { ReactElement, useEffect, useState } from "react";
import { FlexColCenter, FlexColStart, FlexRowStartCenter } from "../Flex";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { KeyRound, Server, Theater } from "lucide-react";
import { TechStackCategory } from "../../../types";
import { TestProjectEnv } from "@/data/project";
import ManageSecrets from "./ManageSecrets";
import CreateSecretModal from "./CreateSecretModal";

const Tabs = ["frontend", "backend"] satisfies TechStackCategory[];

type SelectedEnv = {
  name: string;
  id: number | string | any;
  secrets: {
    id: string | any;
    name: string;
    value: string;
  }[];
};

function ManageProjectSecret() {
  const [activeTab, setActiveTab] = useState<TechStackCategory>("frontend");
  const [selectedEnv, setSelectedEnv] = useState<SelectedEnv | null>(
    TestProjectEnv[0]
  );
  const [envName, setEnvName] = useState("");
  const [createSecret, setCreateSecret] = useState(false);

  useEffect(() => {
    if (TestProjectEnv.length > 0) {
      setSelectedEnv(TestProjectEnv[0]);
      setEnvName(TestProjectEnv[0].name);
    }
  }, []);

  const updateSelectedEnv = (id: any) => {
    const env = TestProjectEnv.find((d) => d.id === id);
    if (env) {
      setSelectedEnv(env);
      setEnvName(env.name);
    }
  };

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
              {t == "frontend" ? "Frontend Env" : "Backend Env"}
            </span>
          </Button>
        ))}
      </FlexRowStartCenter>

      {/* Tab Content */}
      <FlexColStart className="mt-5">
        <p className="text-gray-100 font-ppR mt-[-1em] text-[13px]">
          Select from list of created environment, or{" "}
          <span
            className="text-white-100 text-[13px] underline cursor-pointer"
            onClick={() => setCreateSecret(true)}
          >
            create one.
          </span>
        </p>
      </FlexColStart>
      <FlexRowStartCenter className="w-full h-full mt-9">
        <FlexColStart className="w-auto min-w-[200px] h-full px-3 hideScrollBar2 gap-3 overflow-y-scroll">
          {selectedEnv &&
            TestProjectEnv.map((d) => (
              <Button
                className={cn(
                  "w-full bg-transparent text-[13px] text-white-100 rounded-md group transition-all gap-2 border-solid border-[1px]",
                  selectedEnv.id === d.id
                    ? "bg-dark-200 border-white-600 hover:bg-dark-200 "
                    : "border-transparent text-gray-100 hover:bg-transparent"
                )}
                onClick={() =>
                  selectedEnv.id !== d.id && updateSelectedEnv(d.id)
                }
              >
                <FlexRowStartCenter className="w-full">
                  <KeyRound
                    size={15}
                    className={cn(
                      "group-hover:text-white-100 text-white-100",
                      selectedEnv.id === d.id
                        ? "text-white-100"
                        : "text-gray-100"
                    )}
                  />
                  <span
                    className={cn(
                      "font-ppR group-hover:text-white-100 transition-all",
                      selectedEnv.id === d.id
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
) {
  let icon = null;
  if (category === "frontend") {
    icon = (
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
    icon = (
      <Server
        size={15}
        className={cn(
          "group-hover:text-white-100 text-white-300",
          active === "backend" ? "text-white-100" : "text-gray-100"
        )}
      />
    );
  }

  return icon as ReactElement;
}
