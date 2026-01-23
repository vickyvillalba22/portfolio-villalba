<script setup lang="ts">
defineProps<{
  data: {
    vue: number
    vanilla: number
  }
}>()
</script>

<template>
  <section
    class="chart chart-bars"
    aria-label="Comparación de complejidad entre Vue y JavaScript Vanilla"
  >
    <div class="bars">

      <figure class="bar-group">
        <div
          class="bar vue"
          :style="{ '--value': data.vue }"
        ></div>
        <figcaption>Vue</figcaption>
      </figure>

      <figure class="bar-group">
        <div
          class="bar vanilla"
          :style="{ '--value': data.vanilla }"
        ></div>
        <figcaption>JS Vanilla</figcaption>
      </figure>

    </div>
  </section>
</template>

<style scoped>
.chart {
  width: 50%;
  display: flex;
  align-items: flex-end;
}

.bars {
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  height: 200px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.bar {
  width: 40px;
  height: calc(var(--value) * 30px);
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 8px 8px 0 0;

  transform: scaleY(0);
  transform-origin: bottom;
  animation: grow-bar 0.6s ease forwards;
}

.bar.vue {
  background-color: var(--blanco);
}

.bar.vanilla {
  background-color: var(--negro);
}

@keyframes grow-bar {
  to {
    transform: scaleY(1);
  }
}
</style>
