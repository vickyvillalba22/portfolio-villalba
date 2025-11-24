<script setup>

import ProjectCard from '../components/projectCard.vue';
import { inject } from 'vue';

const projects = inject('projects')

</script>

<template>

    <section id="projects">

        <div class="contProjects">

            <ProjectCard
                v-for="proj in projects"
                :key="proj.id"
                :projectId="proj.id"
            />

        </div>

    </section>

</template>

<style scoped>

#projects{

    min-height: 90vh;
    width: 90vw;

    display: flex;
    justify-content: center;
}

.contProjects{

    height: 60vh;
    width: 90%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;

    margin-top: 5vh;

}

</style>