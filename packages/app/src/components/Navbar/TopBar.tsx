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
import { logout } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { DataContext } from "@/context/DataContext";

function TopBar() {
  // const { data } = useSession();
  const { userInfo } = useContext(DataContext);

  console.log({ userInfo });

  return (
    <div className="w-full flex items-center justify-end border-b-solid border-b-[1px] border-b-dark-400 py-1 px-4">
      <div className="w-auto flex">
        <DropdownMenu>
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
                {userInfo?.email ?? "N/A"}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-dark-300 h-[1px]" />
            <DropdownMenuItem className="hover:!bg-dark-200 hover:!text-white-300 cursor-pointer">
              Documentation
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-dark-300 h-[1px]" />
            <DropdownMenuItem
              className="hover:!bg-dark-200 hover:!text-red-305 cursor-pointer"
              onClick={logout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default TopBar;
