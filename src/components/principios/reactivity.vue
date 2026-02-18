<script setup lang="ts">

import { ref } from "vue"

const message = ref("")
const isVisible = ref(true)

function toggleVisibility() {
  isVisible.value = !isVisible.value
}

</script>

<template>

    <article class="principio efectoSection">

        <h3>Reactivity</h3>
        <p class="desc">Vue's reactive system connects the application's state to the interface, automatically updating the view when data changes.</p>

        <label for="text">Write something cool!</label>

        <input 
          type="text" 
          id="text"
          v-model="message"
        />

        <!-- actualización en tiempo real -->
        <Transition name="fade-slide">
          <p v-if="isVisible" :key="message.length === 0 ? 'empty' : 'text'">
            {{ message.length === 0 ? 'Nothing written yet...' : message }}
          </p>
        </Transition>
        

        <p>{{ message.length }} characters</p>

        <div class="contBoton"> 
          <button
            class="toggle"
            :class="{ active: !isVisible }"
            :aria-pressed="!isVisible"
            @click="toggleVisibility"
          >
            <span class="toggle-thumb"></span>
          </button>
          <p>Activa y desactiva la visualización</p>
        </div>

    </article>

</template>

<style>

h3{
    font-size: 24px;
    font-family: var(--font-thin);
}

.toggle {
  width: 56px;
  height: 28px;
  background-color: transparent;
  border: 1px solid var(--verde);
  border-radius: 16px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.25s ease;
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  background-color: var(--verde);
  border-radius: 16px;
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  transition: transform 0.25s ease;
}

/* estado activo (ejemplo) */
.toggle.active .toggle-thumb {
  transform: translate(28px, -50%);
}

.contBoton{
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 10px;
}
.contBoton p{
  font-size: 0.8em;
  color: var(--color-texto-secundario);
}

</style>