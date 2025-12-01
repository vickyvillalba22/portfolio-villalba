export interface Project {
  id: number;
  titulo: string;
  categoria: string;
  descripcionCorta: string;
  descripcionLarga: string;
  herramientas: string[];
  linkPrincipal: string;
  linkSecundario: string;
  year: number;
  materia: string | null;
  imagen: string;
  mostrar: boolean;
}