import React, { useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import SideBar from "./Navbar/SideBar";
import { LayoutContext } from "@/context/LayoutContext";

interface LayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  activePage: string;
}

function Layout({ children, activePage, className }: LayoutProps) {
  const { setActivePage } = useContext(LayoutContext);

  useEffect(() => {
    setActivePage(activePage);
  }, []);

  return (
    <div
      className={twMerge("w-full relative h-screen overflow-y-auto", className)}
    >
      {children}
    </div>
  );
}

export default Layout;

export function ComponentLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const { activePage } = useContext(LayoutContext);

  return (
    <div
      className={twMerge(
        "w-full relative h-screen overflow-y-auto bg-dark-100"
      )}
    >
      <div className="w-full h-full hideScrollBar flex">
        <SideBar activePage={activePage} />
        <div className="z-upper">{children}</div>
      </div>
    </div>
  );
}
