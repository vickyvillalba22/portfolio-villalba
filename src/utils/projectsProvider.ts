import { ref, provide, Ref } from "vue";
import projects from "../data/projects.json";
import type { Project } from "../types/project";

export function useProjectsProvider() {

  // tipado de la ref
  const projectData: Ref<Project[]> = ref(projects);

  // Tipado de la key del provide (opcional)
  provide<Ref<Project[]>>("projects", projectData);

  return {
    projectData
  };
}