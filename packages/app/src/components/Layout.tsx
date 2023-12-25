"use client";
import React, { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import SideBar from "./Navbar/SideBar";
import { LayoutContext } from "@/context/LayoutContext";
import TopBar from "./Navbar/TopBar";
import withAuth from "@/lib/auth/withAuth";

interface LayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  activePage: string;
}

function Layout({ children, activePage, className }: LayoutProps) {
  const { setActivePage } = useContext(LayoutContext);

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
      <div className="w-full h-screen flex">
        <SideBar activePage={activePage} />
        <div className="w-full z-upper relative  overflow-hidden">
          <TopBar />
          {children}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Layout as any);

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
