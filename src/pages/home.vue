<script setup lang="ts">

import { ref, onMounted } from 'vue'
import type { User } from '@/utils/auth'
import Header from '../components/header.vue'

const user = ref<User | null>(null)

onMounted(() => {
  const session = localStorage.getItem('session')
  if (session) {
    user.value = JSON.parse(session) as User
  }
})

</script>

<template>

<section id="heroSection" class="blanco">

    <!--AJUSTAR-->
    <div>

        <div v-if="user">
            <p>{{ user.role }}</p>
            <h1>Hi {{ user.name }}</h1>
        </div>
        
        
        <h1 v-else class="mayus thin">Hi! I'm Victoria Villalba</h1>
        <h2 class="bold">Welcome to my portfolio!</h2>

    </div>

    <Header :isHome="true" class="home-header" />

</section>

</template>

<style scoped>

h1{
    font-size: 3em;
}

h2{
    font-size: 2em;
}

#heroSection{

    width: 90%;
    height: 70vh;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;

}

.home-header{
    height: 40vh;
}


</style>