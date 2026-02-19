<script setup lang="ts">
import { Icon } from '@iconify/vue';


interface Props {
  title?: string
  message: string
  code?: number
  showRetry?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'retry'): void
}>()

const handleRetry = () => {
  emit('retry')
}
</script>

<template>
  <div class="error-container">
    <div class="error-card sectionDesktop">
    <Icon icon="hugeicons:alert-02" class="i-mob"></Icon>
      <h2 class="error-title">
        {{ title || 'Something went wrong' }}
      </h2>

      <p v-if="code" class="error-code">
        Error {{ code }}
      </p>

      <p class="error-message">
        {{ message }}
      </p>

      <button
        v-if="showRetry"
        class="retry-btn"
        @click="handleRetry"
      >
        Try again
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.error-card {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: var(--color-surface);
  max-width: 400px;
}

.error-title {
  margin-bottom: 0.5rem;
}

.i-mob{
    color: var(--rojo);
}

.error-code {
  font-weight: bold;
  color: var(--rojo);
  margin-bottom: 0.5rem;
}

.error-message {
  margin-bottom: 1.5rem;
}

.retry-btn {
  padding: 8px 16px;
  border: 1px solid var(--color-texto-secundario);
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-princ);
}
.retry-btn:hover{
    background-color: var(--blanco-suave);
}
</style>
