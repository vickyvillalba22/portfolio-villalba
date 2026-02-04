<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { Project } from '@/types/project'
import { cargarProyectos } from '@/utils/fetchData'
import FilterTabs from '@/components/small ui/log in/filterTabs.vue'

const projects = ref<Project[]>([])
const selectedYear = ref<number | 'all'>('all')

// carga asincrónica
onMounted(async () => {
  projects.value = await cargarProyectos()
})

// filtro por año
const filteredProjects = computed(() => {
  if (selectedYear.value === 'all') return projects.value
  return projects.value.filter(p => p.year === selectedYear.value)
})

// acciones admin
function deleteProject(project: Project) {
  console.log('DELETE PROJECT REQUEST', project)
  projects.value = projects.value.filter(p => p.id !== project.id)
}

function editProject(project: Project) {
  console.log('EDIT PROJECT REQUEST', project)
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

      <!-- filtros -->
      <div class="filters">
        <span>Year</span>
        <button
          v-for="year in ['all', 2023, 2024, 2025, 2026]"
          :key="year"
          :class="{ active: selectedYear === year }"
          @click="selectedYear = year"
        >
          {{ year === 'all' ? 'All' : year }}
        </button>
      </div>
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

.filters {
  display: flex;
  gap: 12px;
}

.filters button {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
}

.filters button.active {
  color: var(--rosa);
  font-weight: bold;
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
