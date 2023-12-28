import React, { useContext } from "react";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowEndCenter,
  FlexRowStartCenter,
} from "../Flex";
import { CheckCheck, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { PARENT_KITS } from "@/data/stack";
import { TEMPLATES_PRICING_MODEL } from "@/constant/starter-kit";
import { DataContext } from "@/context/DataContext";

const features = [
  "One Time purchase",
  "Unlimited projects",
  "Access to prebuilt UI components",
  "Discord community support",
  "Plugins",
  "Lifetime updates",
];

type Props = {
  name: string;
};

function Pricing({ name }: Props) {
  const { userInfo } = useContext(DataContext);

  const template = PARENT_KITS.find(
    (t) => t.name.toLowerCase() === name.toLowerCase()
  );
  const tempModel = TEMPLATES_PRICING_MODEL.find(
    (m) => m.plan === template?.pricing_plan
  );
  const tempDiscount = template?.discount ?? null;

  return (
    <FlexColStart className="w-full h-full ">
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
              {tempDiscount && (
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
                {tempDiscount
                  ? formatCurrency(
                      ((tempModel?.pricing?.price as number) -
                        tempDiscount?.amount) as number,
                      tempModel?.pricing?.currency as string
                    )
                  : formatCurrency(
                      tempModel?.pricing?.price as number,
                      tempModel?.pricing?.currency as string
                    )}
              </h1>
            </FlexRowEndCenter>
          </FlexColStart>
          <br />
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
              if (!userInfo) {
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
