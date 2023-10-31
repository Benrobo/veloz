import React, { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
} from "./Flex";
import { ChevronDown, Layers } from "lucide-react";

interface AccordionProps extends React.HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  className?: React.ComponentProps<"div">["className"];
  title?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}

function Accordion({
  children,
  title,
  leftIcon,
  rightIcon,
  className,
  ...props
}: AccordionProps) {
  const [open, setOpen] = useState(false);

  const preventAccordionFromClosing = (e: any) => {
    // prevent accordion from automatically closing
    const invalidKbCode = ["space", "enter"];
    const kbcode = e.code.toLowerCase();
    if (invalidKbCode.includes(kbcode)) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    // @ts-expect-error
    <button
      className={twMerge(
        "w-full h-auto group transition-all outline-none border-solid border-[1px] border-dark-200 px-4 py-4 rounded-lg flex items-start justify-start flex-col",
        className
      )}
      {...props}
      data-name="veloz-accordion"
      onClick={(e: any) => {
        const target = e.target;
        const parent = target.parentElement;
        const btn =
          parent.tagName.toLowerCase() === "button"
            ? parent
            : parent.querySelector("button");
        const name = btn?.name;
        if (props?.name === name) {
          setOpen(!open);
        }
      }}
      onKeyDownCapture={preventAccordionFromClosing}
    >
      <FlexRowStartBtw className="w-full">
        <FlexRowCenter>
          {leftIcon ?? (
            <Layers
              size={20}
              className="text-white-300 group-hover:text-white-100"
            />
          )}
          <p className="text-white-200 text-[15px] group-hover:text-white-100 font-ppR">
            {title ?? "Accordion"}
          </p>
        </FlexRowCenter>
        <FlexRowCenter>
          {rightIcon ?? (
            <ChevronDown
              className={twMerge(
                "text-white-300 group-hover:text-white-100 transition-all",
                open
                  ? "rotate-[-180deg] transition-all"
                  : "rotage-[180deg] transition-all"
              )}
            />
          )}
        </FlexRowCenter>
      </FlexRowStartBtw>
      <div
        className={twMerge(
          "w-full transition-all overflow-hidden",
          open ? "h-auto mt-5 transition-all" : "h-[0px] transition-all"
        )}
      >
        {children}
      </div>
    </button>
  );
}

export default Accordion;
