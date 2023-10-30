import React from "react";
import Modal from "../Modal";

function Slidebar() {
  return (
    <Modal isOpen isBlurBg>
      <div className="w-fit min-w-[400px] md:min-w-[500px] h-screen overflow-y-scroll bg-dark-100 absolute top-[-1em] right-[-2em] border-l-solid border-l-[.5px] border-l-white-600 ">
        welcome
      </div>
    </Modal>
  );
}

export default Slidebar;
