<script setup lang="ts"></script>

<template>
  <div class="filters-skeleton">

    <!-- YEAR label -->
    <v-skeleton-loader type="text" width="60px" class="mb-2" />

    <!-- YEAR chips -->
    <div class="chip-row">
      <v-skeleton-loader
        v-for="i in 5"
        :key="'year-' + i"
        type="chip"
        class="chip"
      />
    </div>

    <!-- AREA label -->
    <v-skeleton-loader type="text" width="60px" class="mb-2 mt-4" />

    <!-- AREA chips -->
    <div class="chip-row">
      <v-skeleton-loader
        v-for="i in 8"
        :key="'area-' + i"
        type="chip"
        class="chip"
      />
    </div>

  </div>
</template>

<style scoped>
.filters-skeleton {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  width: 80px;
  height: 30px;
  border-radius: 20px;
}
</style>
