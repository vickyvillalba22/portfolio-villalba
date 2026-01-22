<script setup lang="ts">

defineProps<{
    code:string
}>()

</script>

<template>

    <!--<pre> = preformatted text. Respeta saltos de línea y espacios, no reordena el texto, ideal para código-->
    <pre class="codeBox">
     
        <!--Son entidades HTML: &lt; → < // &gt; → >, se muestra como texto visible, mostrar < > sin ejecutar-->
        <code v-html="code"></code>
   
    </pre>

</template>

<style scoped>

.codeBox{
    background-color: var(--code-box);
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 15px;
    border-radius: 8px;
}
code{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

</style>

<style>
.codeBox span{
    color: var(--verde);
    font-family: monospace; 
}
</style>