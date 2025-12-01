<script setup lang="ts"></script>

<template>
  <div class="filters-skeleton">

    <!-- year -->
    <div class="chip-row">
      <v-skeleton-loader
        v-for="i in 5"
        :key="'year-' + i"
        type="chip"
        class="chip"
      />
    </div>

  </div>
</template>

<style scoped>

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.chip {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  background-color: rgba(240, 248, 255, 0);
}


</style>
