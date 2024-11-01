"use client";
import React, { useContext } from "react";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowEndCenter,
  FlexRowStartCenter,
} from "../Flex";
import { CheckCheck, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { calculateDiscountedPrice, cn, formatCurrency } from "@/lib/utils";
import { PARENT_KITS } from "@/data/stack";
import { TEMPLATES_PRICING_MODEL } from "@/constant/starter-kit";
import { hasDiscountExpired } from "@/app/api/lib/utils";
import { KIT_PRICING_PLAN_FEATURES } from "@/data/pricing";
import { useSession } from "next-auth/react";

type Props = {
  name: string;
};

function Pricing({ name }: Props) {
  const { data } = useSession();

  const template = PARENT_KITS.find(
    (t) => t.name.toLowerCase() === name.toLowerCase()
  );
  const tempModel = TEMPLATES_PRICING_MODEL.find(
    (m) => m.plan === template?.pricing_plan
  );
  const plan = TEMPLATES_PRICING_MODEL.find(
    (tp) => tp.plan.toLowerCase() === template?.pricing_plan.toLowerCase()
  );
  const tempDiscount = template?.discount ?? null;
  const features =
    KIT_PRICING_PLAN_FEATURES.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    )?.plans ?? [];

  const discountedPrice = calculateDiscountedPrice(
    plan?.pricing.price as number,
    tempDiscount?.percentage as number
  );

  return (
    <FlexColStart className="w-full h-auto ">
      <FlexColCenter className="w-full text-center z-[20]">
        <h1 className="text-white-100 font-ppEB text-2xl md:text-4xl">
          One Time Purchase
        </h1>
        <p className="text-white-300 max-w-[90%] md:max-w-[70%] text-[13px] font-ppReg">
          Veloz is a one time purchase. You get access to all the kits included
          within the package.
        </p>
        <br />
        <div id="kit-pricing" className="invisible"></div>
      </FlexColCenter>
      <br />
      <FlexColCenter className="w-full">
        <FlexColStart className="w-full scale-[.90] z-[20] md:scale-1 max-w-[350px] min-h-[450px] bg-dark-200 py-4 px-5 pb-4 rounded-md border-solid border-[1px] border-orange-100 ">
          <FlexColStart className="w-full py-5">
            <h1 className="text-white-100 font-ppEB text-2xl md:text-2xl leadning-none">
              Life Time Access
            </h1>
            <p className="text-white-300 text-[13px] font-ppReg leadning-none">
              Unlimited projects.
            </p>
            <FlexRowEndCenter className="w-auto">
              {tempDiscount &&
                !hasDiscountExpired(tempDiscount.expires).expired && (
                  <h1
                    className={cn(
                      "text-white-400 text-md line-through font-ppSB"
                    )}
                  >
                    {formatCurrency(
                      tempModel?.pricing?.price as number,
                      tempModel?.pricing?.currency as string
                    )}
                  </h1>
                )}
              <h1 className="text-white-100 text-3xl font-ppSB">
                {tempDiscount &&
                !hasDiscountExpired(tempDiscount.expires).expired
                  ? formatCurrency(
                      discountedPrice as number,
                      tempModel?.pricing?.currency as string
                    )
                  : formatCurrency(
                      tempModel?.pricing?.price as number,
                      tempModel?.pricing?.currency as string
                    )}
              </h1>
            </FlexRowEndCenter>
          </FlexColStart>
          <FlexColStart className="w-full h-auto">
            {features.map((d, i) => (
              <FlexRowStartCenter key={i} className="w-auto">
                <CheckCheck
                  size={20}
                  className="p-1 rounded-[50%] bg-orange-200 text-orange-100 "
                />
                <span className="text-white-200 text-[13px] font-ppSB">
                  {d}
                </span>
              </FlexRowStartCenter>
            ))}
          </FlexColStart>
          <br />
          <Button
            variant={"primary"}
            className={cn(
              "w-full rounded-[30px] py-5 font-ppSB text-[15px] gap-2 premium-button"
            )}
            onClick={() => {
              if (!data) {
                window.location.href = "/auth";
              } else {
                window.location.href = `/kits/parent/${name.toLowerCase()}`;
              }
            }}
          >
            <Zap size={15} /> Buy Now
          </Button>
        </FlexColStart>
      </FlexColCenter>
    </FlexColStart>
  );
}

export default Pricing;
