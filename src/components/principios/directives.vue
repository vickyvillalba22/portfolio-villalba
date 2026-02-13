<script setup lang="ts">

import { ref } from "vue"

import CodeBox from '../small ui/codeBox.vue'

const vIfExample = `&lt;p <span>v-if="mostrar"</span>&gt;Este párrafo se muestra o no.&lt;/p&gt;`
const parrafo = `Este párrafo se muestra o no`
const clickExample = `&lt;button <span>@click="saludar"</span>&gt;Saludar&lt;/button&gt;`

// v-if
const mostrar = ref(false)

function toggleParrafo() {
  mostrar.value = !mostrar.value
}

// panda
const showPanda = ref(false)

function saludar() {
  showPanda.value = true

  // desaparece después de 2.5 segundos
  setTimeout(() => {
    showPanda.value = false
  }, 2500)
}

</script>

<template>

    <article class="principio">

        <h3>Directives</h3>
        <p class="desc">Directives are special attributes that allow you to manipulate the DOM in a declarative way.</p>

        <h4>v-if</h4>

        <CodeBox :code="vIfExample" />

        <button @click="toggleParrafo">
        Toggle paragraph
        </button>

        <p v-if="mostrar">
        Este párrafo se muestra o no
        </p>

        <h4>@click</h4>

        <CodeBox :code="clickExample" />

        <button @click="saludar">
        Saludar
        </button>

        <!-- Panda animado -->
        <Transition name="panda">
        <img
            v-if="showPanda"
            src="/src/assets/imgs/hi.gif"
            alt="Panda saludando"
            class="panda"
        />
        </Transition>


    </article>

</template>

<style scoped>

.principio{
    position: relative;
}

h3{
    font-size: 24px;
    font-family: var(--font-thin);
}

h4{
    color: var(--verde);
}

button{
    padding: 2px 18px;
    border: 1px solid var(--verde);
    border-radius: 16px;
    width: fit-content;
    font-family: var(--font-princ);
    font-size: .8em;
}

.panda {
  position: absolute;
  bottom: 0;
  right: 20px;
  width: 140px;
  pointer-events: none;
}

/* transición */

.panda-enter-from {
  opacity: 0;
  transform: translateY(80px);
}

.panda-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.panda-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.panda-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.panda-enter-active,
.panda-leave-active {
  transition: all 0.5s ease;
}



</style>

