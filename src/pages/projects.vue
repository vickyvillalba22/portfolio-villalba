<script setup lang="ts">

import ProjectCard from '../components/projectCard.vue';
import LoaderFilters from '@/components/loaderFilters.vue';
import LoaderProjects from '@/components/loaderProjects.vue';

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


</script>

<template>

    <section id="projects">

        <!--loader-->
        <LoaderFilters v-if="isLoading" />

        <div v-else id="filters">

            <!--AÑOS-->
            <!--mostrar todos los años-->
            <div class="contPills">
                <p>Year:</p>
                <button @click="clearYears()" :class="{ active: selectedYears.size === 0 }" class="pill">Todas</button>
                <!-- Pastillas dinámicas -->
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
            <!--mostrar todos las categorias-->
            <div class="contPills">
                <p>Area:</p>
                <button @click="clearCategories()" :class="{ active: selectedCategories.size === 0 }" class="pill">Todas</button>
                <!--Pastillas dinámicas-->
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
    width: 100%;

    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.contProjects{

    height: 60vh;
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 5vh;
}

.pill {

    width: fit-content;
    padding: 5px 10px;
    border-radius: 30px;

    border: 1px solid rgba(255,255,255,.12);
    background-color: rgba(240, 248, 255, 0.411);
    cursor: pointer;

    font-family: "creatoDisplay", 'openSans';
    font-size: 15px;
    color: white;

}
.pill.active {
    background-color: white;
    color: black;
    box-shadow: 0 6px 18px rgba(0,0,0,.25);
}

section div p{
    color: white;
}

#filters{
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.contPills{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
}

.contPills p{
    margin-right: 10px;
}

@media (max-width: 600px){
    #projects{
        margin-top: 30px;
    }
    .contPills{
        flex-wrap: wrap;
    }


}

</style>