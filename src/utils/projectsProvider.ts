import { ref, provide, Ref, onMounted } from "vue";
import { cargarProyectos } from '../utils/fetchData'
import type { Project } from "../types/project";

export function useProjectsProvider() {

  // tipado de la ref
  const projectData: Ref<Project[]> = ref([]);

  // llamamos una funcion async porque cargarProyectos como es async devuelve una promesa
  onMounted(async ()=>{
    projectData.value = await cargarProyectos();
  })

  // Tipado de la key del provide (opcional)
  provide<Ref<Project[]>>("projects", projectData);

  return {
    projectData
  };
}