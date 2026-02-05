import { onMounted, provide } from 'vue'
import { initProjects, useProjects } from '@/utils/projectsStore'

export function useProjectsProvider() {
  const { projects, isLoading } = useProjects()

  onMounted(async () => {
    await initProjects()
  })

  provide('projects', projects)
  provide('isLoading', isLoading)

  return { projects, isLoading }
}
