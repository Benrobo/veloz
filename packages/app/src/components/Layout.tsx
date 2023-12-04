"use client";
import React, { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import SideBar from "./Navbar/SideBar";
import { LayoutContext } from "@/context/LayoutContext";
import TopBar from "./Navbar/TopBar";

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

export default Layout;

// export function ComponentLayout({
//   children,
// }: {
//   children: React.ReactElement;
// }) {
//   const { activePage } = useContext(LayoutContext);
//   const [pathname, setPathname] = useState("");
//   // pages that uses the default Layout
//   const validPages = [
//     "dashboard",
//     "billing",
//     "templates/create",
//     "settings",
//     pathname.includes("templates") && pathname,
//   ];

//   // check if route is cached
//   useEffect(() => {
//     const cachedRoute = localStorage.getItem("@veloz:activePage");
//     if (cachedRoute) {
//       setPathname(cachedRoute);
//     }
//   });

//   useEffect(() => {
//     const { pathname } = window.location;
//     setPathname(pathname.replace("/", ""));
//     localStorage.setItem("@veloz:activePage", pathname.replace("/", ""));
//   }, [pathname, validPages]);

//   return (
//     <div
//       className={twMerge(
//         "w-full relative h-screen overflow-y-auto hideScrollBar bg-dark-100"
//       )}
//     >
//       {validPages.includes(pathname) ? (
//         <div className="w-full h-screen flex">
//           <SideBar activePage={activePage} />
//           <div className="w-full z-upper  overflow-hidden">
//             <TopBar />
//             {children}
//           </div>
//         </div>
//       ) : (
//         children
//       )}
//     </div>
//   );
// }
