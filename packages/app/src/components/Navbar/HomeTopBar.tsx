import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FlexRowCenterBtw, FlexRowCenter } from "../Flex";
import Image from "next/image";
import Link from "next/link";

const navigations = [
  {
    link: "#",
    visible: true,
    title: "Pricing",
  },
  {
    link: "#",
    visible: true,
    title: "Documentation",
  },
  {
    link: "#",
    visible: false,
    title: "Changelog",
  },
  {
    link: "#",
    visible: false,
    title: "Changelog",
  },
];

type Props = {
  scrollVisible?: boolean;
};

function HomeTopBar({ scrollVisible }: Props) {
  const [activeTab, setActiveTab] = useState("pricing");

  return (
    <FlexRowCenterBtw
      className={cn(
        "w-full h-auto px-9 py-3  backdrop-blur z-[1000] border-b-solid border-b-[.5px] border-b-gray-100/20 ",
        scrollVisible ? "bg-dark-200/50 fixed top-0 left-0" : "absolute"
      )}
    >
      <FlexRowCenter className="w-full gap-5">
        <FlexRowCenter className="w-full min-w-[100px]">
          <Image
            src={"/images/logo/logo.png"}
            width={30}
            height={0}
            alt="veloz logo"
          />
          <p className="text-white-100 font-ppEB">Veloz</p>
        </FlexRowCenter>
      </FlexRowCenter>
      <FlexRowCenter className="w-full gap-5">
        {navigations
          .filter((n) => n.visible)
          .map((n) => (
            <Link
              href={n.link}
              className={cn(
                "text-[12px] hover:text-white-100 hover:underline hover:font-jbEB transition-all",
                activeTab === n.title.toLowerCase()
                  ? "text-white-100 font-jbEB"
                  : "text-white-200"
              )}
            >
              {n.title}
            </Link>
          ))}
      </FlexRowCenter>
      {/* <FlexRowCenter className="w-full"></FlexRowCenter> */}
    </FlexRowCenterBtw>
  );
}

export default HomeTopBar;
