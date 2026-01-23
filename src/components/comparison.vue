<script setup lang="ts">

import { ref, computed } from 'vue'
import type { ComparisonItem } from '@/types/comparisonItem'

import Complexity from './graphics/complexity.vue'
import LearningCurve from './graphics/learningCurve.vue'
import Scalability from './graphics/scalability.vue'

const items: ComparisonItem[] = [
  {
    id: 'complexity',
    title: 'Complexity',
    description:
      'Comparación del nivel de complejidad entre Vue y JavaScript Vanilla.',
    chart: 'bars',
    data: {
      vue: 2,
      vanilla: 4,
    },
  },
  {
    id: 'learning',
    title: 'Learning curve',
    description:
      'Evolución de la dificultad de aprendizaje a lo largo del tiempo.',
    chart: 'curve',
    data: {
      vuePath: 'M10 80 Q50 20 90 30',
      vanillaPath: 'M10 70 Q50 40 90 10',
    },
  },
  {
    id: 'scalability',
    title: 'Scalability',
    description:
      'Comportamiento del proyecto cuando aumenta su tamaño y complejidad.',
    chart: 'growth',
    data: {
      path: 'M10 90 L50 40 L90 20',
    },
  },
]

const activeTab = ref<ComparisonItem['id']>('complexity')

const activeItem = computed(() =>
  items.find(item => item.id === activeTab.value)
)


const barsData = computed(() => {
  if (activeItem.value?.chart !== 'bars') return null
  return activeItem.value.data as { vue: number; vanilla: number }
})

const curveData = computed(() => {
  if (activeItem.value?.chart !== 'curve') return null
  return activeItem.value.data as {
    vuePath: string
    vanillaPath: string
  }
})

const growthData = computed(() => {
  if (activeItem.value?.chart !== 'growth') return null
  return activeItem.value.data as { path: string }
})

</script>

<template>

    <section class="comparison">

        <h4>Vue vs JS Vainilla</h4>

        <div>
          <!-- Tabs -->
          <nav class="tabs">
              <button
              v-for="item in items"
              :key="item.id"
              :class="[
                { active: item.id === activeTab },
                item.id,
              ]"
              @click="activeTab = item.id"
              >
              {{ item.title }}
              </button>
          </nav>

            <!-- Content -->
          <div class="content" :class="activeTab">

              <p class="description">
              {{ activeItem?.description }}
              </p>

              <!--GRAFICOS-->
              <!-- Complejidad -->
              <Complexity
                v-if="barsData"
                :data="barsData"
              />

              <!-- Curva de aprendizaje -->
              <LearningCurve
                v-if="curveData"
                :data="curveData"
              />

              <!-- Escalabilidad -->
              <Scalability
                v-if="growthData"
                :data="growthData"
              />

          </div>

        </div>

    </section>

</template>

<style scoped>

section{
    display: flex;
    flex-direction: column;
    gap: 2em;
}

nav, .tabs, .content{
  color: var(--negro);
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  position: relative;
}

.tabs button {
  cursor: pointer;
  font-family: var(--font-princ);
  width: 100%;
  padding: 8px 16px;
  border-radius: 16px 16px 0 0;
  border: none;
  cursor: pointer;
  opacity: 0.8;
}

.complexity{
  background-color: var(--verde1);
}
.learning{
  background-color: var(--verde2);
}
.scalability{
  background-color: var(--verde3);
}

.tabs button.active {
  opacity: 1;
  font-family: var(--font-bold);
}

.content{
  display: flex;
  justify-content: space-evenly;
  border-radius: 0 0 16px 16px;
  padding: 1.5em 0.1em;
}
.description{
  width: 40%;
}

</style>
