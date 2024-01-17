import { twMerge } from "tailwind-merge";

export default function ProjectStatus({
  status,
}: {
  status: "done" | "failed" | "pending";
}) {
  let badge = null;
  const baseClass = `w-auto px-3 py-1 rounded-[30px] text-[9px] font-ppSB border-solid border-[.5px] border-white-600`;
  if (status === "pending") {
    badge = (
      <span className={twMerge(baseClass, "bg-orange-301 text-orange-300")}>
        {status}
      </span>
    );
  }
  if (status === "done") {
    badge = (
      <span className={twMerge(baseClass, "bg-green-200 text-green-100")}>
        {status}
      </span>
    );
  }
  if (status === "failed") {
    badge = (
      <span className={twMerge(baseClass, "bg-red-100 text-red-305")}>
        {status}
      </span>
    );
  }
  return badge;
}
