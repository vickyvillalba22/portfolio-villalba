// Esto evita errores al importar SFCs.
// <reference types="vite/client" />


declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}