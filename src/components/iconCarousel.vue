<script setup lang="ts">

import { inject, ref } from 'vue'
import { Icon } from '@iconify/vue'

//comportamiento del carousel
const subCarRef = ref<HTMLElement | null>(null)
const itemWidth = 100 // icono + gap

const next = () => {

  if (!subCarRef.value) return

  subCarRef.value.scrollBy({
    left: itemWidth,
    behavior: 'smooth'
  })

}

const prev = () => {
  if (!subCarRef.value) return

  subCarRef.value.scrollBy({
    left: -itemWidth,
    behavior: 'smooth'
  })
}

interface CarouselItem {
  id: number
  icon: string
  alt: string
}

const items = inject<CarouselItem[]>('carousel-items')

if (!items) {
  throw new Error('IconCarousel: no carousel items provided')
}

</script>

<template>

  <div class="carousel">

    <button @click="prev">
      <Icon icon="hugeicons:arrow-left-01" class="i-mob" />
    </button>

    <div class="sub-car" ref="subCarRef">

        <div v-for="item in items" :key="item.id">
          <Icon
            :icon="item.icon"
            class="carousel-icon"
            role="img"
            :aria-label="item.alt"
          />
        </div>

    </div>

    <button @click="next">
      <Icon icon="hugeicons:arrow-right-01" class="i-mob" />
    </button>

  </div>

</template>


<style scoped>

.carousel{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.sub-car{

  display: flex;
  width: 80%;
  gap: 50px;

  overflow-x: hidden;
  overflow-x: auto;
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* IE / Edge viejo */

}
.sub-car::-webkit-scrollbar {
  display: none;   /* Chrome, Safari */
}

.sub-car {
  scroll-snap-type: x mandatory;
}
.sub-car > div {
  scroll-snap-align: start;
}

.carousel-icon{
  width: 50px;
  height: 50px;
}


</style>