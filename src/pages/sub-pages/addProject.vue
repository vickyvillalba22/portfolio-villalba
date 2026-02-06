<script setup lang="ts">

import { useRouter } from "vue-router"

import ProjectForm from "@/components/small ui/log in/forms/project/projectForm.vue"
import type { Project } from "@/types/project"
import { addProject } from "@/utils/projectsStore"

import { Icon } from "@iconify/vue"

const router = useRouter()

function handleSubmit(project: Project) {
  addProject(project)
  router.push("/admin/projects")
}
</script>

<template>
    
    <div class="top">
        <button class="back" @click="router.back()">
        <Icon icon="hugeicons:arrow-left-02" class="i-mob" />
        Volver a mis proyectos
        </button>
    </div>

    <ProjectForm
        mode="add"
        title="Agregar proyecto"
        @submit="handleSubmit"
    />

</template>

<style scoped>

.top{
    width: 90%;
    display: flex;
    color: var(--color-texto-secundario);
}

.back{
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-princ);
}

</style>

