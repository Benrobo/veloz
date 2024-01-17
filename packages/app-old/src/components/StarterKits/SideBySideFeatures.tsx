import Image from "next/image";
import { FlexColStart, FlexRowStart } from "../Flex";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type SideBySideFeaturesProps = {
  title: string;
  description: string;
  thumbnail: string | string[];
  features: {
    title: string;
    description: string;
  }[];
  direction?: "ltr" | "rtl";
};

export default function SideBySideFeatures({
  title,
  description,
  thumbnail,
  features,
  direction = "ltr",
}: SideBySideFeaturesProps) {
  return (
    <div className="w-full max-w-[90%] grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto z-[100] ">
      {direction === "ltr" ? (
        <>
          <FlexColStart className="w-full relative gap-0">
            {typeof thumbnail === "string" ? (
              <Image src={thumbnail} width={900} height={0} alt="image" />
            ) : (
              <div className="relative">
                {thumbnail.map((img, i) => (
                  <Image
                    src={img}
                    width={i === 0 ? 900 : 400}
                    height={0}
                    alt="image"
                    className={cn(
                      "rounded-lg",
                      i === 1
                        ? "absolute bottom-[-3em] right-2 drop-shadow-2xl border-[.5px] border-white-300/30 shadow-dark-100 "
                        : ""
                    )}
                  />
                ))}
              </div>
            )}
          </FlexColStart>
          <FlexColStart className="w-full">
            <h1 className="text-white-100 text-md md:text-2xl font-ppSB leading-none">
              {title}
            </h1>
            <p className="text-white-300 text-sm font-ppReg leading-none">
              {description}
            </p>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <FeatureCard
                  key={i}
                  title={f.title}
                  description={f.description}
                />
              ))}
            </div>
          </FlexColStart>
        </>
      ) : (
        <>
          <FlexColStart className="w-full">
            <h1 className="text-white-100 text-2xl font-ppSB leading-none">
              {title}
            </h1>
            <p className="text-white-300 text-sm font-ppReg leading-none">
              {description}
            </p>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <FeatureCard
                  key={i}
                  title={f.title}
                  description={f.description}
                />
              ))}
            </div>
          </FlexColStart>
          <FlexColStart className="w-full">
            {typeof thumbnail === "string" ? (
              <Image src={thumbnail} width={900} height={0} alt="image" />
            ) : (
              <div className="relative">
                {thumbnail.map((img, i) => (
                  <Image
                    src={img}
                    width={i === 0 ? 900 : 400}
                    height={0}
                    alt="image"
                    className={cn(
                      "rounded-lg",
                      i === 1
                        ? "absolute bottom-[-3em] right-2 drop-shadow-2xl border-[.5px] border-white-300/30 shadow-dark-100 "
                        : ""
                    )}
                  />
                ))}
              </div>
            )}
          </FlexColStart>
        </>
      )}
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <FlexColStart className="w-full md:max-w-[300px] px-3 py-2 rounded-md border-[1px] border-white-300/30 ">
      <CheckCheck size={20} className="text-orange-100" />
      <h1 className="font-ppSB text-white-100 text-1xl leading-none">
        {title}
      </h1>
      <p className="font-ppReg text-white-300 text-xs">{description}</p>
    </FlexColStart>
  );
}
