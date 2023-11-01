import React from "react";
import { FlexColStart } from "../Flex";

function ManageProjectSecret() {
  return (
    <FlexColStart>
      <h1 className="text-white-100 text-[20px] font-ppB mt-2">
        Project Environment
      </h1>
      <p className="text-gray-100 font-ppR mt-[-1em] text-[15px]">
        Manage your project environmental variables.
      </p>
      <br />
    </FlexColStart>
  );
}

export default ManageProjectSecret;
