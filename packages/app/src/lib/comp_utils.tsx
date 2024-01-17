import { TechStackCategory } from "@veloz/shared/types";
import { Shield } from "iconsax-react";
import { Theater, Server, DatabaseZap, WalletCards, Mails } from "lucide-react";
import { ReactElement } from "react";

export function renderAccdIcon(category: TechStackCategory) {
  let icon = null;
  if (category === "frontend") {
    icon = <Theater className="group-hover:text-white-100 text-white-300" />;
  }
  if (category === "backend") {
    icon = <Server className="group-hover:text-white-100 text-white-300" />;
  }
  if (category === "database") {
    icon = (
      <DatabaseZap className="group-hover:text-white-100 text-white-300" />
    );
  }
  if (category === "payment") {
    icon = (
      <WalletCards className="group-hover:text-white-100 text-white-300" />
    );
  }
  if (category === "mailing") {
    icon = <Mails className="group-hover:text-white-100 text-white-300" />;
  }
  if (category === "authentication") {
    // @ts-ignore
    icon = <Shield className="group-hover:text-white-100 text-white-300" />;
  }

  return icon as ReactElement;
}
