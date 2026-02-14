<script setup lang="ts">

import bIndexPpios from './small ui/b-index-ppios.vue'
import { ref, computed } from 'vue'
import type { Component } from 'vue'

interface VuePrinciple {
  id: string
  label: string
  component: Component
  angle: number
}

const props = defineProps<{
  items: VuePrinciple[]
  activeId: string
}>()

const emit = defineEmits<{
  (e: 'select', principle: VuePrinciple): void
}>()

//manejo del radio responsive y proporcionado
const circleSize = computed(() => {
  return Math.min(window.innerWidth * 0.6, 400)
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

</script>

<template>

    <div class="contCircle">
    <div
        class="circle"
        :style="{ width: `${circleSize}px`, height: `${circleSize}px` }"
    >
        <bIndexPpios
          v-for="item in props.items"
          :key="item.id"
          class="circle-item"
          :style="getItemStyle(item.angle)"
          :principle="item"
          :is-active="props.activeId === item.id"
          @select="emit('select', item)"
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
  border: 2px solid var(--verde);
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