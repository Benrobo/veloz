import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  FlexRowCenterBtw,
  FlexRowCenter,
  FlexRowEnd,
  FlexRowStartCenter,
} from "../Flex";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SITE_CONFIG from "@/config/site";

export const navigations = [
  {
    link: "#starter-kits",
    visible: true,
    title: "Starter Kits",
    external: false,
  },
  {
    link: SITE_CONFIG.documentation,
    visible: true,
    title: "Documentation",
    external: true,
  },
  {
    link: "#",
    visible: false,
    title: "Changelog",
    external: false,
  },
  {
    link: "#faq",
    visible: true,
    title: "FAQ",
    external: false,
  },
];

type Props = {
  scrollVisible?: boolean;
};

function HomeTopBar({ scrollVisible }: Props) {
  const { status, data } = useSession();
  const [activeTab, setActiveTab] = useState("");

  return (
    <FlexRowCenterBtw
      className={cn(
        "w-full h-auto px-5 md:px-9 py-3  backdrop-blur z-[1000] border-b-solid border-b-[.5px] border-b-gray-100/20 ",
        scrollVisible ? "bg-dark-200/50 fixed top-0 left-0" : "absolute"
      )}
    >
      <FlexRowCenter className="w-auto md:w-full gap-5">
        <Link href={"/#home"}>
          <FlexRowCenter className="w-auto md:min-w-[100px]">
            <Image
              src={"/images/logo/logo.png"}
              width={30}
              height={0}
              alt="veloz logo"
            />
            <p className="text-white-100 font-ppEB">Veloz</p>
          </FlexRowCenter>
        </Link>
      </FlexRowCenter>
      <FlexRowCenter className="w-full hidden md:flex gap-5 transition-all">
        {navigations
          .filter((n) => n.visible)
          .map((n) => (
            <Link
              key={n.link}
              href={n.external ? n.link : `/${n.link}`}
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
      <FlexRowEnd className="w-full ">
        <Link
          href={status === "authenticated" && data ? "/dashboard" : "/auth"}
          className="w-auto px-5 py-3 rounded-[30px] group bg-white-100 hover:bg-white-100/40  transition-all scale-[1] md:scale-[.90] "
        >
          <FlexRowStartCenter className="gap-2">
            <span className="text-dark-100 text-xs md:text-sm font-ppSB">
              {status === "authenticated" && data ? "Dashboard" : "Get started"}
            </span>
            <ChevronRight
              size={15}
              className="text-dark-100 group-hover:translate-x-2 translate-x-0 transition-all"
            />
          </FlexRowStartCenter>
        </Link>
      </FlexRowEnd>
    </FlexRowCenterBtw>
  );
}

export default HomeTopBar;
