import { cn, getPlanTitle } from "@/lib/utils";
import { TechStackPricingPlan } from "@veloz/shared/types";
import { FlexRowCenterBtw } from "./Flex";
import Image from "next/image";

interface PricingBadgeProps {
  pricing_plan: TechStackPricingPlan;
}

export function PricingBadge({ pricing_plan }: PricingBadgeProps) {
  return (
    <FlexRowCenterBtw className="w-auto px-4 py-1 rounded-[30px] bg-dark-200 scale-[.85] border-solid border-white-600 border-[1px]">
      <p
        className={cn(
          "text-[12px] font-ppB text-white-100"
          // pricing_plan === "FREE_PKG"
          //   ? "text-white-100"
          //   : pricing_plan === "BASIC_PKG"
          //     ? "text-blue-100"
          //     : pricing_plan === "STANDARD_PKG"
          //       ? "text-orange-100"
          //       : pricing_plan === "ENTERPRISE_PKG"
          //         ? "text-pink-100"
          //         : ""
        )}
      >
        {getPlanTitle(pricing_plan)}
      </p>
      {pricing_plan !== "FREE_PKG" ? (
        <Image
          src={
            pricing_plan === "STANDARD_PKG"
              ? "/images/diamond.png"
              : "/images/diamond-2.png"
          }
          width={15}
          height={0}
          alt="premium"
        />
      ) : (
        "🚀"
      )}
    </FlexRowCenterBtw>
  );
}

// difficulty badge
interface DifficultyBadgeProps {
  difficulty: "intermediate" | "beginner" | "advanced";
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <FlexRowCenterBtw
      className={cn(
        "w-auto px-3 py-1 rounded-[30px] scale-[.85] border-solid border-white-600 border-[1px]",
        difficulty === "beginner"
          ? "bg-blue-200 text-blue-100"
          : difficulty === "intermediate"
            ? "bg-orange-200 text-orange-100"
            : difficulty === "advanced"
              ? "bg-red-600 text-red-305"
              : "bg-dark-200"
      )}
    >
      <p className={cn(" text-[12px] font-ppB")}>{difficulty}</p>
    </FlexRowCenterBtw>
  );
}

// stacked grouped avatar
interface StackedAvatarProps {
  images: string[];
  limit?: number;
}

export function StackedAvatar({ limit, images }: StackedAvatarProps) {
  const _limit = limit || 3;
  const _images = images.length > _limit ? images.slice(0, _limit) : images;
  const rest = images.length > _limit ? images.length - _limit : images.length;

  if (_images.length === 0) {
    return null;
  }

  console.log({ _images, rest, images });

  return (
    <div className="w-fit flex -space-x-3 rtl:space-x-reverse">
      {_images.map((img, i) => (
        <Image
          key={i}
          className="w-8 h-8 border-2 border-white rounded-full "
          src={img}
          alt=""
          width={8}
          height={8}
        />
      ))}
      {rest > 0 && rest > _limit && (
        <div className="flex items-center justify-center px-3 min-w-8 min-h-8 w-8 h-8 font-jbSB text-xs font-medium text-white-100 bg-gray-100 border-2 border-white rounded-full">
          +{rest}
        </div>
      )}
    </div>
  );
}
