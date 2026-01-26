<script setup lang="ts">
import { ref } from 'vue'
import Input from '../components/small ui/log in/input.vue'

const email = ref('')
const password = ref('')
</script>

<template>

    <section class="login">

      <h2 class="mayus thin">Log in</h2>

        <form action="">

        <Input
            id="user"
            label="User"
            type="text"
            placeholder="vickyVillalba22"
            icon="hugeicons:user"
            v-model="email"
        />

        <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Contraseña"
            icon="hugeicons:lock"
            :hasEye="true"
            v-model="password"
        />

        </form>

        <div class="wrapper-button">
            <button class="button1">Log in</button>
        </div>

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
