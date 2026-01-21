<script setup lang="ts">

</script>

<template>

    <article>

        <h3>Reactivity</h3>
        <p class="desc">Vue's reactive system connects the application's state to the interface, automatically updating the view when data changes.</p>

        <label for="text">Write something cool!</label>
        <input type="text" id="text">
        <!--aca se ve la actualización en tiempo real-->
        <p></p>

        <button class="toggle" aria-pressed="false">
            <span class="toggle-thumb"></span>
        </button>

    </article>

</template>

<style>

.toggle {
  width: 56px;
  height: 28px;
  background-color: transparent;
  border: 1.5px solid #2ee6a6;
  border-radius: 999px;
  padding: 0;
  cursor: pointer;
  position: relative;
  transition: background-color 0.25s ease;
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  background-color: #2ee6a6;
  border-radius: 50%;
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

</style>