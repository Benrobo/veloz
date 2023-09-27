import LocalImages from "@/data/images";
import Image from "next/image";
import React from "react";

function SideBar() {
  return (
    <div className="w-full h-full max-w-[220px] border-r-solid border-r-[1px] border-r-dark-400 hideScrollBar py-1 ">
      <div className="w-full border-b-solid border-b-[.5px] border-b-dark-400 flex items-center justify-start gap-3 py-2 px-4">
        <Image
          src={"/images/logo/logo.png"}
          className=""
          alt="logo"
          width={45}
          height={0}
        />
        <span className="font-ppSB text-white-100 text-[1em]">Veloz</span>
      </div>
    </div>
  );
}

export default SideBar;
