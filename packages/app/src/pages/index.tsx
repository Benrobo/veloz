import { FlexColCenter } from "@/components/Flex";
import Layout from "@/components/Layout";
import Image from "next/image";

export default function Home() {
  return (
    <FlexColCenter className="w-full h-screen bg-dark-200">
      <p className="text-white-100 font-ppSB">Home Page</p>
    </FlexColCenter>
  );
}
