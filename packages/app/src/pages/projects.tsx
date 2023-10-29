import Layout from "@/components/Layout";
import ProjectCard from "@/components/Projects/card";
import { Button } from "@/components/ui/button";
import { Flash } from "iconsax-react";
import React from "react";

function Projects() {
  return (
    <Layout activePage="projects">
      <div className="w-full h-auto py-3 px-3 flex items-center justify-between border-b-solid border-b-white-600 border-b-[1px] ">
        <div className="left flex items-center justify-center gap-2">
          <Flash variant="Broken" size="25" color="#FF8A65" />
          <p className="text-white-100 font-ppSB text-[18px] ">Projects</p>
        </div>
        <div className="right flex items-center justify-center gap-2">
          <Button variant="destructive">Create Project</Button>
        </div>
      </div>
      <br />
      <div className="w-full px-3 py-3 flex flex-wrap items-center justify-start gap-3">
        <ProjectCard
          name="Event App"
          description="Source code for event app"
          label="Vortex"
          id="dscsc"
        />
        <ProjectCard
          name="Saas 2"
          description="Source code for my saas app"
          label="Nebula"
          id="dscsc"
        />
        <ProjectCard
          name="Saas 2.0"
          description="Source code for my saas 2.0 app"
          label="Odyssey"
          id="dscsc"
        />
      </div>
    </Layout>
  );
}

export default Projects;
