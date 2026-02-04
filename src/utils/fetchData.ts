import { Project } from '../types/project'

export async function cargarProyectos(): Promise<Project[]> {
    try{

        //comun
        /*const response = await fetch('/public/data/projects.json');*/

        //con delay
        const [response] = await Promise.all([
            fetch('/data/projects.json'),
            new Promise(resolve => setTimeout(resolve, 2000))
        ]);

        const data = await response.json()

        return data.map(
            (p: any) =>
                new Project(
                p.id,
                p.titulo,
                p.categoria,
                p.descripcionCorta,
                p.descripcionLarga,
                p.herramientas,
                p.linkPrincipal,
                p.linkSecundario,
                p.year,
                p.materia,
                p.imagen,
                p.mostrar
                )
            )

    } catch (error){

        console.log("error al traer datos de json:", error);
        return [] //para que no devuelva undefined

    }
}