import LocalImages from "@/data/images";
import Image from "next/image";
import React from "react";
import { HomeIcon, MoneyIcon, ProjectIcon } from "../Icon";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { Settings } from "lucide-react";

interface SidebarProps {
  activePage: string;
}

function SideBar({ activePage }: SidebarProps) {
  const buttonStyle = (pageName: string, compName: string) => {
    const notActive = "text-gray-100 bg-none",
      Active = "text-white-100 bg-dark-300",
      iconActive = "#fff",
      iconNotActive = "#736c7e";

    if (pageName === compName) return { btn: Active, icon: iconActive };
    else return { btn: notActive, icon: iconNotActive };
  };

  return (
    <div className="w-full h-full max-w-[220px] border-r-solid border-r-[1px] border-r-dark-400 hideScrollBar py-1 ">
      <div className="w-full flex items-center justify-start gap-3 py-2 px-4">
        <Image
          src={"/images/logo/logo.png"}
          className=""
          alt="logo"
          width={45}
          height={0}
        />
        <span className="font-ppSB text-white-100 text-[1em]">Veloz</span>
      </div>
      <div className="w-full mt-5 px-4 flex flex-col items-center justify-center gap-3">
        {/* home item */}
        <Link
          href="/dashboard"
          className={twMerge(
            "w-full h-auto group px-4 py-3 rounded-lg  flex items-center justify-start gap-2 font-ppReg transition ease-in-out text-[14px]",
            buttonStyle(activePage, "home").btn
          )}
        >
          <HomeIcon
            pathCss="group-hover:fill-white-100 transition ease-in-out"
            width={15}
            height={15}
            fill={buttonStyle(activePage, "home").icon}
          />
          <span className="group-hover:text-white-100 transition ease-in-out">
            Overview
          </span>
        </Link>

        {/* projects */}
        <Link
          href="/projects"
          className={twMerge(
            "w-full h-auto group px-4 py-3 rounded-lg flex items-center justify-start gap-2 font-ppReg transition ease-in-out text-[14px]",
            buttonStyle(activePage, "projects").btn
          )}
        >
          <ProjectIcon
            pathCss="group-hover:fill-white-100 transition ease-in-out"
            width={15}
            height={15}
            fill={buttonStyle(activePage, "projects").icon}
          />
          <span className="group-hover:text-white-100 transition ease-in-out">
            Projects
          </span>
        </Link>

        {/* Billing */}
        <Link
          href="/billing"
          className={twMerge(
            "w-full h-auto group px-4 py-3 rounded-lg flex items-center justify-start gap-2 font-ppReg transition ease-in-out text-[14px]",
            buttonStyle(activePage, "billing").btn
          )}
        >
          <MoneyIcon
            pathCss="group-hover:fill-white-100 transition ease-in-out"
            width={15}
            height={15}
            fill={buttonStyle(activePage, "billing").icon}
          />
          <span className="group-hover:text-white-100 transition ease-in-out">
            Billing
          </span>
        </Link>

        {/* Settings */}
        <Link
          href="/settings"
          className={twMerge(
            "w-full h-auto group px-4 py-3 rounded-lg flex items-center justify-start gap-2 font-ppReg transition ease-in-out text-[14px]",
            buttonStyle(activePage, "settings").btn
          )}
        >
          <Settings
            size={15}
            className={twMerge(
              "group-hover:text-white-100 transition ease-in-out",
              buttonStyle(activePage, "billing").icon
            )}
          />
          <span className="group-hover:text-white-100 transition ease-in-out">
            Settings
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
