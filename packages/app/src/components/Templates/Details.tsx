import React from "react";
import { FlexColStart } from "../Flex";

type Props = {
  name: string;
};

function TemplateDetails({ name }: Props) {
  let component = null;
  if (name.toLowerCase() === "zeus") {
    component = <ZeusDetails />;
  }
  if (name.toLowerCase() === "athena") {
    component = <AthenaDetails />;
  }

  return component;
}

export default TemplateDetails;

function ZeusDetails() {
  return (
    <FlexColStart className="w-full">
      <p className="text-white-300 font-jbSB text-[13px]">
        You're passionate about <Kbd>Next.js</Kbd> (<Kbd>Typescript</Kbd>,{" "}
        <Kbd>Javascript</Kbd>), and your goal is to accelerate your project
        delivery. Look no further – meet <Kbd>Zeus</Kbd>. Designed to streamline
        your development process, Zeus empowers you to ship high-quality
        applications faster. With a robust tech stack, seamless integrations,
        and a focus on efficiency, Zeus is your ticket to swift and efficient
        SaaS development. Choose Zeus to elevate your coding experience and
        bring your innovative ideas to life with speed and precision.
      </p>
    </FlexColStart>
  );
}

function AthenaDetails() {
  return (
    <FlexColStart className="w-full">
      <p className="text-white-300 font-jbSB text-[13px]">
        You love indie development. You crave the power of <Kbd>Node.js</Kbd>{" "}
        and the versatility of <Kbd>React</Kbd> (both <Kbd>Typescript</Kbd> and{" "}
        <Kbd>Javascript</Kbd>). If empowering indies is your game, then{" "}
        <Kbd>Athena</Kbd> is your go-to kit. Fuel your projects with the dynamic
        duo of <Kbd>Node.js</Kbd> and <Kbd>React</Kbd>, and let Athena be your
        guide to indie development success – one kit at a time.
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
