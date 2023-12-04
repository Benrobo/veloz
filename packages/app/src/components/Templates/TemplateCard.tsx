import React from "react";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "../Flex";
import { TechStackPricingPlan } from "@veloz/shared/types";
import { PricingBadge, StackedAvatar } from "../Badge";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { TEMPLATES_PRICING_MODEL } from "@/constant/template";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

type TemplateCardProps = {
  name: string;
  pricing_plan: TechStackPricingPlan;
  tagline: string;
  userImages: string[];
  thumbnail: string;
};

// parent template card
function TemplateCard({
  name,
  tagline,
  userImages,
  pricing_plan,
  thumbnail,
}: TemplateCardProps) {
  const bgImageStyle = {
    backgroundImage: `url(${thumbnail})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const pricingModel = TEMPLATES_PRICING_MODEL.find(
    (m) => m.plan === pricing_plan
  );

  return (
    <FlexColCenter className="w-auto min-w-[350px] min-h-[300px] relative bg-dark-200 border-solid border-[.9px] border-gray-100 rounded-md overflow-hidden shadow-xl shadow-dark-200 transition duration-150">
      <Image
        width={0}
        height={0}
        className="w-full h-full min-h-[350px] absolute top-0 left-0"
        src={thumbnail}
        alt="thumbnail"
      />
      <div className="w-full absolute bottom-3 px-3 ">
        <FlexColStartCenter className="w-full px-3 py-5 bg-dark-500 backdrop-blur-md rounded-[10px] ">
          <FlexRowStartBtw className="w-full">
            <FlexColStart className="w-full">
              <p className="text-white-100 font-jbEB leading-none">{name}</p>
              <p className="text-white-200 font-jbSB text-[11px] leading-none ">
                {tagline.length > 35 ? tagline.slice(0, 35) + "..." : tagline}
              </p>
            </FlexColStart>
            <FlexRowCenter className="w-fit px-5 ">
              <StackedAvatar images={userImages} limit={2} />
            </FlexRowCenter>
          </FlexRowStartBtw>
          <FlexRowStartCenter className="w-full">
            <FlexRowStartCenter className="w-full">
              {pricing_plan !== "FREE_PKG" && (
                <a
                  href=""
                  target={"_blank"}
                  className="underline text-white-100 text-[10px] font-jbSB"
                >
                  Buy Now
                </a>
              )}
              <Link
                href={`/templates/parent/${name}`}
                className="underline flex gap-1 text-white-100 text-[10px] font-jbSB"
              >
                Learn more
              </Link>
            </FlexRowStartCenter>
            <FlexRowEnd className="w-full">
              <h1 className="text-white-100 text-2xl font-jbEB">
                {pricing_plan === "FREE_PKG"
                  ? "Free"
                  : formatCurrency(
                      pricingModel?.pricing.price as number,
                      pricingModel?.pricing.currency as string
                    )}
              </h1>
            </FlexRowEnd>
          </FlexRowStartCenter>
        </FlexColStartCenter>
      </div>
    </FlexColCenter>
  );
}

export default TemplateCard;
