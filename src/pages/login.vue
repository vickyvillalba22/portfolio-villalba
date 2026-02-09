<script setup lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Input from '../components/small ui/log in/input.vue'

import { loginUser } from '@/utils/auth'
import { saveSession } from '@/utils/session'
import { User } from '@/types/user'

const router = useRouter()

const usuario = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  const user = await loginUser(usuario.value, password.value)

  if (!user) {
    error.value = 'Usuario o contraseña incorrectos'
    return
  }

  saveSession(user)
  router.push('/')
}

</script>

<template>

    <section class="login">

      <h2 class="mayus thin">Log in</h2>

        <form @submit.prevent="handleLogin">

        <Input
            id="usuario"
            label="User"
            type="text"
            placeholder="vickyVillalba22"
            v-model="usuario"
        />

        <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Contraseña"
            :hasEye="true"
            v-model="password"
        />

        <p v-if="error" class="error">{{ error }}</p>

        <div class="wrapper-button">
            <button type="submit" class="button1">Log in</button>
        </div>

        </form>

    </section>

</template>

<style scoped>

h2{
    font-size: 2.5em;
}

.login{
    height: 90vh;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

form{
    display: flex;
    flex-direction: column;
    gap: 15px;
}

button{
    border: var(--borde-rosa);
}

.wrapper-button{
    width: 100%;
    display: flex;
    justify-content: end;
}

</style>

<style>

.button1{
    padding: 2px 18px;
    border-radius: 16px;
    width: fit-content;
    font-family: var(--fuente-texto-principal);
}

</style>
