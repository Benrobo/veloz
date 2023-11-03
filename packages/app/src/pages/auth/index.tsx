import { FlexColCenter } from "@/components/Flex";
import React from "react";
import { SignIn } from "@clerk/nextjs";

function Auth() {
  return (
    <div className="w-full h-screen">
      <FlexColCenter className="w-full h-full">
        <SignIn />
      </FlexColCenter>
    </div>
  );
}

export default Auth;