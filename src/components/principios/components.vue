<script setup lang="ts"></script>

<template>

    <article>

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

article{
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 8px 8px 16px rgba(148, 147, 147, 0.35);
}

h3{
    font-size: 24px;
}

.desc{
    color: var(--color-texto-secundario);
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

button{
    padding: 2px 18px;
    border: 1px solid var(--verde);
    border-radius: 16px;
}

</style>