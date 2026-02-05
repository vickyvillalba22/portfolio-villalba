<script setup lang="ts">
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"

import ProjectForm from "@/components/small ui/log in/forms/project/projectForm.vue"
import type { Project } from "@/types/project"
import { useProjects, updateProject } from "@/utils/projectsStore"

const route = useRoute()
const router = useRouter()

const { projects } = useProjects()

const project = computed<Project | undefined>(() =>
  projects.value.find(p => p.id === Number(route.params.id))
)

function handleSubmit(updated: Project) {
  updateProject(updated)
  router.push("/admin/projects")
}
</script>

<template>
  <ProjectForm
    v-if="project"
    mode="edit"
    :project="project"
    title="Editar proyecto"
    @submit="handleSubmit"
  />
</template>

