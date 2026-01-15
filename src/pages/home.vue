<script setup lang="ts">

import Header from '../components/header.vue'

</script>

<template>

<section id="heroSection" class="blanco">

    <div>
        <h1 class="mayus thin">Hi! I'm Victoria Villalba</h1>
        <h2 class="bold">Welcome to my portfolio!</h2>
    </div>

    <Header :isHome="true" class="home-header-inline" />

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
    justify-content: space-evenly;
}


</style>