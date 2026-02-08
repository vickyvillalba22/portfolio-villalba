<script setup lang="ts">
import { inject, computed, type Ref } from 'vue'
import type { Project } from '@/types/project'
import type { User } from '@/types/user'
import ProjectCard from '@/components/projectCard.vue'
import { currentUser } from '@/utils/session';

const props = defineProps<{
  user: User
}>()

const projects = inject<Ref<Project[]>>('projects')
if (!projects) throw new Error('Projects not found')

const likedProjects = computed(() =>
  projects.value.filter(p =>
    currentUser.value?.likedPosts.includes(p.id)
  )
)

</script>

<template>

  <section>

    <h3>Liked projects</h3>

    <p v-if="likedProjects.length === 0">
      Todavía no diste like a ningún proyecto 💔
    </p>

    <div class="contProjects">
      <ProjectCard
        v-for="proj in likedProjects"
        :key="proj.id"
        :projectId="proj.id"
      />
    </div>

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

</style>