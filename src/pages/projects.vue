<script setup>

import ProjectCard from '../components/projectCard.vue';
import { inject, ref, computed } from 'vue';

const projects = inject('projects')

// sets reactivos para las categorías seleccionadas
const selectedYears = ref(new Set())
const selectedCategories = ref(new Set())

// arrays para renderizar filtros
const years = [2023, 2024, 2025]
const categories = ['Photography', 'UX/UI', '2D Animation', 'Audiovisuals', 'Graphic Design', 'Development', 'Game Design', '3D Design']

// funcion para alternar cada categoria
function toggle (setRef, value){

    //console.log(setRef);

    if(setRef.has(value)) setRef.delete(value);
    else setRef.add(value)

    setRef.value = new Set(setRef);

    console.log(setRef);
}

// mostrar todos
function clearFilter(setRef){
    setRef.value = new Set()
    //console.log(setRef);
}

// aplicar filtros combinados con computed
const filteredProjects = computed (()=>{

    return projects.value.filter(project =>{

        const passYear = selectedYears.value.size === 0 || selectedYears.value.has(project.year)
        //console.log(selectedYears);
        
        const passCategory = selectedCategories.value.size === 0 || selectedCategories.value.has(project.categoria)

        //console.log(passCategory);

        return passYear && passCategory;

    })
})


</script>

<template>

    <section id="projects">

        <div id="filters">

            <!--AÑOS-->
            <!--mostrar todos los años-->
            <div class="contPills">
                <p>Year:</p>
                <button @click="clearFilter(selectedYears)" :class="{ active: selectedYears.size === 0 }" class="pill">Todas</button>
                <!-- Pastillas dinámicas -->
                <button
                v-for="year in years"
                :key="year"
                @click="toggle(selectedYears, year)" 
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
                <button @click="clearFilter(selectedCategories)" :class="{ active: selectedCategories.size === 0 }" class="pill">Todas</button>
                <!--Pastillas dinámicas-->
                <button
                v-for="category in categories"
                :key="category"
                @click="toggle(selectedCategories, category)"
                :class="{ active: selectedCategories.has(category) }"
                class="pill"
                >
                {{ category }}
                </button>
            </div>

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
  padding: .35rem .8rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  background-color: rgba(240, 248, 255, 0.408);
  cursor: pointer;
  margin: .25rem;
}
.pill.active {
  background: linear-gradient(90deg, #8a2be2, #3a0066);
  color: white;
  box-shadow: 0 6px 18px rgba(0,0,0,.25);
}

section div p{
    color: white;
}

#filters{
    width: 80%;
    display: flex;
    flex-direction: column;
}

.contPills{
    display: flex;
    align-items: center;
    width: 100%;
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