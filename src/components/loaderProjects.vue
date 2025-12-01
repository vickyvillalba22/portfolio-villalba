<script setup lang="ts"></script>

<template>
  <div class="skeleton-projects">

    <v-skeleton-loader
      v-for="i in 6"
      :key="i"
      type="image, article"
      class="proj-skeleton"
    />

  </div>
</template>

<style scoped>
.skeleton-projects {
    display: flex;
    width: 55%;
    flex-wrap: wrap;
    gap: 40px;
}

.proj-skeleton {
    width: 30%;
    height: 40vh;
    border-radius: 16px;
    background-color: rgba(0, 0, 255, 0);
}

</style>
