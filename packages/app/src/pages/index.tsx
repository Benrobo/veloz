import Features from "@/components/Features";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
} from "@/components/Flex";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import HomeTopBar from "@/components/Navbar/HomeTopBar";
import Why from "@/components/Why";
import useScrollVisible from "@/hooks/useScrollVisible";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const scrollVisible = useScrollVisible();

  return (
    <FlexColStart className="w-full h-screen min-h-screen overflow-y-scroll bg-dark-105 scroll-smooth">
      <HomeTopBar scrollVisible={scrollVisible} />
      <Header />
      <Why />
      <Features />
    </FlexColStart>
  );
}
