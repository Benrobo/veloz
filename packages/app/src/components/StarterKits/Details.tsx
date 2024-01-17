import React from "react";
import { FlexColCenter, FlexColStart } from "../Flex";
import { PARENT_KITS } from "@/data/stack";

type Props = {
  name: string;
};

function TemplateDetails({ name }: Props) {
  let component = null;
  const templateInfo = PARENT_KITS.find(
    (t) => t.name.toLowerCase() === name?.toLowerCase()
  );
  const videoUrl = templateInfo?.demo.video_url;
  const videoId = videoUrl?.split("v=")[1];

  if (name?.toLowerCase() === "zeus") {
    component = <ZeusDetails video={videoUrl} videoId={videoId} />;
  }
  if (name?.toLowerCase() === "athena") {
    component = <AthenaDetails video={videoUrl} videoId={videoId} />;
  }

  return component;
}

export default TemplateDetails;

type TemplateDetailsProps = {
  video?: string;
  videoId?: string;
};

function ZeusDetails({ video, videoId }: TemplateDetailsProps) {
  return (
    <FlexColStart className="w-full">
      <FlexColCenter className="w-full">
        {video && video?.length > 1 && (
          <iframe
            className="w-full"
            width="560"
            height="415"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        )}
      </FlexColCenter>
      <br />
      <p className="text-white-300 font-jbSB text-[13px]">
        Zeus streamlines development, enabling faster high-quality app delivery.
        With a robust tech stack, seamless integrations, and a focus on
        efficiency, Zeus is your ticket to swift SaaS development.
      </p>
    </FlexColStart>
  );
}

function AthenaDetails({ video }: TemplateDetailsProps) {
  return (
    <FlexColStart className="w-full">
      <p className="text-white-300 font-jbSB text-[13px]">
        If empowering indies is your game, then <Kbd>Athena</Kbd> is your go-to
        kit. Fuel your projects with the dynamic duo of{" "}
        <Kbd>Node.js + Express.js</Kbd> and <Kbd>React</Kbd>, and let Athena be
        your guide to indie development success – one kit at a time.
      </p>
    </FlexColStart>
  );
}

type KbdProps = {
  children: React.ReactNode;
};

const Kbd: React.FC<KbdProps> = ({ children }) => (
  <kbd className="px-1 py-0.5 bg-dark-200 text-white-300 rounded font-jbEB text-[12px]">
    {children}
  </kbd>
);
