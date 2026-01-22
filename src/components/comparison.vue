<script setup lang="ts">

import { ref, computed } from 'vue'

type ComparisonItem = {
  id: 'complexity' | 'learning' | 'scalability'
  title: string
  description: string
}

const items: ComparisonItem[] = [
  {
    id: 'complexity',
    title: 'Complejidad',
    description:
      'Comparación del nivel de complejidad entre Vue y JavaScript Vanilla en el desarrollo de aplicaciones.',
  },
  {
    id: 'learning',
    title: 'Curva de aprendizaje',
    description:
      'Análisis de cómo evoluciona la dificultad de aprendizaje a lo largo del tiempo en cada tecnología.',
  },
  {
    id: 'scalability',
    title: 'Escalabilidad',
    description:
      'Evaluación de cómo responde cada enfoque cuando el proyecto crece en tamaño y complejidad.',
  },
]       

const activeTab = ref<ComparisonItem['id']>('complexity')

const activeItem = computed(() =>
  items.find(item => item.id === activeTab.value)
)

</script>

<template>

    <section>

        <h4>Vue vs JS Vainilla</h4>

        <!-- Tabs -->
        <nav class="tabs bordeRojo">
            <button
            v-for="item in items"
            :key="item.id"
            :class="{ active: item.id === activeTab }"
            @click="activeTab = item.id"
            >
            {{ item.title }}
            </button>
        </nav>

          <!-- Content -->
        <div class="content bordeRojo">

            <p class="description">
            {{ activeItem?.description }}
            </p>
            <!-- Placeholder para gráficos -->
            <div class="chart-placeholder">
            <span>Gráfico de {{ activeItem?.title }}</span>
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

.tabs {
  display: flex;
  justify-content: space-evenly;
}

.tabs button {
  cursor: pointer;
  opacity: 0.6;
}

.tabs button.active {
  opacity: 1;
  font-weight: 600;
}

.content{
    display: flex;
    justify-content: space-evenly;
}
.description{
    width: 40%;
}

.chart-placeholder {
    height: 25vh;
    widows: 40%;
    opacity: 0.4;
}

</style>