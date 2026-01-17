<script setup lang="ts">

import { inject, ref } from 'vue'
import { Icon } from '@iconify/vue'

interface CarouselItem {
  id: number
  icon: string
  alt: string
}

const items = inject<CarouselItem[]>('carousel-items')

if (!items) {
  throw new Error('IconCarousel: no carousel items provided')
}

const currentIndex = ref(0)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % items.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + items.length) % items.length
}
</script>

<template>
  <div class="carousel">
    <button class="arrow" @click="prev" aria-label="Anterior">
      <Icon icon="hugeicons:arrow-left-01" class="i-mob" />
    </button>

    <div class="carousel-content">
      <Icon
        :icon="items[currentIndex].icon"
        class="carousel-icon"
        role="img"
      />
    </div>

    <button class="arrow" @click="next" aria-label="Siguiente">
      <Icon icon="hugeicons:arrow-right-01" class="i-mob" />
    </button>
  </div>
</template>

<style scoped>

.carousel {
  display: flex;
  align-items: center;
}

.arrow {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.carousel-content {
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-image {
  width: 80px;
  height: auto;
}


</style>