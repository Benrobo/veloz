import Layout from "@/components/Layout";
import ProjectCard from "@/components/Projects/Card";
import Slidebar from "@/components/Projects/Slidebar";
import { Button } from "@/components/ui/button";
import { withAuth } from "@/lib/helpers";
import { Flash } from "iconsax-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ProjectType } from "@veloz/shared/types";
import { ProjectListType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/http/requests";
import { FlexColStart } from "@/components/Flex";

function Projects() {
  const [projects, setProjects] = useState<ProjectListType[]>([]);
  const [slideBarOpen, setSlideBarOpen] = useState(false);
  const [selectedProjId, setSelectedProjId] = useState<any>("");
  const [selectedProject, setSelectedProject] =
    useState<ProjectListType | null>(null);
  const getProjectsQuery = useQuery({
    queryFn: async () => getProjects(),
    queryKey: ["getProjects"],
  });

  useEffect(() => {
    if (getProjectsQuery.data) {
      const data = getProjectsQuery.data.data as ProjectListType[];
      setProjects(data);
    }
  }, [
    getProjectsQuery.data,
    getProjectsQuery.error,
    getProjectsQuery.isLoading,
  ]);

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
        {projects.length > 0 ? (
          projects.map((d) => (
            <ProjectCard
              key={d._id}
              name={d.name}
              description={d.description}
              status={d.status}
              label={d.label as ProjectType}
              id={d._id}
              onClick={() => {
                const proj = projects.find(
                  (p) => p._id === d._id
                ) as ProjectListType;
                setSelectedProject(proj);
                setSelectedProjId(d._id);
                setSlideBarOpen(true);
              }}
            />
          ))
        ) : (
          <FlexColStart className="w-full h-full flex items-center justify-center">
            <p className="text-white-200 text-[14px] font-jbSB ">No Projects</p>
            <p className="text-white-200 font-jbR text-[12px] ">
              Start by creating your first veloz project.
            </p>
          </FlexColStart>
        )}
      </div>

      {/* */}
      <Slidebar
        onClose={toggleSlideBar}
        proj_id={selectedProjId}
        selectedProject={selectedProject as ProjectListType}
        isOpen={slideBarOpen}
      />
    </Layout>
  );
}

export default withAuth(Projects);
