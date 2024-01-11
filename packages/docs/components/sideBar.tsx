import { Gem } from "lucide-react";
import { FlexRowStartCenter } from "./flex";
import { twMerge } from "tailwind-merge";

const titleIconMap = {
  zeus: <Gem size={15} className=" mr-2" />,
  tutorials: "📚",
  features: "🚀",
  components: "🧩",
  "starter kits": "📦",
};

export function RenderSidebarIcon({
  title,
  type,
}: {
  title: string;
  type: string;
}) {
  const pagesWithExtendedSize = [
    "lemonsqueezy",
    "zeus",
    "getting started",
    "introduction",
  ];
  const icon = titleIconMap[title.toLowerCase()] || null;

  return (
    <FlexRowStartCenter
      className={twMerge(
        `group hover:text-white-100 transition-all gap-${
          icon === title ? "" : 2
        }`,
        type === "separator"
          ? "font-ppSB text-white-100"
          : pagesWithExtendedSize.includes(title.toLowerCase())
            ? "font-ppReg"
            : "font-ppReg text-xs"
      )}
    >
      {icon} {title}
    </FlexRowStartCenter>
  );
}
