<script setup lang="ts">

import { ref, computed, watch, nextTick } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {

  id: string
  label: string
  type: string
  placeholder?: string
  icon?: string
  hasEye?: boolean
  modelValue: string

  maxLength?: number
  autoResize?: boolean 

  error?: string
  submitted?: boolean

}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

//touched
const touched = ref(false)
const onBlur = () => {
  touched.value = true
}

const showPassword = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const inputType = computed(() => {
  if (props.type !== 'password') return props.type
  return showPassword.value ? 'text' : 'password'
})

// auto resize
const resizeTextarea = async () => {
  if (!props.autoResize || !textareaRef.value) return
  await nextTick()
  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
}

// observar cambios
watch(
  () => props.modelValue,
  () => resizeTextarea(),
  { immediate: true }
)

// limitar caracteres
const handleTextareaInput = (e: Event) => {
  let value = (e.target as HTMLTextAreaElement).value

  if (props.maxLength) {
    value = value.slice(0, props.maxLength)
  }

  emit('update:modelValue', value)
}

//calendario
const openCalendar = () => {
  // Chrome / Edge
  inputRef.value?.showPicker?.()
  // fallback
  inputRef.value?.focus()
}
const today = computed(() => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString().split('T')[0]
})

</script>

<template>

  <div class="input-wrapper">

    <label for="">{{ label }}</label>

    <div class="input-box">

        <input
          v-if="type !== 'textarea'"
          ref="inputRef"
          :id="id"
          :type="inputType"
          :placeholder="placeholder"
          :value="modelValue"
          :class="{ error: error && (touched || submitted) }"
          @blur="onBlur"
          v-bind="type === 'date' ? { max: today } : {}"
          @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />

        <div v-else class="areaWrapper">

          <textarea
            ref="textareaRef"
            :id="id"
            :placeholder="placeholder"
            :value="modelValue"
            :maxlength="maxLength"
            rows="1"
            :class="{ error: error && touched }"
            @blur="onBlur"
            @input="handleTextareaInput"
          ></textarea>
          <p v-if="type === 'textarea' && maxLength" class="counter">
            {{ modelValue.length }} / {{ maxLength }}
          </p>

        </div>

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
            class="eye"
            >
            <Icon :icon="showPassword ? 'hugeicons:view' : 'hugeicons:view-off'" class="icon" />
            </button>

            <!-- calendario -->
            <button
              v-if="type === 'date'"
              type="button"
              class="calendar"
              @click="openCalendar"
            >
              <Icon icon="hugeicons:calendar-03" class="icon" />
            </button>

        </div>

    </div>

    <p v-if="error && (touched || submitted)" class="error-text">
      {{ error }}
    </p>

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
    position: absolute;
    pointer-events: none;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
}

input, textarea {
  width: 100%;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: var(--forms1);
  color: var(--color-texto-principal);
  font-family: var(--font-princ);
}

button{
    display: flex;
    pointer-events: auto;
}

.icon {
  color: var(--accent, var(--rosa));
  width: 24px;
  height: 24px;
}

.eye{
  display: flex;
  pointer-events: auto;
}

label{
    font-size: 1.1em;
    font-family: var(--font-princ);
}

/*text area*/
.areaWrapper{
  width: 100%;
}
textarea {
  resize: vertical;
  min-height: 80px;
  overflow: hidden;
}
.counter {
  align-self: flex-end;
  font-size: 0.8em;
  opacity: 0.6;
}

/*calendario*/
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
}

/*error*/
input.error,
textarea.error {
  border: 1px solid #ff6b6b;
}

.error-text {
  font-size: 0.8em;
  color: #ff6b6b;
}

</style>
