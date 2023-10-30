import React from "react";
import Modal from "../Modal";
import { FlexColStart, FlexRowCenterBtw, FlexRowStartBtw } from "../Flex";

function Slidebar() {
  return (
    <Modal isOpen isBlurBg>
      <div className="w-fit min-w-[400px] md:min-w-[500px] h-screen overflow-y-scroll bg-dark-100 absolute top-[-1em] right-[-2em] border-l-solid border-l-[.5px] border-l-white-600 ">
        <FlexRowStartBtw>
          <FlexColStart className="w-full px-3 py-2">
            <p className="text-white-100 font-ppSB text-[20px] ">
              Project Name
            </p>
            <p className="text-white-300 font-ppR text-[12px] ">
              created project description.
            </p>
          </FlexColStart>
          <FlexColStart className="w-full px-3 py-2"></FlexColStart>
        </FlexRowStartBtw>
        <FlexColStart className="w-full px-3 py-2"></FlexColStart>
      </div>
    </Modal>
  );
}

export default Slidebar;
