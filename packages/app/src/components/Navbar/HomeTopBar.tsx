import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FlexRowCenterBtw, FlexRowCenter, FlexRowEnd } from "../Flex";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

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
  const { isLoaded, user } = useUser();
  const [activeTab, setActiveTab] = useState("pricing");

  return (
    <FlexRowCenterBtw
      className={cn(
        "w-full h-auto px-9 py-3  backdrop-blur z-[1000] border-b-solid border-b-[.5px] border-b-gray-100/20 ",
        scrollVisible ? "bg-dark-200/50 fixed top-0 left-0" : "absolute"
      )}
    >
      <FlexRowCenter className="md:w-full gap-5">
        <FlexRowCenter className="w-full md:min-w-[100px]">
          <Image
            src={"/images/logo/logo.png"}
            width={30}
            height={0}
            alt="veloz logo"
          />
          <p className="text-white-100 font-ppEB">Veloz</p>
        </FlexRowCenter>
      </FlexRowCenter>
      <FlexRowCenter className="w-full hidden md:flex gap-5 transition-all">
        {navigations
          .filter((n) => n.visible)
          .map((n) => (
            <Link
              href={n.link}
              className={cn(
                "text-[12px] hover:text-white-100 hover:underline font-jbEB transition-all delay-700 hover:delay-700",
                activeTab === n.title.toLowerCase()
                  ? "text-white-100 font-jbEB"
                  : "text-white-300"
              )}
              onClick={() => setActiveTab(n.title.toLowerCase())}
            >
              {n.title}
            </Link>
          ))}
      </FlexRowCenter>
      <FlexRowEnd className="w-full hidden md:flex ">
        <Link
          href="/dashboard"
          className={cn(
            "w-auto px-4 py-2 rounded-[30px] scale-[.85] bg-dark-200 text-white-100 font-ppSB text-[12px] ",
            isLoaded && user ? "visible" : "invisible"
          )}
        >
          Dashboard
        </Link>
      </FlexRowEnd>
    </FlexRowCenterBtw>
  );
}

export default HomeTopBar;
