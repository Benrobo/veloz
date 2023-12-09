import Features from "@/components/Landing/Features";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
} from "@/components/Flex";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import HomeTopBar from "@/components/Navbar/HomeTopBar";
import Why from "@/components/Landing/Why";
import useScrollVisible from "@/hooks/useScrollVisible";
import Overview from "@/components/Landing/Overview";
import Pricing from "@/components/Landing/Pricing";

export default function Home() {
  const scrollVisible = useScrollVisible();

  return (
    <FlexColStart className="w-full h-screen min-h-screen gap-0 overflow-y-scroll bg-dark-103 scroll-smooth">
      <HomeTopBar scrollVisible={scrollVisible} />
      <Header />
      {/* <Why /> */}
      <Features />
      <Overview />
      <Pricing />
    </FlexColStart>
  );
}
