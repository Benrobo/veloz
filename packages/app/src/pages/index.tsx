import Features from "@/components/Landing/Features";
import { FlexColStart } from "@/components/Flex";
import Header from "@/components/Header";
import HomeTopBar from "@/components/Navbar/HomeTopBar";
import useScrollVisible from "@/hooks/useScrollVisible";
import Overview from "@/components/Landing/Overview";
import StarterKits from "@/components/Landing/StarterKit";
import TemplateSection from "@/components/Landing/Template";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import FAQ from "@/components/FAQ";

export default function Home() {
  const scrollVisible = useScrollVisible();

  return (
    <FlexColStart className="w-full h-screen min-h-screen gap-0 overflow-y-scroll hideScrollBar bg-dark-103 scroll-smooth">
      <Seo />
      <HomeTopBar scrollVisible={scrollVisible} />
      <Header />
      <Features />
      <Overview />
      <StarterKits />
      <TemplateSection />
      <FAQ />
      <Footer />
    </FlexColStart>
  );
}
