import { Gem } from "lucide-react";
import { FlexRowStartCenter } from "./flex";

const titleIconMap = {
  zeus: <Gem size={15} className="text-white-200" />,
  authentication: "🔒",
  setup: "🔧",
  intro: "👋",
  oauth: "🔑",
  "email-password": "📧",
};

export function RenderSidebarIcon({ title }: { title: string }) {
  const icon = titleIconMap[title.toLowerCase()] || null;

  return (
    <FlexRowStartCenter className={`gap-${icon === title ? "" : 2}`}>
      {icon} {title}
    </FlexRowStartCenter>
  );
}
