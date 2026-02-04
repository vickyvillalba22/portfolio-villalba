<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import type { Project } from '@/types/project'
import { cargarProyectos } from '@/utils/fetchData'
import { useProjectFilters } from '@/utils/useProjectFilters'
import ProjectFilters from '@/components/ProjectFilters.vue'

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
      <h2>Administrar proyectos</h2>

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
    <button class="add-btn" @click="addProject">
      <Icon icon="hugeicons:add-01" />
    </button>
  </section>
</template>

<style scoped>
.admin-projects {
  padding: 2rem;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #222;
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

.add-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--rosa);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  border: none;
  color: white;
  font-size: 1.5rem;
}
</style>
