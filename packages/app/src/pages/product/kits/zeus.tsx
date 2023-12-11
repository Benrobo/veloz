import { FlexColCenter, FlexColStart } from "@/components/Flex";
import Footer from "@/components/Footer";
import KitHeader from "@/components/Header/KitHeader";
import { KitsLayout } from "@/components/Layout";
import HomeTopBar from "@/components/Navbar/HomeTopBar";
import Seo from "@/components/Seo";
import Pricing from "@/components/StarterKits/Pricing";
import React from "react";

function ZeusKit() {
  return (
    <KitsLayout>
      <Seo
        title="Zeus kit"
        description="Zeus - Nextjs starter kit"
        image="https://9d5f-102-89-44-177.ngrok-free.app/images/templates/thumbnails/zeus.svg"
      />
      <HomeTopBar />
      <KitHeader name="zeus" />
      <FlexColCenter className="w-full bg-dark-200 py-9">
        <h1 className="text-white-400 font-ppEB">More Details Soon!!</h1>
      </FlexColCenter>
      <br />
      <Pricing name="zeus" />
      <Footer />
    </KitsLayout>
  );
}

export default ZeusKit;
