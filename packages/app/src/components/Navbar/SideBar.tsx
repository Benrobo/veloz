import LocalImages from "@/data/images";
import Image from "next/image";
import React, { useContext } from "react";
import { HomeIcon, MoneyIcon, ProjectIcon } from "../Icon";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { PanelRightClose, PanelRightOpen, Settings, Zap } from "lucide-react";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStartCenter,
} from "../Flex";
import { cn, getPlanTitle, planColor } from "@/lib/utils";
import { DataContext } from "@/context/DataContext";
import { TechStackPricingPlan } from "@veloz/shared/types";
import { Button } from "../ui/button";

interface SidebarProps {
  activePage: string;
}

function SideBar({ activePage }: SidebarProps) {
  const { setSidebarOpen, sidebarOpen } = useContext(DataContext);
  const buttonStyle = (pageName: string, compName: string) => {
    const notActive = "text-gray-100 bg-none",
      Active = "text-white-100 bg-dark-300",
      iconActive = "#fff",
      iconNotActive = "#736c7e";

    if (pageName === compName) return { btn: Active, icon: iconActive };
    else return { btn: notActive, icon: iconNotActive };
  };

  const sidebarLinkClicked = () => {
    if (window.innerWidth < 768) {
      sidebarOpen && setSidebarOpen(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full fixed top-0 left-0 md:relative max-w-[250px] border-r-solid border-r-[1px] border-r-dark-400 hideScrollBar py-1 z-[100] bg-dark-100 transition-all ease-in-out",
        sidebarOpen ? "w-[250px]" : "w-0 overflow-hidden"
      )}
    >
      <div className="w-full flex items-center justify-start gap-3 py-2 px-4">
        <Link href="/" className="w-fit">
          <FlexRowStartCenter>
            <Image
              src={"/images/logo/logo.png"}
              className="scale-[.85]"
              alt="logo"
              width={45}
              height={0}
            />
            <span className="font-ppSB text-white-100 text-[1em]">Veloz</span>
          </FlexRowStartCenter>
        </Link>

        <button
          className="md:hidden absolute top-2 right-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <PanelRightOpen size={15} className="text-white-100" />
          ) : (
            <PanelRightClose size={15} className="text-white-100" />
          )}
        </button>
      </div>
      <div className="w-full mt-5 px-4 flex flex-col items-center justify-center gap-3">
        {/* home item */}
        <Link
          href="/dashboard"
          className={twMerge(
            "w-full h-auto group px-4 py-3 rounded-lg  flex items-center justify-start gap-2 font-ppReg transition ease-in-out text-[14px]",
            buttonStyle(activePage, "home").btn
          )}
          onClick={sidebarLinkClicked}
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
          href="/kits"
          className={twMerge(
            "w-full h-auto group px-4 py-3 rounded-lg flex items-center justify-start gap-2 font-ppReg transition ease-in-out text-[14px]",
            buttonStyle(activePage, "kits").btn
          )}
          onClick={sidebarLinkClicked}
        >
          <ProjectIcon
            pathCss="group-hover:fill-white-100 transition ease-in-out"
            width={15}
            height={15}
            fill={buttonStyle(activePage, "kits").icon}
          />
          <span className="group-hover:text-white-100 transition ease-in-out">
            Starter Kits
          </span>
        </Link>

        {/* Settings */}
        <Link
          href="/settings"
          className={twMerge(
            "w-full h-auto group px-4 py-3 rounded-lg flex items-center justify-start gap-2 font-ppReg transition ease-in-out text-[14px]",
            buttonStyle(activePage, "settings").btn
          )}
          onClick={sidebarLinkClicked}
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

      {/* <UpgradePlanWidget /> */}
    </div>
  );
}

export default SideBar;

function UpgradePlanWidget() {
  return (
    <FlexColCenter className="w-full px-5 py-4 absolute bottom-2">
      <FlexColStart className="w-full bg-dark-200 p-3 rounded-md border-solid border-[.5px] border-white-600 ">
        <FlexRowCenterBtw>
          <p className="text-white-300 text-[10px] leading-none font-ppL">
            Current Plan
          </p>
          <span
            className={cn(
              "text-white-100 text-[10px] px-3 py-1 rounded-[30px] border-solid border-[1px] border-white-600 leading-none font-jbSB"
            )}
          >
            {/* {getPlanTitle(userPlan)} */}
          </span>
        </FlexRowCenterBtw>
        <p className="text-gray-100 font-jbPR text-[10px] ">
          Upgrade your account to get access to incredible features.
        </p>
        <FlexColCenter className="w-full mt-2">
          <Button
            variant={"primary"}
            className={cn(
              "w-full rounded-[30px] font-ppSB text-[15px] gap-2 premium-button"
            )}
          >
            <Zap size={15} /> Upgrade
          </Button>
        </FlexColCenter>
      </FlexColStart>
    </FlexColCenter>
  );
}
