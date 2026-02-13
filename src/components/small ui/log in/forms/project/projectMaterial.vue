<script setup lang="ts">

import Input from '@/components/small ui/log in/input.vue'

type Mode = 'add' | 'edit'

const props = defineProps<{
  mode: Mode
  descripcionLarga: string
  linkPrincipal: string
  linkSecundario: string
  imagen: string
  errors: Record<string, string>
  submitted: boolean
  touched: Record<string, boolean>
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

    <h3 class="mayus">{{ mode === 'add' ? 'Add project' : 'Edit project' }}</h3>
    <h4>2. Material</h4>

    <Input
      id="descripcionLarga"
      label="Long description"
      type="textarea"
      :modelValue="descripcionLarga"
      :error="errors.descripcionLarga"
      :submitted="submitted"
      :placeholder="mode === 'add'
        ? 'Write a detailed project description...'
        : undefined"
      :maxLength="200"
      autoResize
      @update:modelValue="emit('update:descripcionLarga', $event)"
    />

    <Input id="enlace1" label="Link 1" type="text"
      :modelValue="linkPrincipal"
      @update:modelValue="emit('update:linkPrincipal', $event)" />

    <Input id="enlace2" label="Link 2" type="text"
      :modelValue="linkSecundario"
      @update:modelValue="emit('update:linkSecundario', $event)" />

    <Input id="imagen" label="Image link" type="text"
      :modelValue="imagen"
      @update:modelValue="emit('update:imagen', $event)" />

    <div class="actions">
      <button class="button2 volver" @click="emit('back')">Previous step</button>
      <button class="confirm button2" @click="emit('submit')">
        {{ mode === 'add' ? 'Upload' : 'Update project' }}
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
  color: var(--negro);
}
h4{
    font-size: 20px;
    font-family: var(--font-princ);
}
h3{
    font-family: var(--font-thin);
}

.button2{
  padding: 8px 20px;
  border-radius: 8px;
  font-family: var(--font-princ);
}
.volver{
  border: 1px solid var(--blanco-suave)
}

</style>
