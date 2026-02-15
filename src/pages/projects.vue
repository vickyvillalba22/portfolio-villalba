<script setup lang="ts">

import ProjectCard from '../components/projectCard.vue';
import LoaderFilters from '@/components/small ui/loaderFilters.vue';
import LoaderProjects from '@/components/small ui/loaderProjects.vue';

import { inject, type Ref } from 'vue'
import { useProjectFilters } from '@/utils/useProjectFilters'
import ProjectFilters from '@/components/small ui/projectFilters.vue'
import type { Project } from '@/types/project'

// inject de proyectos
const projects = inject<Ref<Project[]>>('projects');
if (!projects) {
  throw new Error("Projects provider not found");
}

const projectFilters = useProjectFilters(projects)

// inject de estado de carga
const isLoading = inject<Ref<boolean>>("isLoading");

</script>

<template>

    <section id="projects">

        <h2 class="mayus">Projects</h2>

        <!--loader-->
        <LoaderFilters v-if="isLoading" />

        <ProjectFilters
            v-if="!isLoading"
            mode="violeta"
            :years="projectFilters.years"
            :categories="projectFilters.categories"
            :selectedYears="projectFilters.selectedYears.value"
            :selectedCategories="projectFilters.selectedCategories.value"
            :toggleYear="projectFilters.toggleYear"
            :toggleCategory="projectFilters.toggleCategory"
            :clearYears="projectFilters.clearYears"
            :clearCategories="projectFilters.clearCategories"
        />


        <!--loader-->
        <LoaderProjects v-if="isLoading" />

        <transition-group name="stagger-up" tag="div" appear v-else class="contProjects">

            <ProjectCard
                v-for="proj in projectFilters.filteredProjects.value"
                :key="proj.id"
                :projectId="proj.id"
                :style="{ transitionDelay: `${proj.id * 80}ms` }"
            />

        </transition-group>


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
    font-size: 2.2em;
    font-family: var(--font-thin);
    width: 100%;
}

.contProjects{
    height: 60vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 5vh;
}

@media (min-width: 700px){

    .contProjects{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 20vh;
        gap: 20px;
        width: 100%;
        grid-auto-flow: dense;
    }

}

@media (min-width: 920px){

.contProjects{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 20vh;
    gap: 20px;
    width: 100%;
    grid-auto-flow: dense;
}

}

</style>