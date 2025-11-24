import { ref, provide } from "vue";
import projects from "../data/projects.json";

export function useProjectsProvider() {

  const projectData = ref(projects);

  provide("projects", projectData);

  return {
    projectData
  };
  
}