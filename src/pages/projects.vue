<script setup lang="ts">

import ProjectCard from '../components/projectCard.vue';
import LoaderFilters from '@/components/small ui/loaderFilters.vue';
import LoaderProjects from '@/components/small ui/loaderProjects.vue';
import { Icon } from '@iconify/vue';

import { inject, ref, computed, type Ref } from 'vue';
import type { Project } from '../types/project';

// inject de proyectos
const projects = inject<Ref<Project[]>>('projects');
if (!projects) {
  throw new Error("Projects provider not found");
}
// inject de estado de carga
const isLoading = inject<Ref<boolean>>("isLoading");

// sets reactivos para las categorías seleccionadas
const selectedYears = ref<Set<number>>(new Set());
const selectedCategories = ref<Set<string>>(new Set());

// arrays para renderizar filtros
const years: number[] = [2023, 2024, 2025];
const categories: string[] = [
  'Photography', 
  'UX/UI', 
  '2D Animation', 
  'Audiovisual', 
  'Graphic Design', 
  'Development',
  'Game Design',
  '3D Design'
];

// funcion para alternar cada categoria
function toggle<T>(setRef: Ref<Set<T>>, value: T): void {
  const newSet = new Set(setRef.value);
  if (newSet.has(value)) newSet.delete(value);
  else newSet.add(value);
  setRef.value = newSet;
}

const toggleYear = (value: number) => toggle(selectedYears, value);
const toggleCategory = (value: string) => toggle(selectedCategories, value);

const clearYears = () => clearFilter(selectedYears);
const clearCategories = () => clearFilter(selectedCategories);


// mostrar todos
function clearFilter<T>(setRef: Ref<Set<T>>): void {
  setRef.value = new Set();
}

// aplicar filtros combinados con computed
const filteredProjects = computed<Project[]>(() => {
    
    return projects.value.filter((project) => {
    const passMostrar = project.mostrar === true;

    const passYear = selectedYears.value.size === 0 || selectedYears.value.has(project.year);

    const passCategory = selectedCategories.value.size === 0 || selectedCategories.value.has(project.categoria);

    return passMostrar && passYear && passCategory;

  });
});

//mostrar grupos de filtros
const activeYear = ref(false)
const activeArea = ref(false)

</script>

<template>

    <section id="projects">

        <h2 class="mayus thin">Projects</h2>

        <!--loader-->
        <LoaderFilters v-if="isLoading" />

        <div v-else id="filters">

            <div class="manageF">

                <Icon icon="hugeicons:filter" class="i-mob" />
                <p class="thin" @click="activeYear=!activeYear" :class="{'bold': activeYear}">Year</p>
                <p class="thin" @click="activeArea=!activeArea" :class="{'bold': activeArea}">Area</p>

            </div>

            <!--AÑOS-->
            <div class="contPills" v-if="activeYear">
                
                <!--all-->
                <button @click="clearYears()" :class="{ active: selectedYears.size === 0 }" class="pill">Todas</button>

                <button
                v-for="year in years"
                :key="year"
                @click="toggleYear(year)" 
                :class="{ active: selectedYears.has(year) }"
                class="pill"
                >
                {{ year }}
                </button>

            </div>

            <!--CATEGORÍAS-->
            <div class="contPills" v-if="activeArea">
                
                <!--all-->
                <button @click="clearCategories()" :class="{ active: selectedCategories.size === 0 }" class="pill">Todas</button>
                
                <button
                v-for="category in categories"
                :key="category"
                @click="toggleCategory(category)"
                :class="{ active: selectedCategories.has(category) }"
                class="pill"
                >
                {{ category }}
                </button>

            </div>

        </div>

        <!--loader-->
        <LoaderProjects v-if="isLoading" />

        <div v-else class="contProjects">

            <ProjectCard
                v-for="proj in filteredProjects"
                :key="proj.id"
                :projectId="proj.id"
            />

        </div>

    </section>

</template>

<style scoped>

#projects{
    min-height: 90vh;
    width: 90%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    color: var(--color-texto-principal);
}

h2{
    font-size: 40px;
    width: 100%;
}

.manageF{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
}

.contProjects{
    height: 60vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 5vh;
}

.pill {
    cursor: pointer;
    font-family: 'creatoDisplay';
    font-size: 15px;
}
.pill.active {
    color: var(--violeta);
}

#filters{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.i-mob{
    color: var(--violeta);
    width: 24px;
}

.contPills{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 5px 15px;
}

</style>