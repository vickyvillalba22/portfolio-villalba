<script setup>
import { inject, computed, ref } from "vue";

const props = defineProps({
  projectId: {
    type: Number,
    required: true
  }
});

// Recibimos la lista de proyectos desde App.vue
const projects = inject("projects");

// Obtenemos el proyecto correspondiente
const project = computed(() => {
  return projects.value.find((p) => p.id === props.projectId);
});

//estado card
const isExpanded = ref(false)

function toggleCard (){
  isExpanded.value = !isExpanded.value
}

</script>

<template>

  <!--card 1-->
  <article class="card-simple font-modo-oscuro" :class="{ expanded: isExpanded }">

    <!-- Imagen y etiquetas -->
    <div class="card-img-container">
      <img :src="project.imagen" :alt="project.title" />
      <h4 class="label-simple">{{ project.categoria }}</h4>
      <span class="year">{{ project.year }}</span>
    </div>

    <!--contenido general-->

    <div class="card-info">

      <!-- Botón cerrar (solo cuando está expandida) -->
      <div class="contBoton">
        <button v-if="isExpanded" @click="toggleCard" class="btn-close">
          Cerrar
        </button>
      </div>

      <h2>{{ project.titulo }}</h2>

      <!-- Contenido extra SOLO al expandirse -->
      <div v-if="isExpanded" class="extra-content">
        <p class="description">
          {{ project.descripcionLarga }}
        </p>

        <ul class="tools">
          <li v-for="herr in project.herramientas" :key="herr">
            {{ herr }}
          </li>
        </ul>

        <a class="goto-link" href="project.linkPrincipal" target="_blank">
          Go to project
          <i class="fi fi-tr-arrow-small-right"></i>
        </a>
      </div>

    </div>
    
    <!-- Botón See more (solo cuando NO está expandida) -->
    <div class="contBoton" v-if="!isExpanded">
      <button @click="toggleCard">
        <p>See more</p>
        <i class="fi fi-tr-arrow-small-right"></i>
      </button>
    </div>

  </article>

</template>

<style scoped>

.card-simple {

  height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 16px;
  border-radius: 10px;
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  position: relative;
  transition: all .35s ease;
}

/* EXPANDIDA → ocupa 2 columnas y se hace horizontal */
.card-simple.expanded {
  grid-column: span 2;
  flex-direction: row;
}

/* Imagen */
.card-img-container {
  flex: 1;
  position: relative;
}

.card-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  filter: brightness(0.7);
}

/* Tag + año */
.label-simple,
.year {
  position: absolute;
  right: 8%;
  font-size: .8em;
}
.label-simple {
  top: 8%;
  background: white;
  color: black;
  padding: 3px 10px;
  border-radius: 15px;
}
.year {
  bottom: 8%;
  color: #ffffff;
}

/* Info */
.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .8rem;
}

.card-info h2 {
  font-size: 1.2em;
  font-weight: 300;
}

/* Extra content */
.extra-content {
  display: flex;
  flex-direction: column;
  gap: .6rem;
}

.tools {
  padding-left: 18px;
  font-size: .9em;
  opacity: .8;
}

.goto-link {
  margin-top: auto;
  font-size: .9em;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Botón ver más */
.contBoton {
  display: flex;
  justify-content: flex-end;
}

button {
  border: none;
  display: flex;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 16px;
  cursor: pointer;
}

i{
  display: flex;
  font-size: 1.4em;
}




</style>