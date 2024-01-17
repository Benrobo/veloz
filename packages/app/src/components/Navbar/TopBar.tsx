// @ts-nocheck
"use client";
import React, { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { DataContext } from "@/context/DataContext";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { FlexRowStart } from "../Flex";
import SITE_CONFIG from "@/config/site";

function TopBar() {
  const { userInfo, sidebarOpen, setSidebarOpen } = useContext(DataContext);

  return (
    <div className="w-full flex items-center justify-end border-b-solid border-b-[1px] border-b-dark-400 py-2 px-4">
      <FlexRowStart className="w-full">
        {/* panel */}
        <button className="" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <PanelRightOpen
              size={15}
              className="text-dark-105 dark:text-white-200"
            />
          ) : (
            <PanelRightClose
              size={15}
              className="text-dark-105 dark:text-white-200"
            />
          )}
        </button>
      </FlexRowStart>

      <div className="w-auto flex">
        <DropdownMenu>
          <>
            <DropdownMenuTrigger className="w-[30px] h-[30px] bg-dark-200 font-ppReg text-white-100 border-solid border-[1px] border-dark-300 rounded-[50%] text-[13px] outline-none ">
              <Image
                src={
                  userInfo?.avatar ?? ("/images/finetuned/zeus.jpeg" as string)
                }
                width={20}
                height={20}
                className="w-full p-[1px] rounded-[50%]"
                alt="veloz user avatar"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dark-100 border-solid border-[1px] border-dark-300 outline-none mr-9 mt-1 text-gray-100 gap-3">
              <DropdownMenuLabel className="flex flex-col items-start justify-start leading-6">
                <span className="text-white-300 font-ppL text-[12px]">
                  Signed in as
                </span>
                <p className="text-white-100 font-ppReg text-[13px]">
                  {userInfo?.name ?? "N/A"}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-dark-300 h-[1px]" />
              <DropdownMenuItem
                className="hover:!bg-dark-200 hover:!text-white-300 cursor-pointer"
                onClick={() => window.open(SITE_CONFIG.documentation)}
              >
                Documentation
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-dark-300 h-[1px]" />
              <DropdownMenuItem
                className="hover:!bg-dark-200 hover:!text-red-305 cursor-pointer"
                onClick={() => signOut()}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default TopBar;
