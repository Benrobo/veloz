import { Box, CloudFog, Convertshape, Crown, Nebulas } from "iconsax-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export type ProjectType = "Vortex" | "Apex" | "Serenity" | "Nebula" | "Odyssey";

interface ProjectCardProps extends React.HTMLProps<HTMLButtonElement> {
  name: string;
  id: any;
  description?: string;
  label: ProjectType;
  status: "pending" | "done" | "failed";
}

function ProjectCard({
  id,
  name,
  description,
  label,
  status,
  ...props
}: ProjectCardProps) {
  return (
    // @ts-expect-error
    <button
      id={id}
      key={id}
      className="w-auto min-w-[300px] h-auto relative rounded-lg bg-dark-200 flex flex-col items-start justify-start gap-2 py-5 px-5 border-solid border-[1px] border-white-600 transition-colors hover:bg-dark-300 "
      {...props}
    >
      {renderProjectIcons(label ?? "Odyssey")}
      <div className="absolute top-1 right-2">
        <ProjectStatus status={status} />
      </div>
      <p className="text-white-100 font-ppSB">{name ?? "Project Name"}</p>
      <p className="text-white-300 font-ppR text-[12px] ">
        {description ?? "Project description"}
      </p>
    </button>
  );
}

export default ProjectCard;

function ProjectStatus({ status }: { status: "done" | "failed" | "pending" }) {
  let badge = null;
  const baseClass = `w-auto px-3 py-1 rounded-[30px] text-[9px] font-ppSB border-solid border-[.5px] border-white-600`;
  if (status === "pending") {
    badge = (
      <span className={twMerge(baseClass, "bg-orange-301 text-orange-300")}>
        {status}
      </span>
    );
  }
  if (status === "done") {
    badge = (
      <span className={twMerge(baseClass, "bg-green-200 text-green-100")}>
        {status}
      </span>
    );
  }
  if (status === "failed") {
    badge = (
      <span className={twMerge(baseClass, "bg-red-100 text-red-305")}>
        {status}
      </span>
    );
  }
  return badge;
}

function renderProjectIcons(type: ProjectType) {
  let icon = null;
  if (type === "Vortex") {
    icon = (
      <Box
        size="40"
        className="text-orange-100 p-[8px] bg-orange-200 rounded-md "
        variant="Broken"
      />
    );
  }
  if (type === "Apex") {
    icon = (
      <Convertshape
        size="40"
        className="text-green-100 p-[8px] bg-green-200 rounded-md "
        variant="Broken"
      />
    );
  }
  if (type === "Nebula") {
    icon = (
      <Nebulas
        size="40"
        className="text-blue-100 p-[8px] bg-blue-200 rounded-md "
        variant="Broken"
      />
    );
  }
  if (type === "Serenity") {
    icon = (
      <CloudFog
        size="40"
        className="text-pink-100 p-[8px] bg-pink-200 rounded-md "
        variant="Broken"
      />
    );
  }
  if (type === "Odyssey") {
    icon = (
      <Crown
        size="40"
        className="text-teal-100 p-[8px] bg-teal-200 rounded-md "
        variant="Broken"
      />
    );
  }

  return icon;
}
