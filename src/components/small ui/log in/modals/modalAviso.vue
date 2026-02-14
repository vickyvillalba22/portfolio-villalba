<script setup lang="ts">

import { useRouter } from 'vue-router'
import { computed } from 'vue'

import BaseModal from '@/components/small ui/log in/modals/baseModal.vue'

import successImg from '@/assets/imgs/success1.png'
import errorImg from '@/assets/imgs/error1.png'

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

const resolvedImage = computed(() => {
  if (props.image) return props.image

  if (props.buttonColor === 'success') return successImg
  if (props.buttonColor === 'error') return errorImg

  return undefined
})

</script>

<template>
  <BaseModal :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div class="modal-content">
      
        <img
            v-if="resolvedImage"
            :src="resolvedImage"
            class="modal-image"
        />

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
  max-width: 30vw;
  margin-bottom: 1rem;
}

.modal-message {
  margin-bottom: 1.5rem;
  font-size: 1.8em;
  font-family: var(--font-thin);
}

.modal-button {
  padding: 10px 25px;
  border-radius: 8px;
  border: none;
  color: var(--negro);
  font-family: var(--font-princ);
  cursor: pointer;
}

@media (min-width: 920px){

.modal-image {
  max-width: 10vw;
  margin-bottom: 1rem;
}

}

@media (min-width: 700px){
  .modal-image {
    max-width: 20vw;
    margin-bottom: 1rem;
  }
}

</style>
