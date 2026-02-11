<script setup lang="ts">

import { ref, computed, watch } from 'vue'

import { Icon } from '@iconify/vue'

import Input from '@/components/small ui/log in/input.vue'
import { User, UserRole } from '@/types/user'
import { addUser, updateUser } from '@/utils/users'

import { validate } from '@/utils/validation/validate'
import { userAddSchema, userEditSchema } from '@/utils/validation/schemas'

type Mode = 'add' | 'edit' | 'profile'
type Variant = 'admin' | 'user'

const props = defineProps<{
  mode: Mode
  variant: Variant
  user?: User
}>()

const emit = defineEmits<{
  (e: 'success', user: User): void
}>()

/* estado del form */

const name = ref('')
const password = ref('')
const repeatPassword = ref('')
const email = ref('')
const role = ref<UserRole>('user')
const registerDate = ref('')
const avatar = ref<string | undefined>(undefined)

const form = computed(() => ({
  name: name.value,
  email: email.value,
  password: password.value,
  repeatPassword: repeatPassword.value,
  registerDate: registerDate.value
}))

const submitted = ref(false)

/* prefill */
watch(
  () => props.user,
  (u) => {
    if (!u) return
    name.value = u.name
    email.value = u.email
    role.value = u.role
    registerDate.value = u.registerDate
    avatar.value = u.avatar
  },
  { immediate: true }
)

/*manejo de errores*/
const errors = ref<Record<string, string>>({})
const schema = computed(() => {
  if (props.mode === 'add') return userAddSchema
  if (props.mode === 'edit') return userEditSchema
  return userEditSchema
})
const validateForm = () => {
  const result = validate(form.value, schema.value)
  errors.value = result.errors as Record<string, string>
  return result.valid
}

/*manejo de imagen*/
const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    avatar.value = reader.result as string
  }
  reader.readAsDataURL(file)
}

/* submit */
const submit = () => {

  submitted.value = true

  if (props.mode === 'profile' && props.user) {
    props.user.name = name.value
    props.user.email = email.value
    props.user.usuario = email.value.split('@')[0]

    if (password.value) {
      props.user.password = password.value
    }

    props.user.avatar = avatar.value
    updateUser(props.user)
    emit('success', props.user)
  }

  if (!validateForm()) return

  // add: crea uno nuevo
  if (props.mode === 'add') {
    const user = new User(
      Date.now(),
      name.value,
      email.value.split('@')[0],
      email.value,
      password.value,
      role.value,
      false,
      registerDate.value,
      [],
      avatar.value
    )

    addUser(user)
    emit('success', user)
    return
  }

  // edit: muta el existente
  if (props.mode === 'edit' && props.user) {
    props.user.name = name.value
    props.user.email = email.value
    props.user.usuario = email.value.split('@')[0]
    props.user.role = role.value
    props.user.registerDate = registerDate.value

    if (password.value) {
      props.user.password = password.value
    }

    props.user.avatar = avatar.value
    updateUser(props.user)
    emit('success', props.user)
  }
}

</script>

<template>

  <section :class="['user-form', variant]">

    <!--imagen dinamica-->
    <label class="circle">
      <input
        type="file"
        accept="image/*"
        hidden
        @change="onFileChange"
      />
      <Icon icon="hugeicons:upload-01" class="i-mob" />
      <span>Subir imagen</span>
    </label>


    <form @submit.prevent="submit">

      <Input 
        id="name" 
        label="Nombre completo" 
        type="text" v-model="name" 
        :error="errors.name" 
        :submitted="submitted"
       />

      <Input
        v-if="mode !== 'profile'"
        id="password"
        label="Contraseña"
        type="password"
        hasEye
        v-model="password"
        :error="errors.password"
        :submitted="submitted"
      />

      <Input
        v-if="mode !== 'profile'"
        id="repeat-password"
        label="Repetir contraseña"
        type="password"
        hasEye
        v-model="repeatPassword"
        :error="errors.repeatPassword"
        :submitted="submitted"
      />

      <Input 
        id="email" 
        label="Email" 
        type="email" 
        v-model="email" 
        :error="errors.email"
        :submitted="submitted" 
      />

      <div v-if="variant === 'admin'" class="role-buttons">
        <button type="button" :class="{ active: role === 'user' }" @click="role = 'user'">
          Usuario
        </button>
        <button type="button" :class="{ active: role === 'admin' }" @click="role = 'admin'">
          Administrador
        </button>
      </div>

      <Input 
        id="date" 
        label="Fecha de registro" 
        type="date" 
        v-model="registerDate" 
        :error="errors.registerDate"
        :submitted="submitted"
      />

      <!--VER SI ES NECESARIO HACER MAS ESPECÍFICA LA VALIDACIÓN-->
      <div class="button-wrapper">
        <button class="confirm" type="submit">
            Confirmar
        </button>
      </div>

    </form>

  </section>

</template>

<style scoped>

.user-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
}

.user-form form{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.circle{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--forms1);
}

.circle span{
    font-size: 0.8em;
}

.role-buttons{
    display: flex;
    justify-content: space-between;
}
button{
    width: 45%;
    padding: 10px;
    border-radius: 8px;
}

.user-form.admin {
  --accent: #ff6bd6;
}

.user-form.user {
  --accent: #4aa3ff;
}

.role-buttons .active {
  background: var(--accent);
  color: var(--negro);
}

.i-mob{
    width: 20px;
    color: var(--accent);
    display: flex;
}

.confirm{
    width: 45%;
    border: 1px solid var(--accent);
}

.button-wrapper{
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: end;
}

</style>
