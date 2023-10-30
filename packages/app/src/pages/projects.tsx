import Layout from "@/components/Layout";
import ProjectCard, { ProjectType } from "@/components/Projects/Card";
import Slidebar from "@/components/Projects/Slidebar";
import { Button } from "@/components/ui/button";
import { projectTempData } from "@/data/project";
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
          <Button variant="primary">Create Project</Button>
        </div>
      </div>
      <br />
      <div className="w-full px-3 py-3 flex flex-wrap items-center justify-start gap-3">
        {projectTempData.map((d) => (
          <ProjectCard
            name={d.name}
            description={d.description}
            label={d.label as ProjectType}
            id={d.id}
          />
        ))}
      </div>

      {/* project slide modal */}
      <Slidebar />
    </Layout>
  );
}

export default Projects;
