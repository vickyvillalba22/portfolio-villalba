import type { Project } from '../types/project'

export async function cargarProyectos(): Promise<Project[]> {
    try{

        //comun
        /*const response = await fetch('/public/data/projects.json');*/

        //con delay
        const [response] = await Promise.all([
            fetch('/data/projects.json'),
            new Promise(resolve => setTimeout(resolve, 2000))
        ]);
        const data: Project[] = await response.json();
        console.log(data);
        return data
    } catch (error){
        console.log("error al traer datos de json:", error);
        return [] //para que no devuelva undefined
    }
}