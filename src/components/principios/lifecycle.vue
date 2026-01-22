<script setup lang="ts">

import { ref } from 'vue';
import CodeBox from '../small ui/codeBox.vue';

const lifecycleExample = `<span>onMounted</span>() // first component render
<span>onUpdated</span>() // component update
<span>onUnmounted</span>() // disappearing`

const estados = ['start', 'mounted', 'updated', 'unmount']

const cardState = ref('start')

</script>

<template>

    <article class="principio">

        <h3>Lifecycle Hooks</h3>
        <p class="desc">Vue offers hooks that allow you to execute logic at different times in a component's lifecycle.</p>

        <h4>For example</h4>

        <CodeBox :code="lifecycleExample" class="code" />

        <div class="example2">

            <div class="card">
                <div></div>
            </div>

            <div class="derecha">
                <div class="contButtons">
                <button>Mount</button>
                <button>Update</button>
                <button>Unmount</button>
                </div>
                <p>State: {{ cardState }}</p>
            </div>

        </div>
        

    </article>

</template>

<style scoped>

.card{
    width: 50%;
    height: 30vh;
    background-color: gray;
    border-radius: 16px;
}

.contButtons{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.example2{
    display: flex;
    gap: 20px;
}

.derecha{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


</style>
