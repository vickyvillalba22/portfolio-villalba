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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.proj-skeleton {
  height: 280px;
  border-radius: 16px;
}
</style>
