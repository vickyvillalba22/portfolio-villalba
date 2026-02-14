<script setup lang="ts">

import { ref, watch, computed } from 'vue'

import { Project } from '@/types/project'
import ProjectFormGeneral from '@/components/small ui/log in/forms/project/projectGeneral.vue'
import ProjectFormMaterial from '@/components/small ui/log in/forms/project/projectMaterial.vue'

import { validate } from '@/utils/validation/validate'
import { projectStep1Schema, projectStep2Schema } from '@/utils/validation/schemas'

type Mode = 'add' | 'edit'

const props = defineProps<{
  mode: Mode
  project?: Project
}>()

const emit = defineEmits<{
  (e: 'submit', project: Project): void
}>()

const step = ref<1 | 2>(1)

const submittedStep1 = ref(false)
const submittedStep2 = ref(false)

/* estado del proyecto */
const titulo = ref('')
const categoria = ref('')
const descripcionCorta = ref('')
const year = ref<number | null>(null)
const materia = ref('')
const herramientas = ref('')

const formStep1 = computed(() => ({
  titulo: titulo.value,
  categoria: categoria.value,
  descripcionCorta: descripcionCorta.value,
  year: year.value,
  materia: materia.value
}))

const descripcionLarga = ref('')
const linkPrincipal = ref('')
const linkSecundario = ref('')
const imagen = ref('')

const formStep2 = computed(() => ({
  descripcionLarga: descripcionLarga.value
}))

/* prefill en edit */
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

/* manejo de errores */
const errors = ref<Record<string, string>>({})
const touched = ref<Record<string, boolean>>({})

const validateStep1 = () => {
  const result = validate(formStep1.value, projectStep1Schema)
  errors.value = result.errors as Record<string, string>
  return result.valid
}

//validacion de step 1 antes de next step
const nextStep = () => {
  submittedStep1.value = true
  if (!validateStep1()) return
  step.value = 2
}

const prevStep = () => step.value = 1

const validateStep2 = () => {
  const result = validate(formStep2.value, projectStep2Schema)
  errors.value = result.errors as Record<string, string>
  return result.valid
}

const submit = () => {

  submittedStep2.value = true

  if (!validateStep2()) return

  const projectData = new Project(
    props.mode === 'edit' && props.project
      ? props.project.id
      : Date.now(),
    titulo.value,
    categoria.value,
    descripcionCorta.value,
    descripcionLarga.value,
    herramientas.value
      .split(',')
      .map(h => h.trim())
      .filter(h => h.length > 0),
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
  
  <section class="project-form sectionDesktop">

    <ProjectFormGeneral
      v-if="step === 1"
      :mode="mode"
      v-model:titulo="titulo"
      v-model:categoria="categoria"
      v-model:descripcionCorta="descripcionCorta"
      v-model:year="year"
      v-model:materia="materia"
      v-model:herramientas="herramientas"
      :errors="errors"
      :submitted="submittedStep1"
      :touched="touched"
      @next="nextStep"
    />

    <ProjectFormMaterial
      v-else
      :mode="mode"
      v-model:descripcionLarga="descripcionLarga"
      v-model:linkPrincipal="linkPrincipal"
      v-model:linkSecundario="linkSecundario"
      v-model:imagen="imagen"
      :errors="errors"
      :submitted="submittedStep2"
      :touched="touched"
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

@media (min-width: 920px){

  .sectionDesktop{
    width: 35%;
  }

}
</style>
