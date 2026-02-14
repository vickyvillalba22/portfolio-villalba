<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay">
      <div class="modal-container">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.modal-container {
  background: var(--modal);
  padding: 2em;
  border-radius: 8px;
  width: 70%;
  min-height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 920px){
 
.modal-container {
  border-radius: 8px;
  width: 30%;
  min-height: 25%;
  max-height: 70vh;
}
  
}


</style>
