import { FlexColCenter, FlexColStart } from "@/components/Flex";
import KitHeader from "@/components/Header/KitHeader";
import { KitsLayout } from "@/components/Layout";
import HomeTopBar from "@/components/Navbar/HomeTopBar";
import Pricing from "@/components/StarterKits/Pricing";
import React from "react";

function ZeusKit() {
  return (
    <KitsLayout>
      <HomeTopBar />
      <KitHeader name="zeus" />

      <FlexColCenter className="w-full bg-dark-200 py-9">
        <h1 className="text-white-400 font-ppEB">More Details Soon!!</h1>
      </FlexColCenter>
      <br />
      <Pricing name="zeus" />
    </KitsLayout>
  );
}

export default ZeusKit;
