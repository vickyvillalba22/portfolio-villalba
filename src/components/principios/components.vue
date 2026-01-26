<script setup lang="ts"></script>

<template>

    <article class="principio">

        <h3>Components</h3>
        <p class="desc">Components allow the interface to be divided into reusable and encapsulated pieces, facilitating maintenance and scalability.</p>

        <div class="card">
            <div></div>
        </div>

        <div class="contButtons">
            <button>Hide</button>
            <button>Show</button>
            <button>Duplicate</button>
        </div>

    </article>

</template>

<style scoped>

h3{
    font-size: 24px;
}

.card{
    width: 50%;
    height: 35vh;
    background-color: gray;
    border-radius: 16px;
}

.contButtons{
    display: flex;
    gap: 10px;
}

/*ESTOS SE PUEDEN REEMPLAZAR POR BUTTON1*/
button{
    padding: 2px 18px;
    border: 1px solid var(--verde);
    border-radius: 16px;
}

</style>