import { ref, computed, type Ref } from 'vue'
import { Project } from '@/models/Project'

export function useProjectFilters(projects: Ref<Project[]>) {

  const selectedYears = ref<Set<number>>(new Set())
  const selectedCategories = ref<Set<string>>(new Set())

  const years: number[] = [2023, 2024, 2025]
  const categories: string[] = [
    'Photography',
    'UX/UI',
    '2D Animation',
    'Audiovisual',
    'Graphic Design',
    'Development',
    'Game Design',
    '3D Design'
  ]

  function toggle<T>(setRef: Ref<Set<T>>, value: T): void {
    const newSet = new Set(setRef.value)
    newSet.has(value) ? newSet.delete(value) : newSet.add(value)
    setRef.value = newSet
  }

  const toggleYear = (year: number) => toggle(selectedYears, year)
  const toggleCategory = (cat: string) => toggle(selectedCategories, cat)

  const clearYears = () => (selectedYears.value = new Set())
  const clearCategories = () => (selectedCategories.value = new Set())

  const filteredProjects = computed(() =>
    projects.value.filter(project => {
      const passMostrar = project.mostrar === true
      const passYear =
        selectedYears.value.size === 0 ||
        selectedYears.value.has(project.year)
      const passCategory =
        selectedCategories.value.size === 0 ||
        selectedCategories.value.has(project.categoria)

      return passMostrar && passYear && passCategory
    })
  )

  return {
    years,
    categories,
    selectedYears,
    selectedCategories,
    toggleYear,
    toggleCategory,
    clearYears,
    clearCategories,
    filteredProjects
  }
}
