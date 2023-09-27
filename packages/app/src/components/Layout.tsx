import React from "react";
import { twMerge } from "tailwind-merge";
import SideBar from "./Navbar/SideBar";

interface LayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  activePage?: string;
}

function Layout({ children, activePage, className }: LayoutProps) {
  return (
    <div
      className={twMerge(
        "w-full relative h-screen overflow-y-auto bg-dark-200",
        className
      )}
    >
      <div className="w-full h-full hideScrollBar flex">
        <SideBar />
        <div className="z-upper">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
