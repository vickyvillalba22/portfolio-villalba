<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  years: number[]
  categories: string[]
  selectedYears: Set<number>
  selectedCategories: Set<string>
  toggleYear: (year: number) => void
  toggleCategory: (cat: string) => void
  clearYears: () => void
  clearCategories: () => void
  mode: 'rosa' | 'violeta'
}>()

const activeYear = ref(false)
const activeArea = ref(false)

const accentColor = computed(() => {
  return props.mode === 'rosa'
    ? 'var(--rosa)'
    : 'var(--violeta)'
})

</script>

<template>

  <div id="filters" :style="{ '--accent': accentColor }">

    <div class="manageF">

      <Icon icon="hugeicons:filter" class="i-mob" />
      <p @click="activeYear = !activeYear" :class="{ bold: activeYear }">Year</p>
      <p @click="activeArea = !activeArea" :class="{ bold: activeArea }">Area</p>

    </div>

    <!-- AÑOS -->
    <div class="contPills" v-if="activeYear">
      <button
        class="pill"
        :class="{ active: selectedYears.size === 0 }"
        @click="clearYears"
      >
        All
      </button>

      <button
        v-for="year in years"
        :key="year"
        class="pill"
        :class="{ active: selectedYears.has(year) }"
        @click="toggleYear(year)"
      >
        {{ year }}
      </button>
    </div>

    <!-- CATEGORÍAS -->
    <div class="contPills" v-if="activeArea">
      <button
        class="pill"
        :class="{ active: selectedCategories.size === 0 }"
        @click="clearCategories"
      >
        All
      </button>

      <button
        v-for="cat in categories"
        :key="cat"
        class="pill"
        :class="{ active: selectedCategories.has(cat) }"
        @click="toggleCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>
  </div>
</template>

<style scoped>

#filters{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.manageF{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
}

.bold{
    font-family: var(--font-bold);
}

.pill {
    cursor: pointer;
    font-family: 'creatoDisplay';
    font-size: 15px;
}
.pill.active {
  color: var(--accent);
}

.contPills{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 5px 15px;
}

.i-mob{
    width: 24px;
    color: var(--accent);
}

</style>
