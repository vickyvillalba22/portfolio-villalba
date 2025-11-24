<script setup>

import ProjectCard from '../components/projectCard.vue';
import { inject, ref, computed } from 'vue';

const projects = inject('projects')

// sets reactivos para las categorías seleccionadas
const selectedYears = ref(new Set())
const selectedCategories = ref(new Set())

// arrays para renderizar filtros
const years = ['2023', '2024', '2025']
const categories = ['Photography', 'UX/UI', '2D Animation', 'Audiovisuals', 'Graphic Design', 'Development', 'Game Design', '3D Design']

// funcion para alternar cada categoria
function toggle (setRef, value){
    
    const currentSet = setRef.value

    console.log(setRef.value);

    if(currentSet.has(value)) currentSet.delete(value);
    else currentSet.add(value)

    //setRef.value = new Set(currentSet);
}

// mostrar todos
function clearFilter(setRef){
    setRef.value = new Set()
}

// aplicar filtros combinados con computed
const filteredProjects = computed (()=>{

    return projects.value.filter(project =>{

        const passYear = selectedYears.value.size === 0 || selectedYears.value.has(project.year)
        const passCategory = selectedCategories.value.size === 0 || selectedCategories.value.has(project.categoria)

        return passYear && passCategory;

    })
})


</script>

<template>

    <section id="projects">

        <div id="filters">

            <!--AÑOS-->
            <!--mostrar todos los años-->
            <button @click="clearFilter(selectedYears)" :class="{ active: selectedYears.size === 0 }">Todas</button>
            <!-- Pastillas dinámicas -->
            <button
            v-for="year in years"
            :key="year"
            @click="toggle(selectedYears, year)" 
            :class="{ active: selectedYears.has(year) }"
            >
            {{ year }}
            </button>

            <!--CATEGORÍAS-->
            <!--mostrar todos las categorias-->
            <button @click="clearFilter(selectedCategories)" :class="{ active: selectedCategories.size === 0 }">Todas</button>
            <!-- Pastillas dinámicas -->
            <button
            v-for="category in categories"
            :key="category"
            @click="toggle(selectedCategories, category)"
            :class="{ active: selectedCategories.has(category) }"
            >
            {{ category }}
            </button>

        </div>

        <div class="contProjects">

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
    width: 90vw;

    display: flex;
    justify-content: center;
    flex-direction: column;
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