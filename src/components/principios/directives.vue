<script setup lang="ts">

import CodeBox from '../small ui/codeBox.vue';

const vIfExample = `&lt;p <span>v-if="mostrar"</span>&gt;Este párrafo se muestra o no.&lt;/p&gt;`

const parrafo = `Este párrafo se muestra o no`

const clickExample = `&lt;button <span>@click="saludar"</span>&gt;Saludar&lt;/button&gt;`

</script>

<template>

    <article class="principio">

        <h3>Directives</h3>
        <p class="desc">Directives are special attributes that allow you to manipulate the DOM in a declarative way.</p>

        <h4>v-if</h4>

        <!--automatizar el contenido de code-->
        <CodeBox :code="vIfExample" />
        <CodeBox :code="parrafo" />

        <h4>@function</h4>

        <CodeBox :code="clickExample" />

        <button>Saludar</button>


    </article>

</template>

<style scoped>

h4{
    color: var(--verde);
}

button{
    padding: 2px 18px;
    border: 1px solid var(--verde);
    border-radius: 16px;
    width: fit-content;
}


</style>

