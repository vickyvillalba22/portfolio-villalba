<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  modelValue: 'all' | 'admin' | 'user'
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="filters">

    <Icon icon="hugeicons:filter" class="i-mob" />

    <button
      v-for="opt in ['all', 'admin', 'user']"
      :key="opt"
      :class="{ active: modelValue === opt }"
      @click="emit('update:modelValue', opt)"
    >
      {{ opt === 'all' ? 'All' : opt === 'admin' ? 'Admin' : 'Users' }}
    </button>
  </div>
</template>

<style scoped>

.i-mob{
    width: 24px;
    color: var(--rosa);
}

.filters {
  display: flex;
  gap: 12px;
}

button {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-family: var(--font-princ);
}

button.active {
  color: var(--blanco);
  font-family: var(--font-bold);
}
</style>
