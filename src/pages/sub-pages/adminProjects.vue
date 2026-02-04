<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import type { Project } from '@/types/project'
import { cargarProyectos } from '@/utils/fetchData'
import { useProjectFilters } from '@/utils/useProjectFilters'
import ProjectFilters from '@/components/small ui/projectFilters.vue'

import router from '@/router'

const projects = ref<Project[]>([])

// carga asincrónica
onMounted(async () => {
  projects.value = await cargarProyectos()
})

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

// acciones admin
function deleteProject(project: Project) {
  projects.value = projects.value.filter(p => p.id !== project.id)
}

function editProject(project: Project) {
  project.updateTitle(project.titulo + ' (editado)')
}

function addProject() {
  console.log('ADD PROJECT REQUEST')
}
</script>

<template>

  <section class="admin-projects">

    <header class="header">

        <button class="back" @click="router.back()">
        <Icon icon="hugeicons:arrow-left-02" class="i-mob" />
        </button>
        <h3 class="subtitulo">Administrar proyectos</h3>

        
        <ProjectFilters
            :years="years"
            :categories="categories"
            :selectedYears="selectedYears"
            :selectedCategories="selectedCategories"
            :toggleYear="toggleYear"
            :toggleCategory="toggleCategory"
            :clearYears="clearYears"
            :clearCategories="clearCategories"
        />

    </header>

    <!-- grid -->
    <div class="grid">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="card"
      >
      <!--LA IMAGEN DEBE SER LA DEL JSON DINAMICA-->
        <img :src="project.imagen" alt="" />

        <h3>{{ project.titulo }}</h3>
        <p>{{ project.descripcionCorta }}</p>

        <div class="actions">
          <button @click="editProject(project)">
            <Icon icon="hugeicons:pencil-edit-02" />
          </button>
          <button @click="deleteProject(project)">
            <Icon icon="hugeicons:delete-02" />
          </button>
        </div>
      </div>
    </div>

    <!-- botón flotante -->
    <button class="add" @click="addProject">
      <Icon icon="hugeicons:plus-sign" class="i-mob" />
    </button>
  </section>
</template>

<style scoped>
.admin-projects {
  min-height: 90vh;
  width: 90%;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.back{
  display: flex;
}

.grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.card {
  background: var(--blanco-suave);
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card img {
  width: 100%;
  border-radius: 8px;
}

.actions {
  display: flex;
  gap: 1rem;
}

.add {
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--rosa);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.i-mob{
    color: var(--negro);
}
</style>
