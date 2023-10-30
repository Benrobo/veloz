import { Box, CloudFog, Convertshape, Crown, Nebulas } from "iconsax-react";
import React from "react";

export type ProjectType = "Vortex" | "Apex" | "Serenity" | "Nebula" | "Odyssey";

interface ProjectCardProps extends React.HTMLProps<HTMLButtonElement> {
  name: string;
  id: any;
  description?: string;
  label: ProjectType;
}

function ProjectCard({
  id,
  name,
  description,
  label,
  ...props
}: ProjectCardProps) {
  return (
    // @ts-expect-error
    <button
      id={id}
      key={id}
      className="w-auto min-w-[300px] h-auto rounded-lg bg-dark-200 flex flex-col items-start justify-start gap-2 py-5 px-5 border-solid border-[1px] border-white-600 transition-colors hover:bg-dark-300 "
      {...props}
    >
      {renderProjectIcons(label ?? "Odyssey")}
      <p className="text-white-100 font-ppSB">{name ?? "Project Name"}</p>
      <p className="text-white-300 font-ppR text-[12px] ">
        {description ?? "Project description"}
      </p>
    </button>
  );
}

export default ProjectCard;

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
