<script setup lang="ts">

interface VuePrinciple {
  id: string
  label: string
}

const props = defineProps<{
  principle: VuePrinciple
  isActive: boolean
}>()

const emit = defineEmits<{
  (e: 'select'): void
}>()

</script>

<template>

    <button
        :class="{ active: isActive }"
        class="fill"
        @click="emit('select')"
    >
        {{ principle.label }}
    </button>

</template>

<style scoped>

button{
    border: 0.5px solid rgba(255, 255, 255, 0.358);
    border-radius: 8px;
    padding: 5px 15px;
    background-color: var(--negro);
    font-family: var(--font-thin);
}

button.active{
    background-color: var(--verde);
    color: var(--negro);
    font-family: var(--font-bold);
    border: none;
}

.fill::after{
    background-color: var(--verde);
}



</style>