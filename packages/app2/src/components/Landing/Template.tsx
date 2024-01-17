import React from "react";
import { FlexColCenter, FlexColStartCenter } from "../Flex";

function TemplateSection() {
  return (
    <FlexColCenter className="w-full border-t-solid border-t-[.5px] border-t-gray-100/30 py-9 ">
      <FlexColStartCenter className="w-full h-full text-center">
        <h1 className="text-white-100 font-ppEB text-2xl md:text-4xl">
          Templates
        </h1>
        <p className="text-white-300 max-w-[90%] md:max-w-[70%] text-[13px] font-ppReg">
          Get access to prebuilt template for a specific use case and get
          started in minutes shiping your idea.
        </p>
        <br />
        <FlexColCenter className="w-full h-auto min-h-[50px] gap-5">
          <h1 className="text-white-400/30 font-jbEB text-1xl md:text-2xl">
            Coming Soon
          </h1>
        </FlexColCenter>
      </FlexColStartCenter>
    </FlexColCenter>
  );
}

export default TemplateSection;
