import React, { ReactElement, useState } from "react";
import { FlexColStart, FlexRowStartCenter } from "../Flex";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Server, Theater } from "lucide-react";
import { TechStackCategory } from "../../../types";

const Tabs = ["frontend", "backend"] satisfies TechStackCategory[];

function ManageProjectSecret() {
  const [activeTab, setActiveTab] = useState<TechStackCategory>("frontend");

  return (
    <FlexColStart>
      <h1 className="text-white-100 text-[20px] font-ppB mt-2">
        Project Environment
      </h1>
      <p className="text-gray-100 font-ppR mt-[-1em] text-[15px]">
        Manage your project environmental variables.
      </p>
      <br />
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
