<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from "vue-router"

import ProjectForm from "@/components/small ui/log in/forms/project/projectForm.vue"
import type { Project } from "@/types/project"
import { addProject } from "@/utils/projectsStore"
import ModalAviso from "@/components/small ui/log in/modals/modalAviso.vue"

import { Icon } from "@iconify/vue"

const router = useRouter()

const isSuccessModalOpen = ref(false)

function handleSubmit(project: Project) {
  addProject(project)
  isSuccessModalOpen.value = true
}

function goBackToProjects() {
  router.push("/admin/projects")
}

</script>

<template>
    
    <div class="top">
        <button class="back" @click="router.back()">
        <Icon icon="hugeicons:arrow-left-02" class="i-mob" />
        Return to projects
        </button>
    </div>

    <ProjectForm
        mode="add"
        title="Agregar proyecto"
        @submit="handleSubmit"
    />

    <ModalAviso
        v-model="isSuccessModalOpen"
        message="Project created successfully!"
        buttonText="Back to projects"
        buttonColor="success"
        :action="goBackToProjects"
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

