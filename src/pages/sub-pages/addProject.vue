<script setup lang="ts">
import { useRouter } from "vue-router"
import ProjectForm from "@/components/small ui/log in/forms/project/projectForm.vue"
import type { Project } from "@/types/project"
import { addProject } from "@/utils/projectsStore"

const router = useRouter()

function handleSubmit(project: Project) {
  addProject(project)
  router.push("/admin/projects")
}
</script>

<template>
  <ProjectForm
    mode="add"
    title="Agregar proyecto"
    @submit="handleSubmit"
  />
</template>

