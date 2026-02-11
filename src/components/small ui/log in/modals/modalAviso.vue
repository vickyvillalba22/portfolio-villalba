<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseModal from '@/components/small ui/log in/modals/baseModal.vue'

const props = defineProps<{
  modelValue: boolean
  image?: string
  message: string
  buttonText: string
  buttonColor?: 'admin' | 'user' | 'error' | 'success'
  action?: () => void
  route?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const router = useRouter()

function handleAction() {
  if (props.action) props.action()
  if (props.route) router.push(props.route)
  emit('update:modelValue', false)
}

function getColor() {
  switch (props.buttonColor) {
    case 'admin': return 'var(--rosa)'
    case 'user': return 'var(--azul)'
    case 'error': return 'var(--rojo)'
    case 'success': return 'var(--verde)'
    default: return 'var(--azul)'
  }
}
</script>

<template>
  <BaseModal :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div class="modal-content">
      
      <img v-if="image" :src="image" class="modal-image" />

      <p class="modal-message">
        {{ message }}
      </p>

      <button
        class="modal-button"
        :style="{ backgroundColor: getColor() }"
        @click="handleAction"
      >
        {{ buttonText }}
      </button>

    </div>
  </BaseModal>
</template>

<style scoped>
.modal-content {
  text-align: center;
}

.modal-image {
  max-width: 120px;
  margin-bottom: 1rem;
}

.modal-message {
  margin-bottom: 1.5rem;
}

.modal-button {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
