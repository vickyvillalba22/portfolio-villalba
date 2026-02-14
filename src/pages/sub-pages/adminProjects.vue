<script setup lang="ts">

import { ref } from "vue"

import { Icon } from "@iconify/vue"
import type { Project } from "@/types/project"
import { useProjectFilters } from "@/utils/useProjectFilters"
import ProjectFilters from "@/components/small ui/projectFilters.vue"
import ModalPregunta from "@/components/small ui/log in/modals/modalPregunta.vue"

import {
  useProjects,
  deleteProjectById,
  resetProjects
} from "@/utils/projectsStore"

import router from "@/router"

const { projects } = useProjects()

const isDeleteModalOpen = ref(false)
const projectToDelete = ref<Project | null>(null)

// filtros reutilizados
const {
  years,
  categories,
  selectedYears,
  selectedCategories,
  toggleYear,
  toggleCategory,
  clearYears,
  clearCategories,
  filteredProjects
} = useProjectFilters(projects, { ignoreMostrar: true })

function deleteProject(project: Project) {
  projectToDelete.value = project
  isDeleteModalOpen.value = true
}
function confirmDeleteProject() {
  if (!projectToDelete.value) return

  deleteProjectById(projectToDelete.value.id)
  projectToDelete.value = null
}

function addProject() {
  router.push("/admin/projects/add")
}

function editProject(project: Project) {
  router.push(`/admin/projects/edit/${project.id}`)
}

function reset() {
  resetProjects()
}

function back(){
  router.push('/profile')
}

</script>


<template>

  <section class="admin-projects">

    <header class="header">

      <button class="back" @click="back">
        <Icon icon="hugeicons:arrow-left-02" class="i-mob" />
      </button>

      <h3 class="subtitulo">Manage projects</h3>

      <ProjectFilters
        mode="rosa"
        :years="years"
        :categories="categories"
        :selectedYears="selectedYears"
        :selectedCategories="selectedCategories"
        :toggleYear="toggleYear"
        :toggleCategory="toggleCategory"
        :clearYears="clearYears"
        :clearCategories="clearCategories"
      />

      <button class="reset flotante" @click="reset">
        <Icon icon="hugeicons:reload" class="i-mob"/>
      </button>
      
    </header>

    <!--projects-->
    <div class="grid">

      <div v-for="project in filteredProjects" :key="project.id" class="card">
        <img 
        :src="project.imagen || `/imgs-projects/${project.id}.png`" 
        :alt="project.titulo"
        />

        <h3>{{ project.titulo }}</h3>

        <div class="actions">
          <button @click="editProject(project)">
            <Icon icon="hugeicons:edit-02" class="edit" />
          </button>
          <button @click="deleteProject(project)">
            <Icon icon="hugeicons:delete-02" class="delete" />
          </button>
        </div>
      </div>
    </div>

    <!-- botón flotante -->
    <button class="add flotante" @click="addProject">
      <Icon icon="hugeicons:plus-sign" class="i-mob" />
    </button>

    <ModalPregunta
      v-model="isDeleteModalOpen"
      :question="`Are you sure you want to delete '${projectToDelete?.titulo}'?`"
      confirmText="Delete"
      cancelText="Cancel"
      confirmColor="error"
      :onConfirm="confirmDeleteProject"
    />

  </section>
  
</template>

<style scoped>
.admin-projects {
  min-height: 90vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}
.back {
  display: flex;
}

.grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.card {
  background: var(--forms1);
  border-radius: 8px;
  padding: 16px;
  width: 48%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.card h3{
  font-size: 1.1em;
  font-family: var(--font-thin);
}

.card img {
  width: 100%;
  height: 20vh;
  object-fit: cover;
  border-radius: 8px;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: end;
}

.flotante{
  position: fixed;
  bottom: 5%;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add {
  right: 5%;
  background: var(--rosa);
}

.reset{
  left: 5%;
  background: var(--azul);
}

.actions button {
  background-color: var(--blanco-suave);
  padding: 8px;
  border-radius: 100%;
}

.edit,
.delete {
  width: 18px;
  height: 18px;
  display: flex;
}
.edit {
  color: var(--verde);
}
.delete {
  color: var(--rojo);
}

@media (min-width: 920px){

  .grid{
    justify-content: start;
  }
  .card{
    width: 18%;
  }

}

@media (min-width: 700px){
  .grid{
    justify-content: start;
  }
  .card{
    width: 30%;
  }
}
</style>
