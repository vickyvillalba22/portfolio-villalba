<script setup lang="ts">

import { ref } from 'vue'
import CodeBox from '../small ui/codeBox.vue'
import ProjectCard from '@/components/projectCard.vue'

const lifecycleExample = `<span>onMounted()//first component render</span> 
<span>onUpdated()//component update</span>
<span>onUnmounted()//disappearing</span>`

const isMounted = ref(false)
const cardKey = ref(0)
const cardState = ref('start')
const isUpdating = ref(false)

function mountCard() {
  isMounted.value = true
  cardState.value = 'mounted'
}

function updateCard() {
  if (!isMounted.value) return

  cardKey.value++
  cardState.value = 'updated'

  isUpdating.value = true

  setTimeout(() => {
    isUpdating.value = false
  }, 600)
}

function unmountCard() {
  isMounted.value = false
  cardState.value = 'unmount'
}

</script>


<template>

    <article class="principio efectoSection">

        <h3>Lifecycle Hooks</h3>
        <p class="desc">Vue offers hooks that allow you to execute logic at different times in a component's lifecycle.</p>

        <h4>For example</h4>

        <CodeBox :code="lifecycleExample" class="code" />

        <div class="example2">

        <div class="card">

            <div class="cardWrapper" :class="{ updating: isUpdating }"
            >
            <ProjectCard
                v-if="isMounted"
                :key="cardKey"
                :projectId="1"
            />
            </div>

            <p>State: {{ cardState }}</p>

        </div>

            <div class="contButtons">
                <button @click="mountCard" class="fill">Mount</button>
                <button @click="updateCard" class="fill">Update</button>
                <button @click="unmountCard" class="fill">Unmount</button>
            </div>

        </div>

        

    </article>

</template>

<style scoped>

h3{
    font-size: 24px;
    font-family: var(--font-thin);
}

.card{
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    border-radius: 16px;
}

.contButtons{
    display: flex;
    gap: 10px;
}

.example2{
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.derecha{
    display: flex;
    justify-content: space-between;
}

.contButtons button{
    padding: 2px 18px;
    border-radius: 16px;
    font-family: var(--font-princ);
    font-size: 0.8em;
}

.fill:hover{
    background-color: var(--verde);
}

.cardWrapper {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 16px;
}

.cardWrapper.updating {
  transform: scale(1.05);
  box-shadow: 0 0 10px var(--verde);
}


</style>
