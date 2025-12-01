import type { Project } from '../types/project'

export async function cargarProyectos(): Promise<Project[]> {
    try{
        const response = await fetch('/public/data/projects.json');
        const data: Project[] = await response.json();
        console.log(data);
        return data
    } catch (error){
        console.log("error al traer datos de json:", error);
        return [] //para que no devuelva undefined
    }
}