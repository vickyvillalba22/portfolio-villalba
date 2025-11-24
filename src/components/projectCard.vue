<script setup>
import { inject, computed } from "vue";

const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
});

// Recibimos la lista de proyectos desde App.vue
const projects = inject("projects");

// Obtenemos el proyecto correspondiente
const project = computed(() => {
  return projects.value.find((p) => p.id === props.projectId);
});

</script>

<template>
  <article class="card font-modo-oscuro">
    <img :src="project.image" :alt="project.title" />
    <h2>{{ project.title }}</h2>
  </article>
</template>

<style scoped>

.card{
    width: 15vw;
    height: 30vh;

    display: flex;
    flex-direction: column;
    gap: 15px;

    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);

    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);

    /* Para que parezca más vidrio */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    border-radius: 10px;
    padding: 10px;
}

.card img{
    height: 70%;
    object-fit: cover;
    border-radius: 10px;
}

.card h2{
    font-size: 1.1em;
    font-weight: 300;
}

</style>