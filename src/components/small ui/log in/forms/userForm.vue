<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Input from '@/components/small ui/log in/input.vue'
import type { User, UserRole } from '@/types/user'
import { Icon } from '@iconify/vue'
import { addUser } from '@/utils/users'

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

//el form guarda inputs
const name = ref('')
const password = ref('')
const repeatPassword = ref('')
const email = ref('')
const role = ref<UserRole>('user')
const registerDate = ref('')

// prefill si es edit / profile
watch(
  () => props.user,
  (u) => {
    if (!u) return
    name.value = u.name
    email.value = u.email
    role.value = u.role
    registerDate.value = u.registerDate
  },
  { immediate: true }
)

const passwordsMatch = computed(
  () => password.value === repeatPassword.value
)

const submit = () => {
    if (props.mode !== 'profile' && !passwordsMatch.value) {
        alert('Las contraseñas no coinciden')
        return
    }

    const user: User = {
        id: props.user?.id ?? Date.now(),
        name: name.value,
        usuario: email.value.split('@')[0],
        email: email.value,
        password: password.value || props.user?.password || '',
        role: role.value,
        isSubscribed: props.user?.isSubscribed ?? false,
        registerDate: registerDate.value,
        likedPosts: props.user?.likedPosts ?? [],
    }

    console.log(user)

    //solo en modo add
    if (props.mode === 'add') {
        addUser(user)
    }

    emit('success', user)
}
</script>

<template>
  <section :class="['user-form', variant]">

    <!-- avatar -->
    <div class="avatar-upload">
      <div class="circle">
        <Icon icon="hugeicons:upload-04" />
        <span>Subir imagen</span>
      </div>
    </div>

    <form @submit.prevent="submit">

      <Input id="name" label="Nombre completo" type="text" v-model="name" />

      <Input
        v-if="mode !== 'profile'"
        id="password"
        label="Contraseña"
        type="password"
        hasEye
        v-model="password"
      />

      <Input
        v-if="mode !== 'profile'"
        id="repeat-password"
        label="Repetir contraseña"
        type="password"
        hasEye
        v-model="repeatPassword"
      />

      <Input id="email" label="Email" type="email" v-model="email" />

      <div v-if="variant === 'admin'" class="role-buttons">
        <button type="button" :class="{ active: role === 'user' }" @click="role = 'user'">
          Usuario
        </button>
        <button type="button" :class="{ active: role === 'admin' }" @click="role = 'admin'">
          Administrador
        </button>
      </div>

      <Input id="date" label="Fecha" type="date" v-model="registerDate" />

      <button class="confirm" type="submit">
        Confirmar
      </button>
    </form>
  </section>
</template>

<style scoped>
.user-form {
  padding: 24px;
  color: white;
}

.user-form.admin {
  --accent: #ff6bd6;
}

.user-form.user {
  --accent: #4aa3ff;
}

.circle,
.confirm,
.role-buttons .active {
  background: var(--accent);
}
</style>
