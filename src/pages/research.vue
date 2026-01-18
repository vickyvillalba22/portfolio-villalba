<script setup lang="ts">

import { ref } from 'vue'
import bIndexPpios from '@/components/small ui/b-index-ppios.vue'

//PRINCIPIOS CLAVE
interface VuePrinciple {
  id: string
  label: string
  component: string
}

const vuePrinciples: VuePrinciple[] = [
  {
    id: 'components',
    label: 'Components',
    component: 'ComponentsPrinciple',
  },
  {
    id: 'reactivity',
    label: 'Reactivity',
    component: 'ReactivityPrinciple',
  },
  {
    id: 'directives',
    label: 'Directives',
    component: 'DirectivesPrinciple',
  },
  {
    id: 'computed',
    label: 'Computed properties',
    component: 'ComputedPrinciple',
  },
  {
    id: 'lifecycle',
    label: 'Lifecycle Hooks',
    component: 'LifecyclePrinciple',
  },
]

const activePrinciple = ref<VuePrinciple>(vuePrinciples[0])

</script>

<template>

    <main id="research">

        <h2 class="mayus thin">Research</h2>

        <section id="heroR">

            <div class="title">
                <h2>Vue.js</h2>
                <h4 class="thin">Framework progresivo para interfaces interactivas</h4>
            </div>

            <div class="intro">
                <img src="../assets/imgs/vue-logo.png" alt="">
                <p>Vue.js permite construir aplicaciones web dinámicas de forma escalable, combinando simplicidad, reactividad y componentes reutilizables.</p>
            </div>

            <p class="frase">Adoptado por <span>1000</span> proyectos</p>

        </section>

        <section class="principios">

            <h4>Principios clave</h4>

            <bIndexPpios 
                v-for="principle in vuePrinciples"
                :key="principle.id" 
                :principle="principle"
                :is-active="activePrinciple.id === principle.id"
                @select="activePrinciple = principle"
            />

        </section>

    </main>
    
</template>

<style scoped>

#research{
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 90%;
    min-height: 100vh;
    gap: 30px;

    color: var(--color-texto-principal);
}

/* HERO SECTION */
#heroR{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
}
h2{
    width: 100%;
    font-size: 40px;
}
h4{
    font-size: 20px;
}
.intro{
    display: flex;
    justify-content: space-evenly;
}
.intro img{
    width: 30%;
    object-fit: contain;
}
.intro p{
    width: 50%;
}
.frase{
    font-size: 20px;
}
.frase span{
    color: var(--verde);
}

/* PRINCIPIOS CLAVE */
.principios{
    width: 100%;
}

</style>