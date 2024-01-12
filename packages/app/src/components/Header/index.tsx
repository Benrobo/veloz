import React from "react";
import {
  FlexColCenter,
  FlexColStartCenter,
  FlexRowCenter,
  FlexRowCenterBtw,
} from "../Flex";
import BlurBgRadial from "../BlurBgRadial";
import Image from "next/image";

function Header() {
  const discordInviteLink = "https://discord.gg/d9Ywveuh25";
  return (
    <FlexColStartCenter className="relative w-full h-auto pattern-bg border-b-solid border-b-[1px] border-b-gray-100/30 ">
      <a id="home"></a>
      {/* Blur radius */}
      <BlurBgRadial className=" w-[100%] lg:w-[60%] h-[300px] absolute top-[10%] lg:top-[-10%] bg-white-300/10 " />

      <FlexColCenter className="relative w-full h-auto mt-[10em] text-center">
        <FlexRowCenter className="rainbowBorder mb-10 inline-flex items-center justify-center text-[14px] px-[2px] ">
          <span className="inline-flex items-center gap-1 whitespace-nowrap px-6 py-2 bg-dark-100 font-ppReg text-[12px] text-white-100">
            The last starter kit you'll ever need!.
          </span>
        </FlexRowCenter>
        <FlexColCenter className="w-auto md:max-w-[70%]">
          <h1 className=" text-4xl md:text-6xl text-white-100 mt-2 font-ppEB">
            Ship Your Product Faster.
          </h1>
          <p className="text-white-300 text-[12px] md:text-[14px] w-full px-6 md:0 md:max-w-[60%] font-ppReg">
            Accelerate your SaaS projects with Veloz. Effortlessly scaffold
            projects, choose your stack, and integrate services. Focus on
            <span className="font-ppEB ml-1">innovation</span>, not setup. Join
            Veloz for a swift SaaS evolution.
          </p>
          <br />
          <button
            className="w-auto px-5 py-3 rounded-[30px] border-solid border-[3px] border-blue-100 transition-all hover:scale-[1] scale-[.95] "
            onClick={() => window.open(discordInviteLink)}
          >
            <FlexRowCenterBtw className="w-full">
              <svg
                width="24"
                height="24"
                viewBox="0 -28.5 256 256"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
                className="fill-white-100 "
              >
                <g>
                  <path
                    d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                    // fill="white"
                    fillRule="nonzero"
                  ></path>
                </g>
              </svg>
              <span className="text-white-100 font-ppSB text-[12px] ">
                Join the community
              </span>
            </FlexRowCenterBtw>
          </button>
        </FlexColCenter>
      </FlexColCenter>
      <br />
      <FlexColCenter className="w-full h-full">
        <Image
          src={"/images/thumbnails/1.png"}
          width={0}
          height={0}
          className="w-[100%] rounded-md"
          alt="veloz starter kit"
        />
      </FlexColCenter>

      {/* bottom blur radius */}
      <BlurBgRadial className="w-[60%] absolute opacity-1 bottom-[-40%] bg-white-400/25 blur-[250px] " />
    </FlexColStartCenter>
  );
}

export default Header;
