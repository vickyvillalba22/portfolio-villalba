<script setup>

import { useProjectsProvider } from './utils/projectsProvider'

useProjectsProvider()

import Header from './components/header.vue';

</script>

<template>
  <Header />
  <router-view />
</template>


<!--estilos generales-->
<style>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: sans-serif;
}

.bordeRojo{
  border: 1px solid red;
}

/*texto*/
@font-face {
  font-family: 'creatoDisplay'; /* Nombre que le darás a la fuente */
  src: url('./assets/font/creato_display/CreatoDisplay-Regular.otf'); /* Ruta y formato del archivo */
}
h1,h2,h3,h4,p,button,span,input,a{
    font-family: "creatoDisplay", 'openSans';
}


body{
  /*background-image: url('/public/imgs/background 1.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;*/

  background: linear-gradient(to bottom, #000000 0%, #3a0066 50%, #8a2be2 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;

  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

.font-modo-oscuro{
  color: rgb(248, 248, 248);
}

</style>
