<script setup lang="ts">
import { inject, computed, type Ref } from 'vue'
import type { Project } from '@/types/project'
import ProjectCard from '@/components/projectCard.vue'
import { currentUser } from '@/utils/session';


const projects = inject<Ref<Project[]>>('projects')
if (!projects) throw new Error('Projects not found')

const likedProjects = computed(() =>
  projects.value.filter(p =>
    currentUser.value?.likedPosts.includes(p.id)
  )
)

</script>

<template>

  <section class="sectionDesktop">

    <h3>Liked projects</h3>

    <p v-if="likedProjects.length === 0">
      Todavía no diste like a ningún proyecto :(. 
    </p>

    <transition-group
      name="slide-left"
      tag="div"
      appear
      class="contProjects"
    >
      <ProjectCard
        v-for="proj in likedProjects"
        :key="proj.id"
        :projectId="proj.id"
      />
    </transition-group>

  </section>

</template>


<style scoped>

section{
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.contProjects{
    display: flex;
    flex-direction: column;
    gap: 15px;
}

@media (min-width: 920px){

section{
  width: 50%;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.3) transparent;
}

/* Chrome, Edge, Safari */
section::-webkit-scrollbar {
  width: 6px;
}

section::-webkit-scrollbar-track {
  background: transparent;
}

section::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.3);
  border-radius: 10px;
}

section::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.5);
}

}

</style>