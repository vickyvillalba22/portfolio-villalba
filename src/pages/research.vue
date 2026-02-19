<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from 'vue'
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

import { useTypewriter, useRevealOnScroll, useCounterOnVisible } from '@/animations/composables';

const { displayed } = useTypewriter("Research")

const titleActive = ref(false)
const vueTitle = "Vue.js".split("")

onMounted(() => {
  requestAnimationFrame(() => {
    titleActive.value = true
  })
})

const heroRef = ref<HTMLElement | null>(null)
const { count, start, stop } = useCounterOnVisible(1000, 6500)

let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]

      if (entry.isIntersecting) {
        start()
      } else {
        stop()
      }
    },
    {
      threshold: 0.6 // solo cuando la mayor parte es visible
    }
  )

  if (heroRef.value) {
    observer.observe(heroRef.value)
  }
})

onBeforeUnmount(() => {
  if (heroRef.value) observer.unobserve(heroRef.value)
})

const principlesRef = ref<HTMLElement | null>(null)
useRevealOnScroll(principlesRef)

const whyRef = ref<HTMLElement | null>(null)
useRevealOnScroll(whyRef)

const quoteRef = ref<HTMLElement | null>(null)
useRevealOnScroll(quoteRef)

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
  parts: {
    text: string
    highlight?: boolean
  }[]
}

const reasons: ReasonItem[] = [
  {
    id: 'learning-curve',
    parts: [
      { text: 'Accesible ', highlight: true },
      { text: ' learning curve' }
    ]
  },
  {
    id: 'architecture',
    parts: [
      { text: 'Clear ', highlight: true },
      { text: ' architecture' }
    ]
  },
  {
    id: 'typescript',
    parts: [
      { text: 'Typescript ', highlight: true },
      { text: ' integration' }
    ]
  },
  {
    id: 'interactive-projects',
    parts: [
      { text: 'Ideal for ' },
      { text: ' highly interactive ', highlight: true },
      { text: ' projects' }
    ]
  },
]

</script>

<template>

    <main id="research">

        <h2 class="mayus">{{ displayed }}</h2>

        <section ref="heroRef" id="heroR">

          <Transition name="hero-title" appear>

            <div class="title">

              <h2 class="split-title" :class="{ active: titleActive }">
                <span
                  v-for="(letter, index) in vueTitle"
                  :key="index"
                  class="letter"
                  :style="{ transitionDelay: `${index * 80}ms` }"
                >
                  {{ letter }}
                </span>
              </h2>

              <h3 class="thin">Progressive framework for interactive interfaces</h3>
            </div>

          </Transition>


          <Transition name="hero-intro" appear>

            <div class="intro">

              <div class="izquierda">

                <img src="../assets/imgs/vue-logo.png" alt="">
                <p>Vue.js allows building scalable dynamic web applications by combining simplicity, reactivity, and reusable components.</p>
              </div>

              <p class="frase">
                Adopted by <span class="counter">{{ count }}</span> projects
              </p>

            </div>

          </Transition>


        </section>

        <section ref="principlesRef" class="principios reveal">

            <div class="principles-title">
              <span class="line"></span>
              <h4 class="mask-title">Key principles</h4>
            </div>

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

          <section ref="whyRef" class="reveal eleccion">

              <h4 class="why-title">
                <span class="highlight">Why did I choose Vue.js?</span>
              </h4>

              <p>I chose Vue.js as my research topic because of its balance between simplicity and power, and its suitability for academic and professional projects.</p>

                <transition-group
                  name="slide-left"
                  tag="div"
                  appear
                  class="contReasons"
                >

                  <div class="reason" v-for="(reason, index) in reasons" key="reason" :style="{ transitionDelay: `${index * 150}ms` }">

                      <Icon icon="hugeicons:arrow-right-02" class="i-mob" />
                      <p>
                        <span
                          v-for="(part, i) in reason.parts"
                          :key="i"
                          :class="{ marker: part.highlight }"
                        >
                          {{ part.text }}
                        </span>
                      </p>

                  </div>

                </transition-group>

          </section>

          <section ref="quoteRef" class="reveal contQuote">

            <img
              src="/src/assets/imgs/vue1-ill.png"
              alt=""
              class="image-reveal-base"
            />
            
            <p class="quote">Vue.js positions itself as a modern and efficient tool for developing <span class="marker">dynamic interfaces,</span> aligned with current <span class="marker">best practices</span> in web development.</p>

          </section>

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
    gap: 1em;

    color: var(--color-texto-principal);
}

section{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10em;
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
    font-size: 1.5em;
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
    border-radius: 16px;
}

.principio button{
    padding: 2px 18px;
    width: fit-content;
}

/*ELECCION*/
.eleccion p{
    font-size: 1.1em;
}
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
.why-title span{
  font-family: var(--font-thin);
}

/*CIERRE*/
.finalSection{
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 10em;
}
.contQuote{
  display: flex;
  flex-direction: column;
  gap: 4em;
}
.contQuote img{
  width: 100%;
  height: 40vh;
  object-fit: contain;
}
.quote{
    font-size: 24px;
    line-height: 35px;
}
.quote span{
    color: var(--verde);
}
.reveal.is-visible .quote .marker::after {
  transition-delay: 800ms;
}
.reveal.is-visible .quote .marker {
  transition-delay: 800ms;
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
  font-size: 1.2em;
}
.contQuote{
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.contQuote img{
  display: block;
  width: 40%;
}
}

@media (min-width: 700px){
  .finalSection{
    margin-bottom: 4em;
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