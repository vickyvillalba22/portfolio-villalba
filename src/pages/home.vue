<script setup lang="ts">

import { computed } from 'vue'
import { currentUser } from '@/utils/session'
import Header from '../components/header.vue'

const user = computed(() => currentUser.value)

</script>

<template>

<section id="heroSection">

    <div class="welcome-user">

        <div v-if="user">
            <p class="mayus" :class="user.role === 'admin' ? 'adminColor' : 'userColor'">{{ user.role }}</p>
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
    font-size: 2.5em;
    font-family: var(--font-thin);
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

.welcome-user{
    width: 100%;
}

.welcome-user p{
    font-size: 0.8em;
    font-family: var(--font-bold);
}

.adminColor{
    color: var(--rosa);
}
.userColor{
    color: var(--azul);
}

/*desktop pequeño*/
@media (min-width: 920px){

#heroSection{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
}
.welcome-user{
    width: 40%;
}

}

</style>