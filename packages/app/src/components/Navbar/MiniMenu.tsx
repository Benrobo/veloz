import { AlignJustify, X } from "lucide-react";
import { FlexColCenter, FlexColStart } from "../Flex";
import Link from "next/link";
import { navigations } from "./HomeTopBar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function MiniMenu() {
  const [activeTab, setActiveTab] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      id="mobile-menu-container"
      className="flex md:hidden fixed bottom-[20px] right-[15px] z-[599]"
    >
      <div className="mobile-menu-container">
        <ul
          className={cn(
            "fixed bottom-[7em] md:bottom-[6em] right-[15px] z-[100]",
            menuOpen ? "visible" : "invisible"
          )}
        >
          <FlexColStart>
            {navigations
              .filter((n) => n.visible)
              .map((n) => (
                <Link
                  key={n.link}
                  href={n.external ? n.link : `/${n.link}`}
                  className={cn(
                    "text-[12px] hover:text-white-100 hover:underline font-jbEB transition-all ease-in-out ",
                    menuOpen ? "-translate-y-[3px] " : "transition-y-0",
                    activeTab === n.title.toLowerCase()
                      ? "text-white-100 font-jbEB"
                      : "text-white-300"
                  )}
                  onClick={() => {
                    setActiveTab(n.title.toLowerCase());
                    setMenuOpen(false);
                  }}
                >
                  {n.title}
                </Link>
              ))}
          </FlexColStart>
        </ul>

        <button
          className={cn(
            "w-[45px] h-[45px] fixed right-[14px] bottom-[2em] z-[100] bg-dark-200 p-3 rounded-[50%] transition-all ease-in-out border-none outline-none ",
            menuOpen ? "drop-shadow-2xl shadow-dark-100" : ""
          )}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FlexColCenter>
            {menuOpen ? (
              <X
                size={20}
                className="text-white-100 transition-all ease-in-out"
              />
            ) : (
              <AlignJustify
                size={20}
                className="text-white-100 transition-all ease-in-out"
              />
            )}
          </FlexColCenter>
        </button>

        <div
          className={cn(
            " transition-all ease-in-out w-[70px] h-[70px] fixed bg-dark-200 z-[99] rounded-[50%] drop-shadow-2xl",
            menuOpen ? "scale-[9] -translate-x-[20px]" : "scale-[0]"
          )}
        ></div>
      </div>
    </div>
  );
}
