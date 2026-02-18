<script setup lang="ts">

import { inject, type Ref, ref, onMounted, onBeforeUnmount } from 'vue'

import ProjectCard from '../components/projectCard.vue';
import LoaderFilters from '@/components/small ui/loaderFilters.vue';
import LoaderProjects from '@/components/small ui/loaderProjects.vue';
import ProjectFilters from '@/components/small ui/projectFilters.vue'

import type { Project } from '@/types/project'
import { useProjectFilters } from '@/utils/useProjectFilters'
import { useTypewriter } from '@/animations/composables';

const isMobile = ref(false)

const checkScreen = () => {
  isMobile.value = window.innerWidth < 700
}

onMounted(() => {
  checkScreen()
  window.addEventListener("resize", checkScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen)
})

const { displayed } = useTypewriter("Projects")

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

        <h2 class="mayus">{{ displayed }}</h2>

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

        <transition-group :name="isMobile ? 'slide-left' : 'stagger-up'" appear tag="div" v-else class="contProjects">

            <ProjectCard
                v-for="(proj, index) in projectFilters.filteredProjects.value"
                :key="proj.id"
                :projectId="proj.id"
                :style="{ transitionDelay: `${index * 80}ms` }"
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