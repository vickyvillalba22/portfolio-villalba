<script setup lang="ts">

import { ref } from 'vue'
import type { Component } from 'vue'
import { Icon } from '@iconify/vue'
import Circle from '@/components/circle.vue'
import Comparison from '@/components/comparison.vue'

//importacion de componentes que serán dinamicos
import Components from '@/components/principios/components.vue'
import Reactivity from '@/components/principios/reactivity.vue'
import Directives from '@/components/principios/directives.vue'
import Computed from '@/components/principios/computed.vue'
import Lifecycle from '@/components/principios/lifecycle.vue'

//PRINCIPIOS CLAVE
interface VuePrinciple {
  id: string
  label: string
  component: Component,
  angle: number
}

const vuePrinciples: VuePrinciple[] = [
  {
    id: 'components',
    label: 'Components',
    component: Components,
    angle: 0
  },
  {
    id: 'reactivity',
    label: 'Reactivity',
    component: Reactivity,
    angle: 60
  },
  {
    id: 'directives',
    label: 'Directives',
    component: Directives,
    angle: 150
  },
  {
    id: 'computed',
    label: 'Computed properties',
    component: Computed,
    angle: 210
  },
  {
    id: 'lifecycle',
    label: 'Lifecycle Hooks',
    component: Lifecycle,
    angle: 300
  },
]

const activePrinciple = ref<VuePrinciple>(vuePrinciples[0])

//ELECCION
interface ReasonItem {
  id: string
  text: string
  animation: {
    type: 'fade' | 'slide' | 'scale'
    delay?: number
  }
}

const reasons: ReasonItem[] = [
  {
    id: 'learning-curve',
    text: 'Curva de aprendizaje accesible',
    animation: {
      type: 'slide',
      delay: 0,
    },
  },
  {
    id: 'architecture',
    text: 'Arquitectura clara',
    animation: {
      type: 'slide',
      delay: 100,
    },
  },
  {
    id: 'typescript',
    text: 'Integración con TypeScript',
    animation: {
      type: 'slide',
      delay: 200,
    },
  },
  {
    id: 'interactive-projects',
    text: 'Ideal para proyectos interactivos',
    animation: {
      type: 'slide',
      delay: 300,
    },
  },
]

</script>

<template>

    <main id="research">

        <h2 class="mayus">Research</h2>

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

            <Circle
              :items="vuePrinciples"
              :active-id="activePrinciple.id"
              @select="activePrinciple = $event"
            />

            <Transition name="fade-slide" mode="out-in">
              <component :is="activePrinciple.component" />
            </Transition>

        </section>

        <Comparison />

        <section class="eleccion">

            <h4>¿Por qué elegí Vue.js?</h4>

            <p>Elegí Vue.js como tema de investigación por su equilibrio entre simplicidad y potencia, y su adecuación para proyectos académicos y profesionales.</p>

            <div class="contReasons">

                <div class="reason" v-for="reason in reasons">
                    <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
                    <p>{{ reason.text }}</p>
                </div>

            </div>


        </section>

        <p class="quote">Vue.js se posiciona como una herramienta moderna y eficiente para el desarrollo de <span>interfaces dinámicas</span>, alineada con las <span>buenas prácticas</span> actuales del desarrollo web.</p>

    </main>
    
</template>

<style scoped>

#research{
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 90%;
    min-height: 100vh;
    gap: 50px;

    color: var(--color-texto-principal);
}

section{
    width: 100%;
    display: flex;
    flex-direction: column;
}

/* HERO SECTION */
#heroR{
    gap: 30px;
}
h2{
    width: 100%;
    font-size: 2.2em;
    font-family: var(--font-thin);
}
h4{
    font-size: 20px;
    font-family: var(--font-thin);
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

.eleccion{
    gap: 20px;
}

/*PRINCIPIOS*/
.principios{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
.principios h4{
  width: 100%;
}

.principio{
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 8px 8px 16px rgba(148, 147, 147, 0.35);
}

.principio button{
    padding: 2px 18px;
    border: 1px solid var(--verde);
    border-radius: 16px;
    width: fit-content;
}

/*ANIMACION PRINCIPIOS*/
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/*ELECCION*/
.contReasons{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.reason{
    display: flex;
    align-items: center;
    gap: 10px;
}
.i-mob{
    width: 24px;
    color: var(--verde);
}

/*CIERRE*/
.quote{
    font-size: 24px;
    line-height: 35px;
}
.quote span{
    color: var(--verde);
}

</style>

<style>

  .principio .desc{
    color: var(--color-texto-secundario);
  }

  .principio input{
    background-color: var(--color-texto-principal);
    width: 100%;
    height: 5vh;
    border-radius: 16px;
    padding-left: 16px;
  }

  .principio h4{
    color: var(--verde);
  }

  .principio button{
    padding: 2px 18px;
    border: 1px solid var(--verde);
    border-radius: 16px;
    width: fit-content;
  }

</style>