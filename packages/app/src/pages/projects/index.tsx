import Layout from "@/components/Layout";
import ProjectCard from "@/components/Projects/Card";
import Slidebar from "@/components/Projects/Slidebar";
import { Button } from "@/components/ui/button";
import { projectTempData } from "@/data/project";
import { withAuth } from "@/lib/helpers";
import { Flash } from "iconsax-react";
import Link from "next/link";
import React, { useState } from "react";
import { ProjectType } from "@veloz/shared/types";

function Projects() {
  const [slideBarOpen, setSlideBarOpen] = useState(false);
  const [selectedProjId, setSelectedProjId] = useState<any>("");

  const toggleSlideBar = () => setSlideBarOpen(!slideBarOpen);

  return (
    <Layout activePage="projects">
      <div className="w-full h-auto py-3 px-3 flex items-center justify-between border-b-solid border-b-white-600 border-b-[1px] ">
        <div className="left flex items-center justify-center gap-2">
          <Flash variant="Broken" size="25" color="#FF8A65" />
          <p className="text-white-100 font-ppSB text-[18px] ">Projects</p>
        </div>
        <div className="right flex items-center justify-center gap-2">
          <Link href={"/projects/create"}>
            <Button variant="primary">Create Project</Button>
          </Link>
        </div>
      </div>
      <br />
      <div className="w-full px-3 py-3 flex flex-wrap items-center justify-start gap-3">
        {projectTempData.map((d) => (
          <ProjectCard
            key={d.id}
            name={d.name}
            description={d.description}
            status={d.status}
            label={d.label as ProjectType}
            id={d.id}
            onClick={() => {
              setSelectedProjId(d.id);
              setSlideBarOpen(true);
            }}
          />
        ))}
      </div>

      {/* */}
      <Slidebar
        onClose={toggleSlideBar}
        proj_id={selectedProjId}
        projects={projectTempData}
        isOpen={slideBarOpen}
      />
    </Layout>
  );
}

export default withAuth(Projects);
