<script setup lang="ts">

import { ref, watch } from 'vue'

import { Project } from '@/types/project'
import ProjectFormGeneral from '@/components/small ui/log in/forms/project/projectGeneral.vue'
import ProjectFormMaterial from '@/components/small ui/log in/forms/project/projectMaterial.vue'

type Mode = 'add' | 'edit'

const props = defineProps<{
  mode: Mode
  project?: Project
}>()

const emit = defineEmits<{
  (e: 'submit', project: Project): void
}>()

const step = ref<1 | 2>(1)

/* ---------- estado del proyecto ---------- */
const titulo = ref('')
const categoria = ref('')
const descripcionCorta = ref('')
const year = ref<number | null>(null)
const materia = ref('')
const herramientas = ref('')

const descripcionLarga = ref('')
const linkPrincipal = ref('')
const linkSecundario = ref('')
const imagen = ref('')

/* ---------- prefill en edit ---------- */
watch(
  () => props.project,
  (p) => {
    if (!p) return

    titulo.value = p.titulo
    categoria.value = p.categoria
    descripcionCorta.value = p.descripcionCorta
    year.value = p.year
    materia.value = p.materia
    herramientas.value = p.herramientas.join(', ')

    descripcionLarga.value = p.descripcionLarga
    linkPrincipal.value = p.linkPrincipal
    linkSecundario.value = p.linkSecundario
    imagen.value = p.imagen
  },
  { immediate: true }
)

/* ---------- navegación ---------- */
const nextStep = () => step.value = 2
const prevStep = () => step.value = 1

const submit = () => {
  const projectData = new Project(
    props.mode === 'edit' && props.project
      ? props.project.id
      : Date.now(),

    titulo.value,
    categoria.value,
    descripcionCorta.value,
    descripcionLarga.value,
    herramientas.value.split(',').map(h => h.trim()),
    linkPrincipal.value,
    linkSecundario.value,
    year.value!,
    materia.value,
    imagen.value,
    props.mode === 'edit' && props.project
      ? props.project.mostrar
      : true
  )

  emit('submit', projectData)
}

</script>

<template>
  <section class="project-form">

    <ProjectFormGeneral
      v-if="step === 1"
      :mode="mode"
      v-model:titulo="titulo"
      v-model:categoria="categoria"
      v-model:descripcionCorta="descripcionCorta"
      v-model:year="year"
      v-model:materia="materia"
      v-model:herramientas="herramientas"
      @next="nextStep"
    />

    <ProjectFormMaterial
      v-else
      :mode="mode"
      v-model:descripcionLarga="descripcionLarga"
      v-model:linkPrincipal="linkPrincipal"
      v-model:linkSecundario="linkSecundario"
      v-model:imagen="imagen"
      @back="prevStep"
      @submit="submit"
    />

  </section>
</template>

<style scoped>
.project-form {
  width: 100%;
  padding: 24px;
  min-height: 90vh;
}
</style>
