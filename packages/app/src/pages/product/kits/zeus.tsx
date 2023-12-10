import { FlexColStart } from "@/components/Flex";
import KitHeader from "@/components/Header/KitHeader";
import { KitsLayout } from "@/components/Layout";
import HomeTopBar from "@/components/Navbar/HomeTopBar";
import React from "react";

function ZeusKit() {
  return (
    <KitsLayout>
      <HomeTopBar />
      <KitHeader name="zeus" />
    </KitsLayout>
  );
}

export default ZeusKit;
