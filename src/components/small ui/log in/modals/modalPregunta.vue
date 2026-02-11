<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseModal from '@/components/small ui/log in/modals/baseModal.vue'

const props = defineProps<{
  modelValue: boolean
  question: string
  confirmText: string
  cancelText: string
  confirmColor?: 'admin' | 'user' | 'error' | 'success'
  onConfirm?: () => void
  onCancel?: () => void
  confirmRoute?: string
  cancelRoute?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const router = useRouter()

function handleConfirm() {
  if (props.onConfirm) props.onConfirm()
  if (props.confirmRoute) router.push(props.confirmRoute)
  emit('update:modelValue', false)
}

function handleCancel() {
  if (props.onCancel) props.onCancel()
  if (props.cancelRoute) router.push(props.cancelRoute)
  emit('update:modelValue', false)
}

function getColor() {
  switch (props.confirmColor) {
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
      
      <p>
        {{ question }}
      </p>

      <div class="modal-actions">
        <button
          class="btn-cancel"
          @click="handleCancel"
        >
          {{ cancelText }}
        </button>

        <button
          class="btn-confirm"
          :style="{ backgroundColor: getColor() }"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </button>
      </div>

    </div>
  </BaseModal>
</template>

<style scoped>

.modal-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  width: 100%;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
}
button{
    width: 50%;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
}

.btn-confirm {
  border: none;
}

.btn-cancel {
  background: transparent;
  border: 1px solid var(--blanco-suave);
}
</style>
