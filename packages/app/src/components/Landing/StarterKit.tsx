import React from "react";
import {
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowEndCenter,
  FlexRowStart,
  FlexRowStartCenter,
} from "../Flex";
import { TechStackPricingPlan } from "@veloz/shared/types";
import { cn, formatCurrency } from "@/lib/utils";
import { CheckCheck, MoveRight } from "lucide-react";
import { TEMPLATES_PRICING_MODEL } from "@/constant/template";
import { PARENT_TEMPLATES } from "@/data/stack";
import Link from "next/link";
import Image from "next/image";

function StarterKits() {
  const templates = PARENT_TEMPLATES.map((t) => {
    const tempModel = TEMPLATES_PRICING_MODEL.find(
      (m) => m.plan === t.pricing_plan
    );
    return {
      ...t,
      plan: tempModel?.pricing,
    };
  });

  const tempDiscount = templates.map((t) => t.discount)[0] ?? null;

  return (
    <FlexColStart className="w-full h-full py-[5em] border-t-solid border-t-[1px] border-t-gray-100/30">
      <a id="starter-kits" className="invisible"></a>
      <FlexColStartCenter className="w-full h-full text-center">
        <h1 className="text-white-100 font-ppEB text-2xl md:text-4xl">
          Starter Kits
        </h1>
        <p className="text-white-300 max-w-[90%] md:max-w-[70%] text-[13px] font-ppReg">
          Finally, it high time you ship that idea of yours and turn it into a
          reality. We are here to help you get started. Checkout the starter kit
          below. Purchasing a starter kit, provides you access to subsequent
          related kit's available and future added kit's. 😻
        </p>
        <br />
        {tempDiscount && (
          <span className="text-orange-100 font-ppSB text-[14px] ">
            🎁
            <span className=" relative left-5 whitespace-nowrap">
              <span className="absolute bg-red-305 -left-3 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
              <span className="relative text-white-100">
                ${tempDiscount?.amount}
              </span>
            </span>
            <span className="text-white-100 font-ppReg ml-[3em]">
              off for a limited time.
            </span>
          </span>
        )}
      </FlexColStartCenter>
      <br />
      <FlexRowStart className="w-full  h-auto px-[4em] flex-wrap ">
        {templates.map((t) => (
          <PricingTemplateCard
            key={t.id}
            name={t.name}
            plan={t.plan as any}
            tagline={t.tagline}
            thumbnail={t.image}
            discount={t.discount}
          />
        ))}
      </FlexRowStart>
    </FlexColStart>
  );
}

export default StarterKits;

type PricingTemplateCardProps = {
  name: string;
  plan: {
    currency: string;
    currency_symbol: string;
    price: number;
  };
  tagline: string;
  thumbnail: string;
  discount: {
    amount: number;
  } | null;
};

function PricingTemplateCard({
  name,
  plan,
  thumbnail,
  tagline,
  discount,
}: PricingTemplateCardProps) {
  if (!plan) return null;
  return (
    <FlexColStart className="w-full max-w-[450px] h-auto min-h-[300px] gap-0  rounded-md scale-[.90] translate-x-[-20px] ">
      {/* <div
        className="w-[700px] md:max-w-[450px] h-[250px] relative rounded-[10px] group overflow-hidden border-solid border-[.9px] border-gray-100/20 transition-all "
        style={{
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // height: "250px",
          // width: "450px",
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
        <FlexRowEndCenter className="w-auto">
          {discount && (
            <h1 className={cn("text-white-400 text-md line-through font-ppSB")}>
              {formatCurrency(plan?.price as number, plan?.currency as string)}
            </h1>
          )}
          <h1 className="text-white-100 text-3xl font-ppSB">
            {discount
              ? formatCurrency(
                  plan?.price - discount?.amount || 0,
                  plan?.currency as string
                )
              : formatCurrency(plan?.price as number, plan?.currency as string)}
          </h1>
        </FlexRowEndCenter>
      </FlexRowCenterBtw>
      <Link
        href={`/product/kits/${name.toLowerCase()}`}
        className="w-full mt-4 "
      >
        <FlexRowStartCenter className="gap-1 w-[135px] px-5 py-3 bg-dark-200 rounded-[30px] scale-[.85] ">
          <span className="text-orange-100 font-jbEB text-[11px] ">
            Learn More
          </span>
          <MoveRight
            size={15}
            strokeWidth={"3px"}
            className="text-orange-100"
          />
        </FlexRowStartCenter>
      </Link>
    </FlexColStart>
  );
}