import * as React from "react";
import { createContext, ReactNode } from "react";
import {
  CodebaseArchitectureMap,
  ProjectSideBarConfigKeysType,
  ProjectType,
} from "../../types";

interface ContextValuesType {
  projDetails: { name: string; description: string };
  setProjDetails: (projDetails: { name: string; description: string }) => void;
  projType: ProjectType | undefined;
  setProjType: (projType: ProjectType | undefined) => void;
  selectedStacks: CodebaseArchitectureMap;
  setSelectedStacks: (selectedStacks: CodebaseArchitectureMap) => void;
  selectedSecretId: string | any;
  setSelectedSecretId: (selectedSecretId: string | any) => void;
  activeSection: ProjectSideBarConfigKeysType;
  setActiveSection: (activeSection: ProjectSideBarConfigKeysType) => void;
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
