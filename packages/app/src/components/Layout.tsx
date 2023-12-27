// "use client";
import React, { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import SideBar from "./Navbar/SideBar";
import { LayoutContext } from "@/context/LayoutContext";
import TopBar from "./Navbar/TopBar";
import withAuth from "@/lib/auth/withAuth";
import { signOut, useSession } from "next-auth/react";
import { FlexRowCenter, FlexRowStartBtw } from "./Flex";
import { Button } from "./ui/button";
import Link from "next/link";

interface LayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  activePage: string;
}

function Layout({ children, activePage, className }: LayoutProps) {
  const { setActivePage } = useContext(LayoutContext);

  // track device screen and show not mobile component if screen is small
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 868) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [activePage]);

  useEffect(() => {
    setActivePage(activePage);
  }, [activePage]);

  return (
    <div
      className={twMerge(
        "w-full relative h-screen overflow-y-auto hideScrollBar bg-dark-100",
        className
      )}
    >
      {isMobile ? (
        <NotMobile />
      ) : (
        <div className="w-full h-screen flex">
          <SideBar activePage={activePage} />
          <div className="w-full z-upper relative  overflow-hidden">
            <TopBar />
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(Layout as any);

// component that get shown to let user knows this page isn;t for mobile yet
function NotMobile() {
  const { status } = useSession();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-3xl">{"😔"}</span>
      <p className="text-white-100 font-ppSB text-[16px]">
        This page is not available on mobile yet
      </p>
      <p className="text-white-300 font-ppReg text-[13px]">
        Please use a desktop to access this page
      </p>
      <br />
      <FlexRowCenter className="w-full">
        <FlexRowStartBtw className="w-full max-w-[50%]">
          <Link href="/">
            <Button className="rounded-full px-7 text-xs bg-blue-101 hover:bg-blue-101/80">
              <span className="font-ppReg text-white-100">Go Home</span>
            </Button>
          </Link>
          {status === "authenticated" && (
            <Button
              variant={"destructive"}
              className="rounded-full px-7 text-xs "
              onClick={() => signOut()}
            >
              <span className="font-ppReg text-white-100">Logout</span>
            </Button>
          )}
        </FlexRowStartBtw>
      </FlexRowCenter>
    </div>
  );
}

interface KitsLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
}

export function KitsLayout({ children, className }: KitsLayoutProps) {
  return (
    <div
      className={twMerge(
        "w-full relative h-screen overflow-y-auto scroll-smooth hideScrollBar bg-dark-100",
        className
      )}
    >
      {children}
    </div>
  );
}
