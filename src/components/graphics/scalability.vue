<script setup lang="ts">
defineProps<{
  data: {
    path: string
  }
}>()
</script>

<template>
  <section
    class="chart chart-growth"
    aria-label="Escalabilidad de la aplicación"
  >
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-hidden="true"
    >
      <!-- Ejes -->
      <line x1="10" y1="10" x2="10" y2="90" class="axis" />
      <line x1="10" y1="90" x2="90" y2="90" class="axis" />

      <!-- Crecimiento -->
      <path
        :d="data.path"
        class="growth-path"
      />
    </svg>

    <p class="caption">
      Project growth as its complexity increases.
    </p>
  </section>
</template>

<style scoped>
.chart-growth {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

svg {
  width: 100%;
  height: 220px;
}

.axis {
  stroke: rgba(0, 0, 0, 0.2);
  stroke-width: 1;
}

.growth-path {
  fill: none;
  stroke: var(--negro);
  stroke-width: 3;
  stroke-linecap: round;

  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: draw-growth 1s ease forwards;
}

.caption {
  font-size: 0.85rem;
  max-width: 260px;
  opacity: 0.8;
}

@keyframes draw-growth {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
