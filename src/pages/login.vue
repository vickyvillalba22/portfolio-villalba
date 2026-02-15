<script setup lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Input from '../components/small ui/log in/input.vue'

import { loginUser } from '@/utils/auth'
import { saveSession } from '@/utils/session'

import { useTypewriter } from '@/animations/composables';

const { displayed } = useTypewriter("Log in")

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

    <div class="wrapperLogin">
        <section class="login sectionDesktop">

        <h2 class="mayus">{{ displayed }}</h2>

            <form @submit.prevent="handleLogin">

            <Input
                id="usuario"
                label="User"
                type="text"
                placeholder="Ex: vickyVillalba22"
                v-model="usuario"
            />

            <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Must include at least 4 characters"
                :hasEye="true"
                v-model="password"
            />

            <p v-if="error" class="error">{{ error }}</p>

            <div class="wrapper-button">
                <button type="submit" class="button1">Log in</button>
            </div>

            </form>

        </section>
    </div>

</template>

<style scoped>

h2{
    font-size: 2.5em;
    font-family: var(--font-thin);
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
    font-family: var(--font-princ);
}

.wrapper-button{
    width: 100%;
    display: flex;
    justify-content: end;
}

.wrapperLogin{
    height: 90vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (min-width: 920px){

.login {
    width: 25%;
    height: fit-content;
    gap: 30px;
}
form{
    gap: 20px;
}
.wrapper-button{
    margin-top: 30px;
}
}


</style>

