import BlurBgRadial from "@/components/BlurBgRadial";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
} from "@/components/Flex";
import Footer from "@/components/Footer";
import KitHeader from "@/components/Header/KitHeader";
import { KitsLayout } from "@/components/Layout";
import HomeTopBar from "@/components/Navbar/HomeTopBar";
import Seo from "@/components/Seo";
import Pricing from "@/components/StarterKits/Pricing";
import SideBySideFeatures from "@/components/StarterKits/SideBySideFeatures";
import Head from "next/head";
import React from "react";

function ZeusKit() {
  return (
    <KitsLayout>
      <Seo
        title="Zeus kit"
        description="Zeus - Nextjs starter kit"
        image="https://tryveloz.com/images/og/zeus.png"
      />
      <HomeTopBar />
      <KitHeader name="zeus" />
      <FlexColCenter className="relative w-full bg-dark-100 py-9 gap-[10em] pb-[10em]">
        <BlurBgRadial className=" w-[100%] lg:w-[60%] h-[300px] absolute top-[10%] lg:top-[-10%] bg-white-300/10" />

        <SideBySideFeatures
          title="Authentication"
          description="Zeus authentication / authorization is handled specifically by NextAuth."
          thumbnail="/images/screenshots/scr5.png"
          features={[
            {
              title: "Own your data",
              description:
                "All users data is stored in your database, giving you full control.",
            },
            {
              title: "OAuth",
              description:
                "Zeus supports OAuth providers like Googlea and Github. You can also add your own OAuth provider.",
            },
            {
              title: "Email / Password",
              description:
                "Zeus enables your customers easily sign up with their email and password.",
            },
            {
              title: "Auth Components",
              description:
                "Each authentication meathods are set of reusable components which can be customized to your preferrence.",
            },
          ]}
        />

        <SideBySideFeatures
          title="Billing & Subscriptions"
          description="Zeus makes it easy for your customers to get billded and manage their subscriptions using lemonsqueezy as default payment provider. "
          direction="rtl"
          thumbnail="/images/screenshots/scr8.png"
          features={[
            {
              title: "Billing Portal",
              description:
                "Zeus makes it easy for your customers to manage their subscriptions and billing information using lemonsqueezy secure billing portal.",
            },
          ]}
        />

        <SideBySideFeatures
          title="Pricing"
          description="Appealing and intuitive pricing table to help your customers choose the right plan for them."
          direction="ltr"
          thumbnail="/images/screenshots/scr3.png"
          features={[
            {
              title: "Pricing Table",
              description:
                "Zeus provide a reusable pricing components which automatically get generated within the configuration provided..",
            },
          ]}
        />

        <SideBySideFeatures
          title="Waitlist"
          description="Reusable waitlist component and page."
          direction="rtl"
          thumbnail={[
            "/images/screenshots/scr7.png",
            "/images/screenshots/scr9.png",
          ]}
          features={[
            {
              title: "Waitlist Component",
              description:
                "Zeus provides reusable and customizable waitlist component and page to collect leads if your SaaS isn't ready for lunch.",
            },
            {
              title: "Manage Waitlist",
              description:
                "Zeus provides a section on the dashboard to manage your waitlist and export leads as CSV.",
            },
          ]}
        />

        <BlurBgRadial className="w-[60%] absolute opacity-1 bottom-[-40%] bg-white-400/25 blur-[250px]" />
      </FlexColCenter>
      <br />
      <Pricing name="zeus" />
      <Footer />
    </KitsLayout>
  );
}

export default ZeusKit;
