import React, { useContext } from "react";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "../Flex";
import { TechStackPricingPlan } from "@veloz/shared/types";
import { PricingBadge, StackedAvatar } from "../Badge";
import Link from "next/link";
import { BadgeCheck, CheckCheck, ExternalLink } from "lucide-react";
import { TEMPLATES_PRICING_MODEL } from "@/constant/template";
import { formatCurrency, hasTemplateBeenPurchased } from "@/lib/utils";
import Image from "next/image";
import { DataContext } from "@/context/DataContext";

type TemplateCardProps = {
  name: string;
  id: string;
  pricing_plan: TechStackPricingPlan;
  tagline: string;
  userImages: string[];
  thumbnail: string;
};

function TemplateCard({
  name,
  tagline,
  userImages,
  pricing_plan,
  thumbnail,
  id,
}: TemplateCardProps) {
  const { purchasedTemplates } = useContext(DataContext);
  const pricingModel = TEMPLATES_PRICING_MODEL.find(
    (m) => m.plan === pricing_plan
  );

  const alreadyPurchased =
    // pricing_plan === "FREE_PKG" ||
    hasTemplateBeenPurchased(purchasedTemplates, id, name);

  return (
    <FlexColStart className="w-fit max-w-[450px] h-auto min-h-[300px] gap-0  rounded-md overflow-hidden scale-[.90] translate-x-[-20px] ">
      {/* <div
        className="w-full rounded-[10px] group overflow-hidden border-solid border-[.9px] border-gray-100/20 transition-all "
        style={{
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "250px",
          width: "450px",
        }}
      ></div> */}
      <Image
        src={thumbnail}
        alt="template"
        width={450}
        height={250}
        className="rounded-md"
      />
      <br />
      <FlexRowCenterBtw className="w-full px-1">
        <FlexColStart className="w-full">
          <p className="text-white-100 font-jbEB leading-none">{name}</p>
          <p className="text-white-200 font-jbSB text-[11px] leading-none ">
            {tagline.length > 40 ? tagline.slice(0, 40) + "..." : tagline}
          </p>
        </FlexColStart>
        <FlexRowEnd className="w-auto">
          <h1 className="text-white-100 text-2xl font-jbEB">
            {alreadyPurchased ? (
              <FlexRowStartCenter className="gap-1 w-auto px-5 py-[3px] bg-dark-200 rounded-[30px] scale-[.85] ">
                <CheckCheck
                  size={15}
                  strokeWidth={"3px"}
                  className="text-orange-100"
                />
                <span className="text-orange-100 font-jbEB text-[11px] ">
                  Purchased
                </span>
              </FlexRowStartCenter>
            ) : (
              formatCurrency(
                pricingModel?.pricing.price as number,
                pricingModel?.pricing.currency as string
              )
            )}
          </h1>
        </FlexRowEnd>
      </FlexRowCenterBtw>
      <FlexRowCenterBtw className="w-full mt-4 px-1">
        <FlexRowStart>
          <Link
            href={`/templates/parent/${name}`}
            className="underline flex gap-1 text-white-100 text-[10px] font-jbSB"
          >
            Learn more
          </Link>
        </FlexRowStart>
        <FlexRowCenter className="w-fit ">
          <span className="text-gray-100 font-jbSB text-[10px] ">Used by:</span>
          <StackedAvatar images={userImages} limit={2} />
        </FlexRowCenter>
      </FlexRowCenterBtw>
    </FlexColStart>
  );
}

export default TemplateCard;
