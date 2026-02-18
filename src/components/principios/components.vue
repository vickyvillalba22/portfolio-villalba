<script setup lang="ts">

import { ref } from "vue"

import ProjectCard from "@/components/projectCard.vue"

const isVisible = ref(true)
const initialState = [4]
const instances = ref<number[]>([...initialState])

function hideCard() {
  isVisible.value = false
}

function showCard() {
  isVisible.value = true
}

function duplicateCard() {
  instances.value.push(1)
}

function resetDemo() {
  isVisible.value = true
  instances.value = [...initialState]
}

</script>

<template>

    <article class="principio efectoSection">

        <h3>Components</h3>
        <p class="desc">Components allow the interface to be divided into reusable and encapsulated pieces, facilitating maintenance and scalability.</p>

        <div v-if="isVisible" class="contCard">
            <ProjectCard
                v-for="(id, index) in instances"
                :key="index"
                :projectId="id"
            />
        </div>

        <p class="counter">
            Rendered components: {{ instances.length }}
        </p>

        <div class="contButtons">
            <button @click="hideCard" class="fill">Hide</button>
            <button @click="showCard" class="fill">Show</button>
            <button @click="duplicateCard" class="fill">Duplicate</button>
            <button @click="resetDemo" class="fill">Reset</button>
        </div>

    </article>

</template>

<style scoped>

h3{
    font-size: 24px;
    font-family: var(--font-thin);
}

.contCard{
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.card{
    width: 40%;
    height: 30vh;
    border-radius: 16px;
}

.contButtons{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.contButtons button{
    padding: 2px 18px;
    border-radius: 16px;
    font-family: var(--font-princ);
    font-size: 0.8em;
}

.fill::after{
    background-color: var(--verde);
}


</style>