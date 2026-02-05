<script setup lang="ts">
import Input from '@/components/small ui/log in/input.vue'

type Mode = 'add' | 'edit'

defineProps<{
  mode: Mode
  descripcionLarga: string
  linkPrincipal: string
  linkSecundario: string
  imagen: string
}>()

const emit = defineEmits([
  'update:descripcionLarga',
  'update:linkPrincipal',
  'update:linkSecundario',
  'update:imagen',
  'back',
  'submit'
])
</script>

<template>
  <section class="step">

    <h4>2. Material</h4>

    <Input id="descripcionLarga" label="Descripción larga" type="text"
      :modelValue="descripcionLarga"
      @update:modelValue="emit('update:descripcionLarga', $event)" />

    <Input id="enlace1" label="Enlace 1" type="text"
      :modelValue="linkPrincipal"
      @update:modelValue="emit('update:linkPrincipal', $event)" />

    <Input id="enlace2" label="Enlace 2" type="text"
      :modelValue="linkSecundario"
      @update:modelValue="emit('update:linkSecundario', $event)" />

    <!--VER SI DEJO UNA IMAGEN LINK O SUBIR UNA IMAGEN-->
    <Input id="imagen" label="Imagen" type="text"
      :modelValue="imagen"
      @update:modelValue="emit('update:imagen', $event)" />

    <div class="actions">
      <button @click="emit('back')">Volver</button>
      <button class="confirm" @click="emit('submit')">
        {{ mode === 'add' ? 'Subir' : 'Actualizar' }}
      </button>
    </div>

  </section>
</template>

<style scoped>
.step {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.actions {
  display: flex;
  justify-content: space-between;
}
.confirm {
  background: var(--rosa);
}
</style>
