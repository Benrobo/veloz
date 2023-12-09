import React from "react";
import { FlexColCenter } from "./Flex";

function Features() {
  return (
    <FlexColCenter className="w-full h-full">
      <FlexColCenter className="text-center h-full max-w-[70%] min-h-[300px] ">
        <h1 className="text-white-100 text-[2em] font-ppEB">
          Your SaaS{" "}
          <span className=" relative left-5 whitespace-nowrap">
            <span className="absolute bg-red-305 -left-3 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
            <span className="relative text-white-100">Launchpad</span>
          </span>
        </h1>
        <p className="text-white-300 text-[14px] font-ppReg">
          Unlike any other SaaS boilerplate, we provide you with a complete
          solution to launch your SaaS business. Not all saas are built with{" "}
          <span className="text-white-200 font-ppSB">Next.js</span>! Veloz
          provides customers with much flexibility and customization so you dont
          have to worry about transitioning into a new framework / language.
        </p>
        <br />
      </FlexColCenter>
    </FlexColCenter>
  );
}

export default Features;
