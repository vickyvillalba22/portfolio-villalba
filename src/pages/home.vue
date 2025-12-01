<script setup lang="ts">

import Header from '../components/header.vue'

</script>

<template>

<section id="heroSection" class="font-modo-oscuro">

    <div>
        <h1>Hi! I'm Victoria Villalba</h1>
        <h2>Welcome to my portfolio!</h2>
    </div>

    <Header :isHome="true" class="home-header-inline" />

</section>

</template>

<style scoped>

h1{
    font-weight: 600;
    font-size: 3em;
}

h2{
    font-weight: 200;
}

#heroSection{
    width: 90%;
    height: 90vh;

    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-evenly;
}

@media (max-width: 600px){
    #heroSection{
        height: 50vh;
        flex-direction: column;
        justify-content: space-around;
        transform: translateY(-20%);
    }
    h1{
        font-size: 2.5em;
    }
}


</style>