<script setup lang="ts">

import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  id: string
  label: string
  type: string
  placeholder?: string
  icon?: string
  hasEye?: boolean
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type !== 'password') return props.type
  return showPassword.value ? 'text' : 'password'
})

</script>

<template>

  <div class="input-wrapper">

    <label for="">{{ label }}</label>

    <div class="input-box">

        <input
        :id="id"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />

        <div class="icons">

            <Icon
            v-if="icon"
            :icon="icon"
            class="icon"
            />

            <button
            v-if="type === 'password' && hasEye"
            type="button"
            @click="showPassword = !showPassword"
            >
            <Icon :icon="showPassword ? 'hugeicons:view' : 'hugeicons:view-off'" class="icon" />
            </button>

        </div>

    </div>

  </div>

</template>

<style scoped>

.input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.input-box{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.icons{
    width: 95%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
}

input {
  width: 100%;
  padding: 12px 50px;
  border-radius: 8px;
  background-color: var(--blanco-suave);
  color: var(--color-texto-principal);
  font-family: var(--font-princ);
}

button{
    display: flex;
    pointer-events: auto;
}

.icon {
  color: var(--rosa);
  width: 24px;
  height: 24px;
}

label{
    font-size: 1.1em;
}

</style>
