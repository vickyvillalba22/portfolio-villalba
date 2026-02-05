<script setup lang="ts">

import Input from '@/components/small ui/log in/input.vue'

type Mode = 'add' | 'edit'

defineProps<{
  mode: Mode
  titulo: string
  categoria: string
  descripcionCorta: string
  year: number | null
  materia: string
  herramientas: string
}>()

const emit = defineEmits([
  'update:titulo',
  'update:categoria',
  'update:descripcionCorta',
  'update:year',
  'update:materia',
  'update:herramientas',
  'next'
])
</script>

<template>
  <section class="step">

    <h3 class="mayus">{{ mode === 'add' ? 'Agregar proyecto' : 'Editar proyecto' }}</h3>
    <h4>1. Información general</h4>

    <Input id="titulo" label="Título" type="text" :modelValue="titulo"
      @update:modelValue="emit('update:titulo', $event)" />

    <Input id="año" label="Año" type="number" :modelValue="year?.toString() ?? ''"
      @update:modelValue="emit('update:year', Number($event))" />

    <Input id="categoria" label="Categoría" type="text" :modelValue="categoria"
      @update:modelValue="emit('update:categoria', $event)" />

    <Input id="descripcionBreve" label="Descripción breve" type="text" :modelValue="descripcionCorta"
      @update:modelValue="emit('update:descripcionCorta', $event)" />

    <div class="type-buttons">
      <button class="active">Materia</button>
      <button>Trabajo</button>
    </div>

    <Input id="nombreMateria" label="Nombre de la materia" type="text" :modelValue="materia"
      @update:modelValue="emit('update:materia', $event)" />

    <Input id="herramientas" label="Herramientas utilizadas" type="text" :modelValue="herramientas"
      @update:modelValue="emit('update:herramientas', $event)" />

    <button class="next button1" @click="emit('next')">Next</button>

  </section>
</template>

<style scoped>
.step {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.next {
  align-self: flex-end;
  border: 1px solid var(--rosa);
}

.type-buttons {
  display: flex;
  justify-content: space-between;
}
.type-buttons button{
    width: 45%;
    border-radius: 8px;
    background-color: var(--forms1);
    padding: 12px;
}
.type-buttons button.active{
    background-color: var(--rosa);
}

h4{
    font-size: 20px;
    font-family: var(--font-princ);
}
h3{
    font-family: var(--font-thin);
}
</style>
