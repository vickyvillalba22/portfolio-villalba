import { ref, provide, Ref, onMounted } from "vue";
import { cargarProyectos } from '../utils/fetchData'
import type { Project } from "../types/project";

export function useProjectsProvider() {

  // tipado de la ref de los datos y del estado del loader
  const projectData: Ref<Project[]> = ref([]);
  const isLoading: Ref<boolean> = ref(true)

  // llamamos una funcion async porque cargarProyectos como es async devuelve una promesa
  onMounted(async ()=>{
    try{
      projectData.value = await cargarProyectos();
    } finally {
      isLoading.value = false
    }
    
  })

  // Tipado de la key del provide (opcional)
  provide<Ref<Project[]>>("projects", projectData);
  provide<Ref<boolean>>("isLoading", isLoading);

  return {
    projectData,
    isLoading
  };
}