<script setup lang="ts">
defineProps<{
  data: {
    vuePath: string
    vanillaPath: string
  }
}>()
</script>

<template>
  <section
    class="chart chart-curve"
    aria-label="Curva de aprendizaje de Vue y JavaScript Vanilla"
  >
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-hidden="true"
    >
      <!-- Ejes (opcionales, simples) -->
      <line x1="10" y1="10" x2="10" y2="90" class="axis" />
      <line x1="10" y1="90" x2="90" y2="90" class="axis" />

      <!-- Curva Vue -->
      <path
        :d="data.vuePath"
        class="curve vue"
      />

      <!-- Curva Vanilla -->
      <path
        :d="data.vanillaPath"
        class="curve vanilla"
      />
    </svg>

    <div class="legend">
      <span class="vue">Vue</span>
      <span class="vanilla">JS Vanilla</span>
    </div>
  </section>
</template>

<style scoped>
.chart-curve {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

svg {
  width: 100%;
  height: 220px;
}

.axis {
  stroke: rgba(0, 0, 0, 0.2);
  stroke-width: 1;
}

.curve {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;

  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: draw-line 1s ease forwards;
}

.curve.vue {
  stroke: var(--negro);
}

.curve.vanilla {
  stroke: var(--blanco);
}

.legend {
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
}

.legend .vue::before,
.legend .vanilla::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 3px;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.legend .vue::before {
  background-color: var(--blanco);
}

.legend .vanilla::before {
  background-color: var(--negro);
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
