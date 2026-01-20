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
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 40px;
  width: 90vw;
}

.chip {
  width: 15%;
  height: 30px;
  border-radius: 20px;
  background-color: rgba(240, 248, 255, 0);
}

@media (max-width: 600px){
  .chip {
    width: 50%;
    height: 30px;
    border-radius: 20px;
    background-color: rgba(240, 248, 255, 0);
  }
}


</style>
