<script setup lang="ts">

    import { ref, computed } from "vue"

    const price = ref<number | null>(null)

    const finalPrice = computed(() => {
    if (price.value === null || isNaN(Number(price.value))) {
        return ""
    }

    const numericPrice = Number(price.value)
    const taxes = numericPrice * 0.21
    return (numericPrice + taxes).toFixed(2)
    })

</script>


<template>

    <article class="principio efectoSection">

        <h3>Computed properties</h3>
        <p class="desc">Computed properties allow you to derive values ​​from the reactive state, optimizing performance and keeping the code more declarative.</p>

        <label for="inputPrecio">Insert your product's price</label>
        <input 
            type="number" 
            id="inputPrecio"
            v-model="price"
        />

        <label for="outputPrecio">Result of: price + taxes (21%)</label>
        <input 
            type="text" 
            id="outputPrecio"
            :value="finalPrice"
            readonly
        />

        <Transition name="fade-slide">
            <p v-if="price" class="answer">
                You will pay {{ finalPrice }}$ with taxes included.
            </p>
        </Transition>

    </article>

</template>

<style scoped>

h3{
    font-size: 24px;
    font-family: var(--font-thin);
}

.answer{
    color: var(--color-texto-secundario);
}

</style>

