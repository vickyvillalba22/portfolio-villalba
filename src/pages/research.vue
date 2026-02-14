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
    text: 'Accesible learning curve',
    animation: {
      type: 'slide',
      delay: 0,
    },
  },
  {
    id: 'architecture',
    text: 'Clear architecture',
    animation: {
      type: 'slide',
      delay: 100,
    },
  },
  {
    id: 'typescript',
    text: 'Typescript integration',
    animation: {
      type: 'slide',
      delay: 200,
    },
  },
  {
    id: 'interactive-projects',
    text: 'Ideal for highly interactive projects',
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
                <h3 class="thin">Progressive framework for interactive interfaces</h3>
            </div>

            <div class="intro">

              <div class="izquierda">

                <img src="../assets/imgs/vue-logo.png" alt="">
                <p>Vue.js allows building scalable dynamic web applications by combining simplicity, reactivity, and reusable components.</p>
              </div>

              <p class="frase">Adopted by <span>1000</span> projects</p>

            </div>

        </section>

        <section class="principios">

            <h4>Key principles</h4>

            <div class="contGraficoPrinc">
              <Circle
                :items="vuePrinciples"
                :active-id="activePrinciple.id"
                @select="activePrinciple = $event"
              />

              <Transition name="fade-slide" mode="out-in">
                <component :is="activePrinciple.component" />
              </Transition>
            </div>

        </section>

        <Comparison />

        <div class="finalSection">

          <section class="eleccion">

              <h4>Why did I choose Vue.js?</h4>

              <p>I chose Vue.js as my research topic because of its balance between simplicity and power, and its suitability for academic and professional projects.</p>

              <div class="contReasons">

                  <div class="reason" v-for="reason in reasons">
                      <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
                      <p>{{ reason.text }}</p>
                  </div>

              </div>


          </section>

          <p class="quote">Vue.js positions itself as a modern and efficient tool for developing <span>dynamic interfaces</span>, aligned with current <span>best practices</span> in web development.</p>

        </div>

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

h2{
    width: 100%;
    font-size: 2.2em;
    font-family: var(--font-thin);
}

/* HERO SECTION */
#heroR{
    gap: 30px;
}
.title h2{
    width: 100%;
    font-size: 2.8em;
    font-family: var(--font-bold);
}
h4{
    font-size: 40px;
    font-family: var(--font-thin);
}
.intro{
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    gap: 30px;
}
.intro .derecha{
  display: flex;
  gap: 40px;
}
.intro img{
    width: 30%;
    object-fit: contain;
}
.frase{
    font-size: 20px;
    width: fit-content;
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
.contGraficoPrinc{
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}
.principios h4{
  width: 100%;
}

.principio{
    width: 85%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 8px 8px 16px rgba(148, 147, 147, 0.35);
}

.principio button{
    padding: 2px 18px;
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
.finalSection{
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.quote{
    font-size: 24px;
    line-height: 35px;
}
.quote span{
    color: var(--verde);
}

@media (min-width: 920px){

#research{
  gap: 6em;
}

.intro{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.title h2, .title h3{
  width: 100%;
  display: flex;
  justify-content: center;
}
.title h2{
  font-size: 4em;
}
.title h3{
  font-size: 1.5em;
}
.intro .izquierda{
  width: 40%;
  display: flex;
  gap: 40px;
}
.intro p{
  font-size: 1.2em;
  display: flex;
  align-items: center;
}
.intro .frase{
  font-size: 2em;
  display: block;
}
.principios{
  justify-content: center;
}
.principios h4{
  display: flex;
  justify-content: center;
  width: 100%;
}
.contGraficoPrinc{
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.principio{
  width: 40%;
}
.finalSection{
  display: flex;
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4em;
}
.eleccion{
  width: 45%;
}
.quote{
  width: 45%;
}
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

</style>