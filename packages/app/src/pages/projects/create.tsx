import React from "react";
import Layout from "@/components/Layout";
import {
  FlexRowCenter,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import { ArrowLeftToLine } from "lucide-react";
import Link from "next/link";

function CreateProject() {
  return (
    <Layout activePage="projects">
      <div className="w-full h-[100vh] relative">
        <Link href="/projects" className="underline">
          <FlexRowStartCenter className="w-auto px-3 py-7 group ">
            <ArrowLeftToLine
              size={15}
              className="text-white-300 group-hover:text-white-100 transition-all"
            />
            <span className="text-white-300 group-hover:text-white-100 text-[12px] transition-all font-ppSB">
              Back
            </span>
          </FlexRowStartCenter>
        </Link>
      </div>
    </Layout>
  );
}

export default CreateProject;
