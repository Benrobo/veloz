import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function TopBar() {
  return (
    <div className="w-full flex items-center justify-end border-b-solid border-b-[1px] border-b-dark-400 py-2 px-4">
      <div className="w-auto flex">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-[40px] h-[40px] bg-dark-200 p-2 font-ppReg text-white-100 border-solid border-[1px] border-dark-300 rounded-[50%] text-[13px] outline-none ">
            B
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dark-100 border-solid border-[1px] border-dark-300 outline-none mr-9 mt-1 text-gray-100 gap-3">
            <DropdownMenuLabel className="flex flex-col items-start justify-start leading-6">
              <span className="text-white-300 font-ppL text-[12px]">
                Signed in as
              </span>
              <p className="text-white-100 font-ppReg text-[13px]">
                alumonabenaiah71@gmail.com
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-dark-300 h-[1px]" />
            <DropdownMenuItem className="hover:!bg-dark-200 hover:!text-white-300 cursor-pointer">
              User settings
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:!bg-dark-200 hover:!text-white-300 cursor-pointer">
              Documentation
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-dark-300 h-[1px]" />
            <DropdownMenuItem className="hover:!bg-dark-200 hover:!text-red-305 cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default TopBar;
