import { ref } from 'vue'
import type { Project } from '@/types/project'
import { cargarProyectos } from '@/utils/fetchData'

const KEY = 'projects'

const projects = ref<Project[]>([])
const isLoading = ref(true)

export async function initProjects() {
  const stored = localStorage.getItem(KEY)

  if (stored) {
    projects.value = JSON.parse(stored)
    isLoading.value = false
    return
  }

  const data = await cargarProyectos()
  projects.value = data
  localStorage.setItem(KEY, JSON.stringify(data))
  isLoading.value = false
}

export function useProjects() {
  return { projects, isLoading }
}

/* ADMIN ACTIONS (borrables después) */

export function addProject(project: Project) {
  projects.value.push(project)
  persist()
}

export function updateProject(updated: Project) {
  projects.value = projects.value.map(p =>
    p.id === updated.id ? updated : p
  )
  persist()
}

export function deleteProjectById(id: number) {
  projects.value = projects.value.filter(p => p.id !== id)
  persist()
}

export function resetProjects() {
  localStorage.removeItem(KEY)
  location.reload()
}

function persist() {
  localStorage.setItem(KEY, JSON.stringify(projects.value))
}

