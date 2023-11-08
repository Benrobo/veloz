import * as React from "react";
import { createContext, ReactNode } from "react";
import {
  CodebaseArchitectureMap,
  FineTunedStacksName,
  ProjectSideBarConfigKeysType,
  ProjectType,
  VelozProjectOption,
} from "@veloz/shared/types";

interface ContextValuesType {
  projectOptions: VelozProjectOption;
  setProjectOptions: React.Dispatch<React.SetStateAction<VelozProjectOption>>;
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
  selectedFinetunedStack: FineTunedStacksName;
  setSelectedFinetunedStack: React.Dispatch<
    React.SetStateAction<FineTunedStacksName>
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
  const [projectOptions, setProjectOptions] =
    React.useState<VelozProjectOption>("Refined");

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

  const [selectedFinetunedStack, setSelectedFinetunedStack] =
    React.useState<FineTunedStacksName>("" as any);

  const [selectedSecretId, setSelectedSecretId] = React.useState<string | any>(
    ""
  );

  React.useEffect(() => {
    console.log(selectedStacks);
  }, [selectedStacks]);

  const contextValues: ContextValuesType = {
    projectOptions,
    setProjectOptions,
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
    selectedFinetunedStack,
    setSelectedFinetunedStack,
  };

  return (
    <ProjectContext.Provider value={contextValues}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
