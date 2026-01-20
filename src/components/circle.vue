<script setup lang="ts">

import bIndexPpios from './small ui/b-index-ppios.vue'
import { ref, computed } from 'vue'

//datos tipados
interface VuePrinciple {
  id: string
  label: string
  component: string
  angle: number
}
const circularItems = ref<VuePrinciple[]>([
  { id: 'components', label: 'Components', component: 'ComponentsPrinciple', angle: 0 },
  { id: 'directives', label: 'Directives', component: 'DirectivesPrinciple', angle: 60 },
  { id: 'lifecycle', label: 'Lifecycle Hooks', component: 'LifecyclePrinciple', angle: 150 },
  { id: 'computed', label: 'Computed properties', component: 'ComputedPrinciple', angle: 210 },
  { id: 'reactivity', label: 'Reactivity', component: 'ReactivityPrinciple', angle: 300 },
])

//manejo del radio responsive y proporcionado
const circleSize = computed(() => {
  return Math.min(window.innerWidth * 0.6, 500)
})
const radius = computed(() => circleSize.value / 2.5)

//estilo del item (ubicacion)
const getItemStyle = (angle: number) => {
  const rad = (angle * Math.PI) / 180

  const x = Math.cos(rad) * radius.value
  const y = Math.sin(rad) * radius.value

  return {
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
  }
}

//estado activo
const activeId = ref<string>('components')
const setActive = (item: VuePrinciple) => {
  activeId.value = item.id
}


</script>

<template>

    <div class="contCircle">
    <div
        class="circle"
        :style="{ width: `${circleSize}px`, height: `${circleSize}px` }"
    >
        <bIndexPpios
        v-for="item in circularItems"
        :key="item.id"
        class="circle-item"
        :style="getItemStyle(item.angle)"
        :principle="item"
        :is-active="activeId === item.id"
        @select="setActive(item)"
        />
    </div>
    </div>

</template>

<style scoped>

.contCircle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  position: relative;
  aspect-ratio: 1 / 1;
  border: 2px solid #3ecf8e;
  border-radius: 50%;
}

.circle-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transition: transform 0.4s ease;
}


</style>