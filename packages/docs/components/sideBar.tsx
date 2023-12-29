import { Gem } from "lucide-react";
import { FlexRowStartCenter } from "./flex";

export function RenderSidebarIcon({ title }: { title: string }) {
  let icon = <>{title}</>;
  if (title.toLowerCase() === "zeus") {
    icon = (
      <FlexRowStartCenter className="gap">
        <Gem size={15} className="text-white-200" />
        {title}
      </FlexRowStartCenter>
    );
  }
  return icon;
}
