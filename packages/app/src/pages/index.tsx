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
import StarterKits from "@/components/Landing/StarterKit";
import TemplateSection from "@/components/Landing/Template";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import FAQ from "@/components/FAQ";
import MiniMenu from "@/components/Navbar/MiniMenu";

export default function Home() {
  const scrollVisible = useScrollVisible();

  return (
    <FlexColStart className="w-full h-screen min-h-screen gap-0 overflow-y-scroll hideScrollBar bg-dark-103 scroll-smooth">
      <MiniMenu />
      <Seo
        title="Veloz"
        description="A simple, fast, and reliable starter kit for your SaaS project."
      />
      <HomeTopBar scrollVisible={scrollVisible} />
      <Header />
      {/* <Why /> */}
      <Features />
      <Overview />
      <StarterKits />
      <TemplateSection />
      <FAQ />
      <Footer />
    </FlexColStart>
  );
}
