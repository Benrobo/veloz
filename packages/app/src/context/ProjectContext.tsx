import * as React from "react";
import { createContext, ReactNode } from "react";
import {
  CodebaseArchitectureMap,
  ProjectSideBarConfigKeysType,
  ProjectType,
} from "../../types";

interface ContextValuesType {
  projDetails: { name: string; description: string };
  setProjDetails: React.Dispatch<
    React.SetStateAction<{ name: string; description: string }>
  >;
  projType: ProjectType | undefined;
  setProjType: React.Dispatch<React.SetStateAction<ProjectType | undefined>>;
  selectedStacks: CodebaseArchitectureMap;
  setSelectedStacks: React.Dispatch<
    React.SetStateAction<CodebaseArchitectureMap>
  >;
  selectedSecretId: string | any;
  setSelectedSecretId: React.Dispatch<React.SetStateAction<string | any>>;
  activeSection: ProjectSideBarConfigKeysType;
  setActiveSection: React.Dispatch<
    React.SetStateAction<ProjectSideBarConfigKeysType>
  >;
}

export const ProjectContext = createContext<ContextValuesType>(
  {} as ContextValuesType
);

interface ProjectContextProviderProps {
  children: ReactNode;
}

function ProjectContextProvider({ children }: ProjectContextProviderProps) {
  // PROJECT DETAILS
  const [projDetails, setProjDetails] = React.useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });
  // TECH STACKS
  const [activeSection, setActiveSection] =
    React.useState<ProjectSideBarConfigKeysType>("details");
  const [projType, setProjType] = React.useState<ProjectType>();
  const [selectedStacks, setSelectedStacks] =
    React.useState<CodebaseArchitectureMap>({} as CodebaseArchitectureMap);

  const [selectedSecretId, setSelectedSecretId] = React.useState<string | any>(
    ""
  );

  React.useEffect(() => {
    console.log(selectedStacks);
  }, [selectedStacks]);

  const contextValues: ContextValuesType = {
    projDetails,
    setProjDetails,
    projType,
    setProjType,
    selectedStacks,
    setSelectedStacks,
    selectedSecretId,
    setSelectedSecretId,
    activeSection,
    setActiveSection,
  };

  return (
    <ProjectContext.Provider value={contextValues}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
