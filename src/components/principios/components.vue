<script setup lang="ts">

import { ref } from "vue"

import ProjectCard from "@/components/projectCard.vue"

const isVisible = ref(true)
const initialState = [1]
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

    <article class="principio">

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
            <button @click="hideCard">Hide</button>
            <button @click="showCard">Show</button>
            <button @click="duplicateCard">Duplicate</button>
            <button @click="resetDemo">Reset</button>
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
    background-color: gray;
    border-radius: 16px;
}

.contButtons{
    display: flex;
    gap: 10px;
}

.contButtons button{
    padding: 2px 18px;
    border: 1px solid var(--verde);
    border-radius: 16px;
    font-family: var(--font-princ);
    font-size: 0.8em;
}

</style>