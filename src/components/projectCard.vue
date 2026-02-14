<script setup lang="ts">

import { inject, computed, ref, type Ref } from "vue";
import type { Project } from '../types/project'
import { Icon } from "@iconify/vue";

import { currentUser } from '@/utils/session'
import { saveSession } from '@/utils/session'

// props tipadas
const props = defineProps({
  projectId: {
    type: Number,
    required: true
  }
});

// inject tipado
const projects = inject<Ref<Project[]>>("projects");
if (!projects) {
  throw new Error("Projects provider not found");
}

// Obtenemos el proyecto correspondiente
const project = computed<Project | undefined>(() => {
  return projects.value.find((p) => p.id === props.projectId);
});

//rol y likeado
const isUser = computed(() => currentUser.value?.role === 'user')

const isLiked = computed(() =>
  currentUser.value?.likedPosts.includes(project.value!.id)
)

//toggle like
const toggleLike = () => {
  if (!currentUser.value) return

  const index = currentUser.value.likedPosts.indexOf(project.value!.id)

  if (index >= 0) {
    currentUser.value.likedPosts.splice(index, 1)
  } else {
    currentUser.value.likedPosts.push(project.value!.id)
  }

  saveSession(currentUser.value)
}


//estado card
const isExpanded = ref(false)
function toggleCard (){
  isExpanded.value = !isExpanded.value
}

</script>

<template>

  <!--card 1-->
  <article v-if="project" class="card-simple font-modo-oscuro" :class="{ expanded: isExpanded }">

    <!-- Imagen y etiquetas -->
    <div class="card-img-container">
      <img :src="`/imgs-projects/${project.id}.png`" :alt="project.titulo" />
      <h4 class="label-simple posAb">{{ project.categoria }}</h4>
      <span class="year posAb">{{ project.year }}</span>

      <!--like-->
      <button
        v-if="isUser"
        class="like-btn"
        @click.stop="toggleLike"
      >
        <Icon
          :icon="isLiked ? 'mdi:heart' : 'mdi:heart-outline'"
          class="heart"
        />
      </button>

    </div>

    <!--contenido general-->

    <div class="card-info">

      <!-- Botón cerrar (solo cuando está expandida) -->
      <div class="contBoton">
        <button v-if="isExpanded" @click="toggleCard" class="botonSimple">
          <Icon icon="hugeicons:cancel-01" class="i-mob" />
        </button>
      </div>

      <h2>{{ project.titulo }}</h2>

      <!-- Contenido extra solo al expandirse -->
      <div v-if="isExpanded" class="extra-content">

        <p class="description">
          {{ project.descripcionLarga }}
        </p>

        <ul class="tools">
          <li v-for="herr in project.herramientas" :key="herr" class="label-simple">
            {{ herr }}
          </li>
        </ul>

        <div class="contBoton">
          <a class="goto-link" :href="project.linkPrincipal" target="_blank">
            Go to project
          </a>
        </div>


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
  width: 100%;
  height: 18vh;
  display: flex;
  flex-direction: row;
  position: relative;

  gap: 1rem;
  padding: 16px;
  border-radius: 10px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  position: relative;

  transition: all .35s ease;
  transition: width 0.5s ease, height 0.5s ease, flex-direction 0.3s ease;
}

.i-mob{
  width: 20px;
  height: 20px;
}

/* Imagen */
.card-img-container {
    flex: 1.7;
  max-height: 15vh;
  position: relative;
}

.card-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  filter: brightness(0.4);
}

.posAb{
  position: absolute;
}

/* Tag + año */
.label-simple,
.year {
  right: 8%;
  font-size: .8em;
}
.label-simple {
  top: 8%;
  background: var(--blanco);
  color: var(--negro);
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 0.7em;
}
.year {
  bottom: 8%;
  color: var(--blanco);
}

/* Info */
.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-info h2 {
  font-size: 1em;
  width: 50%;
  position: absolute;
  font-weight: 300;
}

/* Extra content */
.extra-content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  gap: 10px;
  font-size: 0.8em;
}

.tools{
  display: flex;
  align-items: center;
  list-style: none;
  gap: 5px;
}

.goto-link {
  margin-top: auto;
  font-size: 1em;
  color: var(--blanco);
  display: flex;
  gap: 5px;
}

/* Botón ver más */
.contBoton {
  display: flex;
  justify-content: flex-end;
  align-self: end;
}

button {
  border: none;
  display: flex;
  height: fit-content;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.8em;
}
.botonSimple{
  background-color: #ffffff00;
  color: var(--blanco);
  padding: 0;
}

i{
  display: flex;
  font-size: 1.4em;
}

/*expanded*/
.card-simple.expanded{
  width: 100%;
  height: 50vh;
  flex-direction: column;
}
.botonSimple{
  position: absolute;
  left: 9%;
  top: 8%;
}
.card-simple.expanded h2{
  width: 90%;
  font-size: 1.1em;
}
.card-simple.expanded p{
  margin-top: 10px;
}
.card-simple.expanded .card-img-container{
  flex: 0.5;
  max-height: 20vh;
}
.card-simple.expanded .label-simple, .year{
  right: 5%;
}

/*LIKE*/
.like-btn {
  position: absolute;
  top: 5%;
  left: 5%;
  background: transparent;
  border: none;
  cursor: pointer;
}
.card-simple.expanded .like-btn{
  left: 3%;
  top: 75%;
}

.card-simple.expanded .like-btn .heart{
  width: 20px;
  height: 20px;
}

.heart {
  color: #ff4d6d;
  width: 18px;
  height: 18px;
}

@media (min-width: 920px){

.card-simple{
  width: 100%;
  height: 100%;
  transition:
    transform 0.4s cubic-bezier(.25,.8,.25,1),
    opacity 0.3s ease,
    box-shadow 0.3s ease;
}

.card-simple.expanded{
  grid-row: span 2;
  height: 100%;
  flex-direction: row;
  transform: scale(1.02);
  z-index: 2;
}

.card-simple.expanded .card-img-container{
  max-height: 40vh;
}

.card-simple.expanded .label-simple, .year{
  right: 10%;
}

.card-simple.expanded .label-simple{
  top: 72%;
}

.botonSimple{
  position: absolute;
  left: 6%;
  top: 8%;
}

.card-simple.expanded h2{
  width: 60%;
  font-size: 1.3em;
  position: relative;
}

.card-simple.expanded .card-info {
  height: 100%;
  justify-content: space-between;
  gap: 0;
}

.extra-content {
  height: 70%;
}

}

@media (min-width: 700px){
  .card-simple.expanded{
    grid-row: span 2;
    height: 100%;
    flex-direction: row;
    z-index: 2;
  }
  .card-simple.expanded .card-img-container{
    max-height: 40vh;
  }
  .card-simple.expanded .label-simple{
    top: 72%;
  }
  .card-simple.expanded h2{
    width: 80%;
    position: relative;
    font-size: 1em;
  }
  .card-info{
    gap: 0;
  }
}


</style>