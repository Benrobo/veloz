import React from "react";
import { FlexColCenter, FlexColStartCenter, FlexRowCenter } from "../Flex";
import BlurBgRadial from "../BlurBgRadial";

function Header() {
  return (
    <FlexColStartCenter className="relative w-full h-full ">
      <BlurBgRadial className="absolute opacity-1 top-[-2em] " />
      <FlexColCenter className="relative w-full h-auto mt-[10em] text-center">
        <FlexRowCenter className="rainbowBorder mb-10 inline-flex items-center justify-center text-[14px] ">
          <span className="inline-flex items-center gap-1 whitespace-nowrap px-6 py-2 bg-dark-105 font-ppReg text-[12px] text-white-100">
            The last starter kit you'll ever need!.
          </span>
        </FlexRowCenter>
        <FlexColCenter className="w-auto max-w-[70%]">
          <h1 className="text-6xl text-white-100 mt-2 font-ppEB">
            Ship Your Product Faster.
          </h1>
          <p className="text-white-300 text-[14px] w-full max-w-[60%] font-ppReg">
            Accelerate your SaaS projects with Veloz. Effortlessly scaffold
            projects, choose your stack, and integrate services. Focus on
            <span className="font-ppEB ml-1">innovation</span>, not setup. Join
            Veloz for a swift SaaS evolution.
          </p>
        </FlexColCenter>
      </FlexColCenter>
    </FlexColStartCenter>
  );
}

export default Header;
