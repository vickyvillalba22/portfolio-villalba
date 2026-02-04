export class Project {
  constructor(
    public id: number,
    public titulo: string,
    public categoria: string,
    public descripcionCorta: string,
    public descripcionLarga: string,
    public herramientas: string[],
    public linkPrincipal: string,
    public linkSecundario: string,
    public year: number,
    public materia: string,
    public imagen: string,
    public mostrar: boolean
  ) {}

  toggleVisibility() {
    this.mostrar = !this.mostrar
  }

  updateTitle(title: string) {
    this.titulo = title
  }
}
